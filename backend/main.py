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
            "image": "/images/services/design/photo_1.jpg",
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
            "image": "/images/services/teeth_brush/photo_1.jpg",
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
            "image": "/images/services/spa/photo_1.jpg",
        },
    ]
    return services


@app.get("/api/booking")
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
        "message": "Your visit request has been saved! We will contact you shortly to confirm your booking.",
    }


@app.get("/api/places")
def get_places():
    # Mock place data - add this endpoint
    return {
        "places": [
            {
                "id": "1",
                "title": "Cagnes-sur-Mer",
                "place": "Cagnes-sur-Mer",
                "phone_number": ["+33 4 93 00 00 00"],
                "photos": [
                    "/saloon/main-salon-1.jpg",
                    "/saloon/main-salon-2.jpg",
                    "/saloon/main-salon-3.jpg",
                ],
                "groomers": [
                    {
                        "id": "1",
                        "name": "Sofia",
                        "placesIds": ["1"],
                        "photo": "/groomer/groomer-1.jpg",
                    }
                ],
                "address": "64 Bd Maréchal Juin, 06800 Cagnes-sur-Mer",
                "addressLink": "https://www.google.com/maps/search/?api=1&query=64+Bd+Marechal+Juin,+06800+Cages-sur-Mer",
            },
            {
                "id": "2",
                "title": "Nice",
                "place": "Nice",
                "phone_number": ["+33 6 00 00 00 00"],
                "photos": [
                    "/saloon/mobile-service-1.jpg",
                    "/saloon/mobile-service-2.jpg",
                    "/saloon/mobile-service-3.jpg",
                ],
                "groomers": [
                    {
                        "id": "1",
                        "name": "Sofia",
                        "placesIds": ["1"],
                        "photo": "/groomer/groomer-1.jpg",
                    }
                ],
                "address": "5 Rue Vernier, 06000 Nice",
                "addressLink": "https://www.google.com/maps/search/?api=1&query=5+Rue+Vernier,+06000+Nice",
            },
        ],
        "groomers": [
            {
                "id": "1",
                "name": "Sofia",
                "placesIds": ["1"],
                "photo": "/groomer/groomer-1.jpg",
            },
            {
                "id": "2",
                "name": "Sarah",
                "placesIds": ["2"],
                "photo": "/groomer/groomer-2.jpg",
            },
        ],
    }
