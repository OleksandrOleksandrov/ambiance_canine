import json
import os
import subprocess
from datetime import datetime, timezone
from typing import Any, Optional

from aioboto3 import Session
from boto3.dynamodb.conditions import Key

_dynamodb_resource = None


def _session_config():
    config = {
        "region_name": os.environ.get(
            "AWS_REGION", os.environ.get("AWS_DEFAULT_REGION", "us-east-1")
        ),
    }
    endpoint_url = os.environ.get("DYNAMODB_ENDPOINT_URL")
    if endpoint_url:
        config["endpoint_url"] = endpoint_url
    return config


def _table_names():
    return {
        "places": os.environ.get("DYNAMODB_TABLE_PLACES", "places"),
        "groomers": os.environ.get("DYNAMODB_TABLE_GROOMERS", "groomers"),
        "services": os.environ.get("DYNAMODB_TABLE_SERVICES", "services"),
        "gallery": os.environ.get("DYNAMODB_TABLE_GALLERY", "gallery-photos"),
        "certificates": os.environ.get("DYNAMODB_TABLE_CERTIFICATES", "certificates"),
    }


async def _get_dynamodb_resource():
    """Return the shared aioboto3 DynamoDB resource.

    The resource is normally created and closed by the FastAPI lifespan in
    main.py. This fallback creates a short-lived resource when the module is
    used outside of that lifecycle (e.g. Lambda invocations via Mangum with
    lifespan="off").
    """
    global _dynamodb_resource
    if _dynamodb_resource is not None:
        return _dynamodb_resource
    session = Session()
    ctx = session.resource("dynamodb", **_session_config())
    _dynamodb_resource = await ctx.__aenter__()
    return _dynamodb_resource


async def _get_table(table_key):
    resource = await _get_dynamodb_resource()
    return await resource.Table(_table_names()[table_key])


async def _query_active_ordered(table_key):
    table = await _get_table(table_key)
    response = await table.query(
        IndexName="ActiveOrderedIndex",
        KeyConditionExpression=Key("status").eq("active"),
    )
    items = response.get("Items", [])
    while "LastEvaluatedKey" in response:
        response = await table.query(
            IndexName="ActiveOrderedIndex",
            KeyConditionExpression=Key("status").eq("active"),
            ExclusiveStartKey=response["LastEvaluatedKey"],
        )
        items.extend(response.get("Items", []))
    items.sort(key=lambda x: x.get("sort_key", ""))
    return items


async def _batch_get_keys(table_key, keys):
    if not keys:
        return []
    resource = await _get_dynamodb_resource()
    table_name = _table_names()[table_key]
    response = await resource.batch_get_item(
        RequestItems={
            table_name: {
                "Keys": [{"id": k} for k in keys],
            }
        }
    )
    return response.get("Responses", {}).get(table_name, [])


def _format_groomer(row):
    return {
        "id": str(row["id"]),
        "slug": row["slug"],
        "name": row["name"],
        "placesIds": [str(v) for v in row.get("place_ids", [])],
        "photo": row.get("photo"),
        "specialty": row.get("specialty"),
    }


def _format_place(row, groomer_lookup):
    groomer_ids = row.get("groomer_ids", [])
    groomers = [
        groomer_lookup[gid]
        for gid in groomer_ids
        if gid in groomer_lookup
    ]
    return {
        "id": str(row["id"]),
        "slug": row["slug"],
        "title": row["title"],
        "place": row["place"],
        "phone_number": row.get("phone_number", []),
        "photos": row.get("photos", []),
        "groomers": groomers,
        "address": row.get("address"),
        "addressLink": row.get("address_link"),
        "placesCalled": row.get("places_called"),
    }


def _format_service(row):
    media = row.get("media", []) or []
    return {
        "id": str(row["id"]),
        "slug": row["slug"],
        "title": row["title"],
        "subtitle": row.get("subtitle"),
        "description": row.get("description"),
        "icon": row.get("icon"),
        "image": row.get("image_url"),
        "afterImage": row.get("after_image_url"),
        "mediaType": row.get("media_type", "image"),
        "imageFolder": row.get("image_folder"),
        "media": [
            {
                "url": item.get("url"),
                "mediaType": item.get("media_type", "image"),
                "role": item.get("role", "primary"),
                "alt": item.get("alt_text"),
            }
            for item in media
        ],
    }


def _format_gallery_image(row):
    return {
        "id": int(row["id"]),
        "name": row["name"],
        "alt": row.get("alt_text"),
        "url": row.get("photo_url"),
    }


def _format_certificate(row):
    return {
        "id": str(row["id"]),
        "src": row["src"],
        "alt": row["alt"],
        "description": row.get("description"),
        "locale": row.get("locale", "fr"),
    }


async def init_db():
    """Create and cache the shared aioboto3 DynamoDB resource."""
    global _dynamodb_resource
    if _dynamodb_resource is not None:
        return _dynamodb_resource
    session = Session()
    ctx = session.resource("dynamodb", **_session_config())
    _dynamodb_resource = await ctx.__aenter__()
    return _dynamodb_resource


async def close_db():
    """Close the shared aioboto3 DynamoDB resource."""
    global _dynamodb_resource
    if _dynamodb_resource is None:
        return
    await _dynamodb_resource.__aexit__(None, None, None)
    _dynamodb_resource = None


async def get_database_settings():
    return _table_names()


async def database_is_healthy():
    try:
        table = await _get_table("places")
        await table.query(
            IndexName="ActiveOrderedIndex",
            KeyConditionExpression=Key("status").eq("active"),
            Limit=1,
        )
        return True
    except Exception:
        return False


async def get_places_from_db():
    place_items = await _query_active_ordered("places")
    all_groomer_ids = set()
    for place in place_items:
        all_groomer_ids.update(place.get("groomer_ids", []))
    groomer_items = await _batch_get_keys("groomers", list(all_groomer_ids))
    groomer_lookup = {}
    for g in sorted(groomer_items, key=lambda x: x.get("sort_key", "")):
        groomer_lookup[g["id"]] = _format_groomer(g)
    return [_format_place(place, groomer_lookup) for place in place_items]


async def get_place_from_db(place_id):
    table = await _get_table("places")
    response = await table.get_item(
        Key={"id": str(place_id)},
        ConsistentRead=True,
    )
    item = response.get("Item")
    if not item:
        return None
    if not item.get("is_active", False):
        return None
    groomer_ids = item.get("groomer_ids", [])
    groomer_items = await _batch_get_keys("groomers", groomer_ids)
    sorted_groomers = sorted(
        groomer_items, key=lambda x: x.get("sort_key", "")
    )
    groomer_lookup = {
        g["id"]: _format_groomer(g) for g in sorted_groomers
    }
    return _format_place(item, groomer_lookup)


async def get_groomers_from_db():
    groomer_items = await _query_active_ordered("groomers")
    return [_format_groomer(g) for g in groomer_items]


async def get_services_from_db():
    service_items = await _query_active_ordered("services")
    return [_format_service(s) for s in service_items]


async def get_gallery_images_from_db():
    photo_items = await _query_active_ordered("gallery")
    return [_format_gallery_image(p) for p in photo_items]


async def get_certificates_from_db():
    cert_items = await _query_active_ordered("certificates")
    return [_format_certificate(c) for c in cert_items]


def get_db_config_from_terraform():
    try:
        result = subprocess.run(
            [
                "terraform",
                f"-chdir={os.path.join(os.path.dirname(__file__), '..', 'terraform')}",
                "output",
                "-json",
            ],
            capture_output=True,
            text=True,
            check=True,
        )
        outputs = json.loads(result.stdout)
        config = {}
        for output_name, env_name in (
            ("dynamodb_table_places", "DYNAMODB_TABLE_PLACES"),
            ("dynamodb_table_groomers", "DYNAMODB_TABLE_GROOMERS"),
            ("dynamodb_table_services", "DYNAMODB_TABLE_SERVICES"),
            ("dynamodb_table_gallery_photos", "DYNAMODB_TABLE_GALLERY"),
            ("dynamodb_table_certificates", "DYNAMODB_TABLE_CERTIFICATES"),
        ):
            if output_name in outputs:
                config[env_name] = str(outputs[output_name]["value"])
        return config
    except Exception:
        return {}