import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from db import (
    database_is_healthy,
    get_certificates_from_db,
    get_gallery_images_from_db,
    get_groomers_from_db,
    get_place_from_db,
    get_places_from_db,
    get_services_from_db,
)


def cors_origins():
    raw_origins = os.environ.get("CORS_ORIGINS", "http://localhost:3000")
    origins = [
        origin.strip()
        for origin in raw_origins.split(",")
        if origin.strip()
    ]
    return origins or ["http://localhost:3000"]


origins = cors_origins()
app = FastAPI(title="Ambiance Canine API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials="*" not in origins,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"service": "ambiance-canine-api", "status": "ok"}


@app.get("/health")
async def health():
    try:
        healthy = await database_is_healthy()
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="Database is unavailable.",
        ) from exc
    if not healthy:
        raise HTTPException(
            status_code=503,
            detail="Database is unavailable.",
        )
    return {"status": "ok"}


@app.get("/api/services")
async def services():
    try:
        return await get_services_from_db()
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="Content service is unavailable.",
        ) from exc


@app.get("/api/places")
async def places():
    try:
        return {
            "places": await get_places_from_db(),
            "groomers": await get_groomers_from_db(),
        }
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="Location service is unavailable.",
        ) from exc


@app.get("/api/places/{place_id}")
async def place(place_id: str):
    try:
        result = await get_place_from_db(place_id)
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="Location service is unavailable.",
        ) from exc
    if result is None:
        raise HTTPException(status_code=404, detail="Place not found.")
    return result


@app.get("/api/gallery")
async def gallery():
    try:
        return {"images": await get_gallery_images_from_db()}
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="Gallery service is unavailable.",
        ) from exc


@app.get("/api/certificates")
async def certificates():
    try:
        return {"certificates": await get_certificates_from_db()}
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="Certificate service is unavailable.",
        ) from exc