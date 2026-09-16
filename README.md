<h1 style="margin: 0; font-size: 2em;">Ambiance Canine — L'Éden des Animaux</h1>
<p style="margin-top: 8px;">A premium dog grooming salon website with locations in <strong>Cagnes-sur-Mer</strong> and <strong>Nice, France</strong>. The application uses Next.js 16, React 19, TypeScript, Tailwind CSS v4, FastAPI, and Amazon DynamoDB on AWS.</p>

---

## Environments

| Environment | URL | Description |
|-------------|-----|-------------|
| **Production** | https://d1r3btwzyaa7pg.cloudfront.net | Current production deployment |
| **Staging** | https://d1gv4iito35nhj.cloudfront.net | Pre-production deployment |
| **Development** | https://d28y4aqu1ibh05.cloudfront.net | Development deployment |

## Overview

**Ambiance Canine** (brand name: *L'Éden des Animaux*) provides professional dog grooming, dental care, and ozone spa services. The frontend is a statically exported Next.js application backed by a FastAPI content API.

### Key Features

- Database-backed service categories, service details, media, locations, groomers, gallery photos, and gift certificates (Amazon DynamoDB)
- Location cards and detail pages for Cagnes-sur-Mer and Nice
- Before/after comparisons, image galleries, and service videos
- Responsive layouts with persistent dark/light theme switching
- Gift certificate carousel and certificate listing page
- Static export suitable for S3 and CloudFront hosting
- AWS Lambda API deployment with DynamoDB

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.3.0 | React framework with App Router and static export |
| React | 19.2.8 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling |
| Embla Carousel | 9.x | Certificate carousel |
| LightGallery | 2.9.0 | Image gallery and lightbox |
| Lottie React | 3.1.0 | Animated logo |

### Backend

| Technology | Purpose |
|------------|---------|
| FastAPI | Content and health API |
| DynamoDB | Places, groomers, services, gallery, certificates (non-relational) |
| boto3 | AWS SDK for Python (DynamoDB access) |
| Mangum | FastAPI adapter for AWS Lambda |

### Infrastructure and Operations

| Tool | Purpose |
|------|---------|
| Terraform | AWS infrastructure as code |
| AWS S3 | Frontend and media asset storage |
| AWS CloudFront | Global CDN for the static frontend |
| AWS Lambda | FastAPI API and database setup workers |
| AWS API Gateway | HTTP API routes for Lambda |
| AWS DynamoDB | Non-relational tables for places, groomers, services, gallery, certificates |
| GitHub Actions | Deployment workflow |

---

## Project Structure

```text
ambiance_canine/
├── backend/
│   ├── main.py                 # FastAPI routes
│   ├── db.py                   # DynamoDB queries and table configuration
│   ├── seed_data.py            # Initial content records
│   ├── seed_db.py              # Idempotent DynamoDB seeding and db_setup Lambda handler
│   ├── lambda_handler.py       # Mangum API Lambda entrypoint
│   └── deploy.py               # Lambda package builder
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── layout.tsx      # Root layout and metadata
│   │   │   ├── globals.css     # Global styles
│   │   │   ├── places/
│   │   │   │   └── [id]/       # Generated location detail pages
│   │   │   └── certificates/   # Gift certificate listing
│   │   ├── components/         # Services, locations, galleries, navigation, and footer
│   │   ├── contexts/           # Theme provider
│   │   ├── lib/api.ts          # Typed API client
│   │   ├── types/index.ts      # Shared API types
│   │   ├── constants/          # Application constants
│   │   └── assets/             # Frontend animation assets
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
├── scripts/
│   ├── deploy.sh               # Build and deploy all environments
│   ├── setup_db.py             # Create DynamoDB tables and seed content
│   ├── run_local.py            # Legacy local process runner
│   └── destroy.sh              # Infrastructure teardown
├── terraform/                  # AWS resources and environment workspaces
├── .github/workflows/          # Deploy and destroy workflows
├── package.json                # Root package metadata
├── tsconfig.json               # Root TypeScript configuration
├── eslint.config.mjs           # ESLint configuration
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm
- Python 3.11 or newer
- Docker for building the Lambda package
- AWS CLI, Terraform, and AWS credentials for deployment
- Docker (for DynamoDB Local during local development)

### Install Dependencies

```bash
# Frontend
cd frontend
npm ci

# API
cd ../backend
python3 -m pip install -r requirements.txt
```

### Environment Variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create a `backend/.env` file for local API development, or export the same variables in the shell running the API:

```env
DYNAMODB_ENDPOINT_URL=http://localhost:8001
DYNAMODB_TABLE_PLACES=ambiancecanine-dev-places
DYNAMODB_TABLE_GROOMERS=ambiancecanine-dev-groomers
DYNAMODB_TABLE_SERVICES=ambiancecanine-dev-services
DYNAMODB_TABLE_GALLERY=ambiancecanine-dev-gallery-photos
DYNAMODB_TABLE_CERTIFICATES=ambiancecanine-dev-certificates
CORS_ORIGINS=http://localhost:3000
```

Use `DYNAMODB_ENDPOINT_URL=http://localhost:8001` to point at a local DynamoDB instance. Omit this variable in production; the Lambda functions resolve tables via environment variables set by Terraform. See [Database Setup](#database-setup) for seeding instructions.

### Run Locally

Start the frontend and API in separate terminals:

```bash
# Terminal 1: frontend
cd frontend
npm run dev

# Terminal 2: API
cd ../backend
python -m uvicorn main:app --reload --port 8000
```

Open `http://localhost:3000` for the frontend and `http://localhost:8000/docs` for API documentation.

---

## Database Setup

Content is stored in Amazon DynamoDB. Initial content records are defined in `backend/seed_data.py` and applied by `backend/seed_db.py`.

The tables store:

- Places, phone numbers, photos, and groomer assignments (denormalized — each place embeds its `groomer_ids`)
- Groomer profiles with their `place_ids`
- Service categories with media and service details
- Gallery photos and gift certificates

Each table uses a sparse global secondary index (`ActiveOrderedIndex`) with `status = "active"` as the partition key and a composite `sort_key` (`{display_order:010d}#{id}`) as the range key. This enables efficient queries for all active items in display order without table scans.

### Local Database

Start a local DynamoDB instance (e.g., via Docker) and set the endpoint URL:

```bash
docker run -d -p 8001:8000 amazon/dynamodb-local
```

Set the local environment variables and run the setup script from the repository root:

```bash
export DYNAMODB_ENDPOINT_URL=http://localhost:8001
export DYNAMODB_TABLE_PLACES=ambiancecanine-dev-places
export DYNAMODB_TABLE_GROOMERS=ambiancecanine-dev-groomers
export DYNAMODB_TABLE_SERVICES=ambiancecanine-dev-services
export DYNAMODB_TABLE_GALLERY=ambiancecanine-dev-gallery-photos
export DYNAMODB_TABLE_CERTIFICATES=ambiancecanine-dev-certificates

python3 scripts/setup_db.py
```

`setup_db.py` creates the DynamoDB tables (if they do not already exist), waits for them to become active, and seeds the content.

To seed existing tables without creating new ones:

```bash
cd backend
python seed_db.py
```

### Cloud Database

Each Terraform environment creates five DynamoDB tables (places, groomers, services, gallery photos, and certificates) with on-demand billing and an `ActiveOrderedIndex` GSI. Lambda functions access DynamoDB tables via environment variables set by Terraform — no Secrets Manager or VPC is required.

Deployment is straightforward — no database password is needed:

```bash
./scripts/deploy.sh prod
```

Useful Terraform outputs are:

```bash
terraform output -raw dynamodb_table_places
terraform output -raw dynamodb_table_groomers
terraform output -raw dynamodb_table_services
terraform output -raw dynamodb_table_gallery_photos
terraform output -raw dynamodb_table_certificates
```

---

## Database Structure

Each content entity is stored in its own DynamoDB table. Tables are provisioned by Terraform; item structure mirrors the original relational schema with denormalization to avoid joins.

### Entity-Relationship Diagram (denormalized)

```
places ── groomer_ids ──┐
                        ├── groomers ── place_ids ──┐
                        └──────────────────┘       │
                                                     └──┘
(M:N relationship embedded as lists on each entity — no junction table needed)

services (standalone, includes media list)

gallery_photos (standalone)

certificates (standalone)
```

### Tables

| Table | Primary Key | Purpose | Key Attributes |
|-------|-------------|---------|----------------|
| **places** | `id` (String, slug) | Salon locations | `slug`, `title`, `place`, `address`, `address_link`, `places_called`, `phone_number` (list), `photos` (list), `groomer_ids` (list), `display_order`, `is_active` |
| **groomers** | `id` (String, slug) | Groomer profiles | `slug`, `name`, `photo`, `specialty`, `place_ids` (list), `display_order`, `is_active` |
| **services** | `id` (String, slug) | Service categories with media | `slug`, `title`, `subtitle`, `description`, `icon`, `image_url`, `after_image_url`, `media_type`, `image_folder`, `media` (list), `display_order`, `is_active` |
| **gallery_photos** | `id` (String) | Gallery images | `name`, `alt_text`, `photo_url`, `display_order`, `is_active` |
| **certificates** | `id` (String) | Gift certificates | `src`, `alt`, `description`, `locale`, `display_order`, `is_active` |

### Indexes (GSI on every table)

| Index | Partition Key | Sort Key | Purpose |
|-------|---------------|----------|---------|
| `ActiveOrderedIndex` | `status` = `"active"` (sparse) | `sort_key` = `{display_order:010d}#{id}` | Efficient query of all active items in display order |

### Notes

- **Sparse index**: Only items with `status = "active"` appear in the GSI, so inactive items are excluded automatically.
- **Denormalization**: Each place stores `groomer_ids` (list of groomer slugs); each groomer stores `place_ids` (list of place slugs). This eliminates the need for a junction table and reduces read queries to a single GSI query plus a `BatchGetItem`.
- **Soft deletes**: All tables use `is_active` boolean flags; the sparse GSI ensures only active items are returned.
- **Display ordering**: All content tables include `display_order` for manual sorting, embedded in the `sort_key` for ordered GSI queries.
- **Timestamps**: Most tables have `created_at` and `updated_at` (ISO 8601).

---

## Content Model

Content is stored in DynamoDB tables and fetched by the frontend through the API. The former mock place and certificate modules are no longer used as data sources.

Update `backend/seed_data.py` to change the initial dataset, then run `scripts/setup_db.py` or the `db_setup` Lambda. Seeding is idempotent for places, groomers, and services; gallery photos and certificates are replaced with the current seed set.

Location detail routes are generated from the API response at build time under `/places/{id}/`.

---

## API

The FastAPI application exposes these endpoints:

### Content

- `GET /api/places` returns `{ places, groomers }`
- `GET /api/places/{place_id}` returns one location
- `GET /api/services` returns service categories with media
- `GET /api/gallery` returns `{ images }`
- `GET /api/certificates` returns `{ certificates }`

### Health

- `GET /health` checks DynamoDB connectivity
- `GET /` returns API service metadata

The API uses `CORS_ORIGINS` to configure browser access. Content endpoints are currently readable without authentication; protect write endpoints before exposing them to untrusted clients if authentication is required.

---

## Deployment

`scripts/deploy.sh` performs the following steps:

1. Builds the Lambda package with the AWS Python 3.12 runtime image.
2. Initializes the Terraform S3 backend and selects the requested workspace.
3. Applies the environment-specific Terraform configuration.
4. Invokes the database setup Lambda.
5. Builds the Next.js static export with `NEXT_PUBLIC_API_URL` set to the deployed API Gateway URL.
6. Syncs the export to the environment S3 bucket.

Supported environments are `dev`, `test`, and `prod`:

```bash
./scripts/deploy.sh dev
./scripts/deploy.sh test
./scripts/deploy.sh prod
```

To remove an environment's infrastructure:

```bash
./scripts/destroy.sh prod
```

---

## Validation

Run frontend linting and TypeScript validation from `frontend/`:

```bash
cd frontend
npm run lint
npx tsc --noEmit
```

The production build requires the API to be reachable at `NEXT_PUBLIC_API_URL` because location routes are generated from API data:

```bash
npm run build
```

Run a Python syntax check from the repository root:

```bash
python3 -m compileall backend scripts
```

No automated test files or test runner script are currently configured in the repository. Use `npm test --if-present` to run a test command if one is added later.

Terraform validation requires an initialized backend and environment workspace:

```bash
cd terraform
terraform init
terraform workspace select dev
terraform validate
```

---

## Infrastructure

The `terraform/` directory provisions:

- S3 buckets for the frontend and application assets
- CloudFront distributions for static delivery
- DynamoDB tables for places, groomers, services, gallery photos, and certificates
- Lambda functions for the API and database setup
- API Gateway HTTP API routes

Environment-specific values are stored in `terraform.tfvars`, `test.tfvars`, and `prod.tfvars`. Sensitive values should be supplied through environment variables or CI secrets rather than committed Terraform variable files.
