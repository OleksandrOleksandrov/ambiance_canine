#!/usr/bin/env python3
"""Create DynamoDB tables and seed initial content for Ambiance Canine."""

import argparse
import os
import sys
import time
from pathlib import Path

from boto3 import client as boto3_client, resource as boto3_resource
from botocore.exceptions import ClientError, WaiterError

sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from seed_db import (
    _table_names,
    seed_database,
)


TABLE_DEFINITIONS = {
    "places": {
        "AttributeDefinitions": [
            {"AttributeName": "id", "AttributeType": "S"},
            {"AttributeName": "status", "AttributeType": "S"},
            {"AttributeName": "sort_key", "AttributeType": "S"},
        ],
        "KeySchema": [{"AttributeName": "id", "KeyType": "HASH"}],
        "GlobalSecondaryIndexes": [
            {
                "IndexName": "ActiveOrderedIndex",
                "KeySchema": [
                    {"AttributeName": "status", "KeyType": "HASH"},
                    {"AttributeName": "sort_key", "KeyType": "RANGE"},
                ],
                "Projection": {"ProjectionType": "ALL"},
            }
        ],
        "BillingMode": "PAY_PER_REQUEST",
    },
    "groomers": {
        "AttributeDefinitions": [
            {"AttributeName": "id", "AttributeType": "S"},
            {"AttributeName": "status", "AttributeType": "S"},
            {"AttributeName": "sort_key", "AttributeType": "S"},
        ],
        "KeySchema": [{"AttributeName": "id", "KeyType": "HASH"}],
        "GlobalSecondaryIndexes": [
            {
                "IndexName": "ActiveOrderedIndex",
                "KeySchema": [
                    {"AttributeName": "status", "KeyType": "HASH"},
                    {"AttributeName": "sort_key", "KeyType": "RANGE"},
                ],
                "Projection": {"ProjectionType": "ALL"},
            }
        ],
        "BillingMode": "PAY_PER_REQUEST",
    },
    "services": {
        "AttributeDefinitions": [
            {"AttributeName": "id", "AttributeType": "S"},
            {"AttributeName": "status", "AttributeType": "S"},
            {"AttributeName": "sort_key", "AttributeType": "S"},
        ],
        "KeySchema": [{"AttributeName": "id", "KeyType": "HASH"}],
        "GlobalSecondaryIndexes": [
            {
                "IndexName": "ActiveOrderedIndex",
                "KeySchema": [
                    {"AttributeName": "status", "KeyType": "HASH"},
                    {"AttributeName": "sort_key", "KeyType": "RANGE"},
                ],
                "Projection": {"ProjectionType": "ALL"},
            }
        ],
        "BillingMode": "PAY_PER_REQUEST",
    },
    "gallery": {
        "AttributeDefinitions": [
            {"AttributeName": "id", "AttributeType": "S"},
            {"AttributeName": "status", "AttributeType": "S"},
            {"AttributeName": "sort_key", "AttributeType": "S"},
        ],
        "KeySchema": [{"AttributeName": "id", "KeyType": "HASH"}],
        "GlobalSecondaryIndexes": [
            {
                "IndexName": "ActiveOrderedIndex",
                "KeySchema": [
                    {"AttributeName": "status", "KeyType": "HASH"},
                    {"AttributeName": "sort_key", "KeyType": "RANGE"},
                ],
                "Projection": {"ProjectionType": "ALL"},
            }
        ],
        "BillingMode": "PAY_PER_REQUEST",
    },
    "certificates": {
        "AttributeDefinitions": [
            {"AttributeName": "id", "AttributeType": "S"},
            {"AttributeName": "status", "AttributeType": "S"},
            {"AttributeName": "sort_key", "AttributeType": "S"},
        ],
        "KeySchema": [{"AttributeName": "id", "KeyType": "HASH"}],
        "GlobalSecondaryIndexes": [
            {
                "IndexName": "ActiveOrderedIndex",
                "KeySchema": [
                    {"AttributeName": "status", "KeyType": "HASH"},
                    {"AttributeName": "sort_key", "KeyType": "RANGE"},
                ],
                "Projection": {"ProjectionType": "ALL"},
            }
        ],
        "BillingMode": "PAY_PER_REQUEST",
    },
}


def table_exists(client, table_name):
    try:
        client.describe_table(TableName=table_name)
        return True
    except client.exceptions.ResourceNotFoundException:
        return False


def create_tables(client, table_names):
    created = []
    for key, table_name in table_names.items():
        if table_exists(client, table_name):
            print(f"  Table already exists: {table_name}")
            continue
        print(f"  Creating table: {table_name}")
        client.create_table(
            TableName=table_name,
            **TABLE_DEFINITIONS[key],
        )
        created.append(table_name)
    return created


def wait_for_tables(client, table_names):
    for table_name in table_names:
        print(f"  Waiting for {table_name} to become active...")
        try:
            waiter = client.get_waiter("table_exists")
            waiter.wait(TableName=table_name, WaiterConfig={"Delay": 2, "MaxAttempts": 30})
        except WaiterError:
            print(f"  Warning: {table_name} did not become active in time")
            continue


def setup_database(region=None, endpoint_url=None):
    if region:
        os.environ["AWS_DEFAULT_REGION"] = region
    if endpoint_url:
        os.environ["DYNAMODB_ENDPOINT_URL"] = endpoint_url

    table_names = _table_names()
    client = boto3_client(
        "dynamodb",
        region_name=os.environ.get("AWS_DEFAULT_REGION", "us-east-1"),
        endpoint_url=endpoint_url or os.environ.get("DYNAMODB_ENDPOINT_URL"),
    )

    print("Creating DynamoDB tables...")
    create_tables(client, table_names)

    created = [
        name for name in table_names.values() if table_exists(client, name)
    ]
    if created:
        wait_for_tables(client, created)

    resource = boto3_resource(
        "dynamodb",
        region_name=os.environ.get("AWS_DEFAULT_REGION", "us-east-1"),
        endpoint_url=endpoint_url or os.environ.get("DYNAMODB_ENDPOINT_URL"),
    )

    print("Seeding data...")
    seed_database(resource)
    return True


def main():
    parser = argparse.ArgumentParser(
        description="Set up Ambiance Canine DynamoDB tables and seed content"
    )
    parser.add_argument(
        "--region",
        default=os.environ.get("AWS_REGION", os.environ.get("AWS_DEFAULT_REGION", "us-east-1")),
    )
    parser.add_argument(
        "--endpoint-url",
        default=os.environ.get("DYNAMODB_ENDPOINT_URL"),
        help="DynamoDB endpoint URL (e.g., http://localhost:8001 for DynamoDB Local)",
    )
    args = parser.parse_args()

    if setup_database(region=args.region, endpoint_url=args.endpoint_url):
        print("DynamoDB setup complete.")
    else:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
