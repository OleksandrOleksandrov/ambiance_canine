import argparse
import os
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
    place_ids_by_groomer = {}
    for place in data["places"]:
        for slug in place.get("groomer_slugs", []):
            place_ids_by_groomer.setdefault(slug, []).append(place["slug"])
    with table.batch_writer() as batch:
        for index, groomer in enumerate(data["groomers"]):
            item = {
                "id": groomer["slug"],
                "slug": groomer["slug"],
                "name": groomer["name"],
                "photo": groomer.get("photo"),
                "specialty": groomer.get("specialty"),
                "display_order": index,
                "is_active": True,
                "status": "active",
                "sort_key": _sort_key(index, groomer["slug"]),
                "place_ids": place_ids_by_groomer.get(groomer["slug"], []),
                "created_at": _timestamp(),
                "updated_at": _timestamp(),
            }
            batch.put_item(Item=item)


def put_places(dynamodb, data=SEED_DATA):
    table = _get_table(dynamodb, "places")
    with table.batch_writer() as batch:
        for index, place in enumerate(data["places"]):
            item = {
                "id": place["slug"],
                "slug": place["slug"],
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
                "sort_key": _sort_key(index, place["slug"]),
                "groomer_ids": place.get("groomer_slugs", []),
                "created_at": _timestamp(),
                "updated_at": _timestamp(),
            }
            batch.put_item(Item=item)


def put_services(dynamodb, data=SEED_DATA):
    table = _get_table(dynamodb, "services")
    with table.batch_writer() as batch:
        for index, service in enumerate(data["services"]):
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
                "id": service["slug"],
                "slug": service["slug"],
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
                "sort_key": _sort_key(index, service["slug"]),
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
            item = {
                "id": cert["id"],
                "slug": cert["id"],
                "src": cert["src"],
                "alt": cert["alt"],
                "description": cert.get("description", ""),
                "locale": cert.get("locale", "fr"),
                "display_order": index,
                "is_active": True,
                "status": "active",
                "sort_key": _sort_key(index, cert["id"]),
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
