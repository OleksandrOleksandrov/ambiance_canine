from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="Paradise des Animaux API")

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class BookingRequest(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    service: str
    message: Optional[str] = None
    date: Optional[str] = None
    image_folder: Optional[str] = None


@app.get("/api/services")
def get_services():
    services = [
        {
            "id": "grooming",
            "title": "Full Dog Grooming & Styling",
            "subtitle": "Hygiene, Health & Creative Design",
            "description": (
                "Dog grooming is essential for hygiene and health. Includes bathing, "
                "brushing, nail trims, ear cleaning, and teeth care to keep skin healthy, "
                "prevent matting, control shedding, and check for health issues."
            ),
            "icon": "✂️",
            "image_folder": "design",
        },
        {
            "id": "teeth-brushing",
            "title": "Teeth Brushing",
            "subtitle": "Dental Hygiene & Care",
            "description": (
                "Crucial for preventing dental disease. We use special enzymatic toothpaste "
                "and dog-specific brushes, targeting outer surfaces and gumlines with gentle care "
                "to reduce plaque and tartar buildup."
            ),
            "icon": "🪥",
            "image_folder": "teeth_brush",
        },
        {
            "id": "ozone-spa",
            "title": "Spa & Ozone Therapy",
            "subtitle": "Deep Cleanse & Healing Bath",
            "description": (
                "Ozone-infused water with ultrasonic micro-bubbles deeply cleanses skin, "
                "improves circulation, relieves allergy/infection itching, deodorizes, "
                "and promotes healing for hot spots and arthritis."
            ),
            "icon": "🛁",
            "image_folder": "spa",
        },
    ]
    # Convert image_folder to image path
    for service in services:
        service["image"] = f"/public/{service['image_folder']}/photo_1.jpg"
    return services


@app.post("/api/booking")
def create_booking(booking: BookingRequest):
    if (
        not booking.name.strip()
        or not booking.phone.strip()
        or not booking.service.strip()
    ):
        raise HTTPException(
            status_code=400,
            detail="Name, phone number, and service selection are required.",
        )

    print(f"New Booking Received: {booking.model_dump()}")

    return {
        "success": True,
        "message": "Your visit request has been sent! We will contact you shortly to confirm your booking.",
    }
