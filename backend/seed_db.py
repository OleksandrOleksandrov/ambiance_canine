import argparse
import os
import uuid
from datetime import datetime, timezone

from boto3 import resource

from seed_data import SEED_DATA


def _get_dynamodb_resource():
    config = {
        "region_name": os.environ.get(
            "AWS_REGION", os.environ.get("AWS_DEFAULT_REGION", "us-east-1")
        ),
    }
    endpoint_url = os.environ.get("DYNAMODB_ENDPOINT_URL")
    if endpoint_url:
        config["endpoint_url"] = endpoint_url
    return resource("dynamodb", **config)


def _table_names():
    return {
        "places": os.environ.get("DYNAMODB_TABLE_PLACES", "places"),
        "groomers": os.environ.get("DYNAMODB_TABLE_GROOMERS", "groomers"),
        "services": os.environ.get("DYNAMODB_TABLE_SERVICES", "services"),
        "gallery": os.environ.get("DYNAMODB_TABLE_GALLERY", "gallery-photos"),
        "certificates": os.environ.get("DYNAMODB_TABLE_CERTIFICATES", "certificates"),
    }


def _get_table(dynamodb, table_key):
    return dynamodb.Table(_table_names()[table_key])


def _sort_key(display_order, item_id):
    return f"{display_order:010d}#{item_id}"


def _generate_id(entity_type, key):
    """Return a stable id for an entity, derived from its natural key.

    Places, groomers and services are written with put_item without clearing
    their tables first, so a random id would orphan the existing row on every
    re-seed and invalidate its URL and cross-references.
    """
    if not key:
        raise ValueError(f"{entity_type} requires a non-empty key")
    return str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{entity_type}:{key}"))


def _timestamp():
    return datetime.now(timezone.utc).isoformat()


def _clear_table(dynamodb, table_key):
    table = _get_table(dynamodb, table_key)
    response = table.scan(ProjectionExpression="id")
    with table.batch_writer() as batch:
        for item in response.get("Items", []):
            batch.delete_item(Key={"id": item["id"]})
    while "LastEvaluatedKey" in response:
        response = table.scan(
            ProjectionExpression="id",
            ExclusiveStartKey=response["LastEvaluatedKey"],
        )
        with table.batch_writer() as batch:
            for item in response.get("Items", []):
                batch.delete_item(Key={"id": item["id"]})


def put_groomers(dynamodb, data=SEED_DATA):
    table = _get_table(dynamodb, "groomers")
    _clear_table(dynamodb, "groomers")
    place_ids_by_groomer = {}
    for place in data["places"]:
        place_id = _generate_id("place", place["key"])
        for groomer_key in place.get("groomer_ids", []):
            place_ids_by_groomer.setdefault(groomer_key, []).append(place_id)
    with table.batch_writer() as batch:
        for index, groomer in enumerate(data["groomers"]):
            groomer_id = _generate_id("groomer", groomer["key"])
            item = {
                "id": groomer_id,
                "key": groomer["key"],
                "name": groomer["name"],
                "photo": groomer.get("photo"),
                "specialty": groomer.get("specialty"),
                "display_order": index,
                "is_active": True,
                "status": "active",
                "sort_key": _sort_key(index, groomer_id),
                "place_ids": place_ids_by_groomer.get(groomer["key"], []),
                "created_at": _timestamp(),
                "updated_at": _timestamp(),
            }
            batch.put_item(Item=item)


def put_places(dynamodb, data=SEED_DATA):
    table = _get_table(dynamodb, "places")
    _clear_table(dynamodb, "places")
    with table.batch_writer() as batch:
        for index, place in enumerate(data["places"]):
            place_id = _generate_id("place", place["key"])
            item = {
                "id": place_id,
                "key": place["key"],
                "title": place["title"],
                "place": place["place"],
                "address": place.get("address"),
                "address_link": place.get("address_link"),
                "places_called": place.get("places_called"),
                "phone_number": place.get("phone_number", []),
                "photos": place.get("photos", []),
                "display_order": index,
                "is_active": True,
                "status": "active",
                "sort_key": _sort_key(index, place_id),
                "groomer_ids": [
                    _generate_id("groomer", groomer_key)
                    for groomer_key in place.get("groomer_ids", [])
                ],
                "created_at": _timestamp(),
                "updated_at": _timestamp(),
            }
            batch.put_item(Item=item)


def put_services(dynamodb, data=SEED_DATA):
    table = _get_table(dynamodb, "services")
    _clear_table(dynamodb, "services")
    with table.batch_writer() as batch:
        for index, service in enumerate(data["services"]):
            service_id = _generate_id("service", service["key"])
            media = service.get("media", [])
            primary_image = next(
                (
                    item["url"]
                    for item in media
                    if item.get("role") in {"primary", "before"}
                ),
                None,
            )
            after_image = next(
                (
                    item["url"] for item in media if item.get("role") == "after"
                ),
                None,
            )
            media_type = next(
                (item.get("media_type") for item in media),
                service.get("media_type", "image"),
            )
            item = {
                "id": service_id,
                "key": service["key"],
                "title": service["title"],
                "subtitle": service.get("subtitle"),
                "description": service.get("description"),
                "icon": service.get("icon"),
                "image_url": primary_image,
                "after_image_url": after_image,
                "media_type": media_type,
                "image_folder": service.get("image_folder"),
                "media": media,
                "display_order": index,
                "is_active": True,
                "status": "active",
                "sort_key": _sort_key(index, service_id),
                "created_at": _timestamp(),
                "updated_at": _timestamp(),
            }
            batch.put_item(Item=item)


def put_gallery_images(dynamodb, data=SEED_DATA):
    table = _get_table(dynamodb, "gallery")
    _clear_table(dynamodb, "gallery")
    with table.batch_writer() as batch:
        for index, image in enumerate(data["gallery_images"]):
            item_id = str(index + 1)
            item = {
                "id": item_id,
                "name": image.get("name", f"Gallery Image {index + 1}"),
                "alt_text": image.get("alt_text", ""),
                "photo_url": image.get("photo_url", ""),
                "display_order": index,
                "is_active": True,
                "status": "active",
                "sort_key": _sort_key(index, item_id),
                "created_at": _timestamp(),
            }
            batch.put_item(Item=item)


def put_certificates(dynamodb, data=SEED_DATA):
    table = _get_table(dynamodb, "certificates")
    _clear_table(dynamodb, "certificates")
    with table.batch_writer() as batch:
        for index, cert in enumerate(data["certificates"]):
            cert_id = _generate_id("certificate", cert["key"])
            item = {
                "id": cert_id,
                "key": cert["key"],
                "src": cert["src"],
                "alt": cert["alt"],
                "description": cert.get("description", ""),
                "locale": cert.get("locale", "fr"),
                "display_order": index,
                "is_active": True,
                "status": "active",
                "sort_key": _sort_key(index, cert_id),
                "created_at": _timestamp(),
                "updated_at": _timestamp(),
            }
            batch.put_item(Item=item)


def seed_database(dynamodb, data=SEED_DATA):
    put_groomers(dynamodb, data)
    put_places(dynamodb, data)
    put_services(dynamodb, data)
    put_gallery_images(dynamodb, data)
    put_certificates(dynamodb, data)


def lambda_handler(event, context):
    dynamodb = _get_dynamodb_resource()
    seed_database(dynamodb)
    return {"statusCode": 200, "body": "DynamoDB tables seeded."}


def main():
    parser = argparse.ArgumentParser(
        description="Seed Ambiance Canine content in DynamoDB"
    )
    parser.add_argument(
        "--region",
        default=os.environ.get(
            "AWS_REGION", os.environ.get("AWS_DEFAULT_REGION", "us-east-1")
        ),
    )
    parser.add_argument(
        "--endpoint-url",
        default=os.environ.get("DYNAMODB_ENDPOINT_URL"),
    )
    args = parser.parse_args()

    if args.endpoint_url:
        os.environ["DYNAMODB_ENDPOINT_URL"] = args.endpoint_url
    os.environ["AWS_DEFAULT_REGION"] = args.region

    dynamodb = _get_dynamodb_resource()
    seed_database(dynamodb)
    print("DynamoDB tables seeded.")


if __name__ == "__main__":
    main()
