#!/bin/bash
set -euo pipefail

ENVIRONMENT=${1:-dev}
PROJECT_NAME=${2:-ambiancecanine}

printf 'Deploying %s to %s...\n' "$PROJECT_NAME" "$ENVIRONMENT"

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

prune_old_snapstart_versions() {
  local function_name=$1
  local keep_version=$2
  local old_versions

  old_versions=$(
    aws lambda list-versions-by-function \
      --function-name "$function_name" \
      --output json |
      python3 -c '
import json
import sys

keep_version = sys.argv[1]
versions = json.load(sys.stdin).get("Versions", [])
current = next(
    (version for version in versions if str(version.get("Version")) == keep_version),
    None,
)
if current is None:
    raise SystemExit(
        f"Published version {keep_version} not found for {sys.argv[2]}."
    )
if (current.get("SnapStart") or {}).get("ApplyOn") != "PublishedVersions":
    raise SystemExit(
        f"Published version {keep_version} of {sys.argv[2]} is not SnapStart-enabled."
    )

old_versions = sorted(
    (
        str(version["Version"])
        for version in versions
        if str(version.get("Version")) not in ("$LATEST", keep_version)
        and int(version["Version"]) < int(keep_version)
        and (version.get("SnapStart") or {}).get("ApplyOn") == "PublishedVersions"
    ),
    key=int,
)
print("\n".join(old_versions))
' "$keep_version" "$function_name"
  )

  while IFS= read -r version; do
    if [ -n "$version" ]; then
      printf 'Deleting old SnapStart version %s:%s...\n' "$function_name" "$version"
      aws lambda delete-function \
        --function-name "$function_name" \
        --qualifier "$version"
    fi
  done <<< "$old_versions"
}

printf 'Building Lambda package...\n'
(cd backend && uv run deploy.py)

cd terraform
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=${DEFAULT_AWS_REGION:-us-east-1}

terraform init -input=false \
  -backend-config="bucket=ambiancecanine-terraform-state-${AWS_ACCOUNT_ID}" \
  -backend-config="key=${ENVIRONMENT}/terraform.tfstate" \
  -backend-config="region=${AWS_REGION}" \
  -backend-config="dynamodb_table=ambiancecanine-terraform-locks" \
  -backend-config="encrypt=true"

WORKSPACE_EXISTS=false
while read -r workspace; do
  workspace="${workspace#\* }"
  if [ "$workspace" = "$ENVIRONMENT" ]; then
    WORKSPACE_EXISTS=true
  fi
done < <(terraform workspace list)

if [ "$WORKSPACE_EXISTS" = true ]; then
  terraform workspace select "$ENVIRONMENT"
else
  terraform workspace new "$ENVIRONMENT"
fi

case "$ENVIRONMENT" in
  prod)
    terraform apply -var-file=prod.tfvars -var="project_name=$PROJECT_NAME" -var="environment=$ENVIRONMENT" -auto-approve
    ;;
  test)
    terraform apply -var-file=test.tfvars -var="project_name=$PROJECT_NAME" -var="environment=$ENVIRONMENT" -auto-approve
    ;;
  *)
    terraform apply -var-file=terraform.tfvars -var="project_name=$PROJECT_NAME" -var="environment=$ENVIRONMENT" -auto-approve
    ;;
esac

API_URL=$(terraform output -raw api_gateway_url)
FRONTEND_BUCKET=$(terraform output -raw s3_frontend_bucket)
DB_SETUP_FUNCTION=$(terraform output -raw db_setup_lambda_function_name)
DB_SETUP_VERSION=$(terraform output -raw db_setup_lambda_function_version)
API_FUNCTION=$(terraform output -raw lambda_function_name)
API_VERSION=$(terraform output -raw lambda_function_version)
CUSTOM_URL=$(terraform output -raw custom_domain_url 2>/dev/null || true)

DB_SETUP_RESPONSE="$(mktemp)"
aws lambda invoke \
  --function-name "$DB_SETUP_FUNCTION" \
  --payload '{}' \
  "$DB_SETUP_RESPONSE" >/dev/null
python3 - "$DB_SETUP_RESPONSE" <<'PY'
import json
import sys

with open(sys.argv[1], encoding="utf-8") as response_file:
    payload = json.load(response_file)
if payload.get("FunctionError") or payload.get("statusCode") != 200:
    raise SystemExit(
        f"Database setup Lambda failed: {payload.get('body', payload)}"
    )
PY
rm -f "$DB_SETUP_RESPONSE"

PLACES_RESPONSE="$(mktemp)"
if ! curl --fail-with-body --silent --show-error \
  --retry 5 --retry-delay 3 --max-time 30 \
  "${API_URL}/api/places" >"$PLACES_RESPONSE"; then
  rm -f "$PLACES_RESPONSE"
  printf 'Unable to verify the deployed places API.\n' >&2
  exit 1
fi
python3 - "$PLACES_RESPONSE" <<'PY'
import json
import sys

with open(sys.argv[1], encoding="utf-8") as response_file:
    payload = json.load(response_file)
places = payload.get("places")
if not isinstance(places, list) or not places:
    raise SystemExit("The deployed places API returned no active places.")
PY
rm -f "$PLACES_RESPONSE"

printf 'Pruning old SnapStart Lambda versions...\n'
prune_old_snapstart_versions "$API_FUNCTION" "$API_VERSION"
prune_old_snapstart_versions "$DB_SETUP_FUNCTION" "$DB_SETUP_VERSION"

cd ../frontend
printf 'Building and deploying frontend...\n'
npm ci
NEXT_PUBLIC_API_URL="$API_URL" npm run build
aws s3 sync ./out "s3://$FRONTEND_BUCKET/" --delete
cd ..

printf '\nDeployment complete.\n'
printf 'CloudFront URL: %s\n' "$(terraform -chdir=terraform output -raw cloudfront_url)"
if [ -n "$CUSTOM_URL" ]; then
  printf 'Custom domain: %s\n' "$CUSTOM_URL"
fi
printf 'API Gateway: %s\n' "$API_URL"
