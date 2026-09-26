PLACES = [
    {
        "key": "cagnes-sur-mer",
        "title": "Cagnes-sur-Mer",
        "place": "Cagnes-sur-Mer",
        "phone_number": ["+33 4 93 20 71 94"],
        "photos": [
            "https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_1.jpg",
            "https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_2.jpg",
            "https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_3.jpg",
            "https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_4.jpg",
            "https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_5.jpg",
            "https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_6.jpg",
            "https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_7.jpg",
            "https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_8.jpg",
            "https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_9.jpg",
            "https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_10.jpg",
            "https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_11.jpg",
            "https://ambiance-s3.s3.us-east-1.amazonaws.com/saloon/image_place_cagnes_sur_mer_12.jpg",
        ],
        "address": "64 Bd Maréchal Juin, 06800 Cages-sur-Mer",
        "address_link": "https://www.google.com/maps/search/?api=1&query=64+Bd+Marechal+Juin,+06800+Cages-sur-Mer",
        "groomer_ids": ["oleksandr", "natasha"],
    },
    {
        "key": "cagnes-sur-mer-new",
        "title": "Cagnes-sur-Mer-new",
        "place": "Cagnes-sur-Mer-new",
        "phone_number": ["+33 4 93 20 71 94"],
        "photos": None,
        "address": "Cages-sur-Mer",
        "address_link": "https://www.google.com/maps/search/?api=1&query=64+Bd+Marechal+Juin,+06800+Cages-sur-Mer",
        "groomer_ids": ["oleksandr", "natasha"],
    },
    {
        "key": "nice",
        "title": "Nice",
        "place": "Nice",
        "phone_number": ["+33 9 81 98 37 34", "+33 7 68 22 46 54"],
        "photos": [
            "https://ambiance-dev.s3.us-east-1.amazonaws.com/saloon/image_place_nice_1.jpg",
            "https://ambiance-dev.s3.us-east-1.amazonaws.com/saloon/image_place_nice_2.jpg",
        ],
        "address": "5 Rue Vernier, 06000 Nice",
        "address_link": "https://www.google.com/maps/search/?api=1&query=5+Rue+Vernier,+06000+Nice",
        "groomer_ids": ["oleksandr", "natasha"],
    },
]

GROOMERS = [
    {
        "key": "oleksandr",
        "name": "Oleksandr",
        "photo": "https://ambiance-dev.s3.us-east-1.amazonaws.com/groomer/image_groomer_oleksandr_1.jpeg",
        "specialty": "Creative Design, Show Grooming",
    },
    {
        "key": "natasha",
        "name": "Natasha",
        "photo": "https://ambiance-dev.s3.us-east-1.amazonaws.com/groomer/image_groomer_natasha_1.jpg",
        "specialty": "Dental Care, Spa Therapy",
    },
]

SERVICES = [
    {
        "key": "creative-design",
        "title": "Holiday, Design & Creativity",
        "subtitle": "Hygiene, Health & Creative Design",
        "description": "Explore our personalized services tailored to your dog's needs.",
        "icon": "✂️",
        "image_folder": "design",
        "media_type": "image",
        "media": [
            {
                "url": "https://ambiance-dev.s3.us-east-1.amazonaws.com/design/photo_design_1.jpg",
                "media_type": "image",
                "role": "primary",
                "alt_text": "Creative dog grooming design",
            },
            {
                "url": "https://ambiance-dev.s3.us-east-1.amazonaws.com/design/photo_design_2.jpg",
                "media_type": "image",
                "role": "primary",
                "alt_text": "Holiday dog grooming design",
            },
            {
                "url": "https://ambiance-dev.s3.us-east-1.amazonaws.com/design/photo_design_3.jpg",
                "media_type": "image",
                "role": "primary",
                "alt_text": "Creative grooming styling",
            },
            {
                "url": "https://ambiance-dev.s3.us-east-1.amazonaws.com/design/photo_design_4.jpg",
                "media_type": "image",
                "role": "primary",
                "alt_text": "Dog grooming creative design",
            },
            {
                "url": "https://ambiance-dev.s3.us-east-1.amazonaws.com/design/photo_design_5.jpg",
                "media_type": "image",
                "role": "primary",
                "alt_text": "Dog styling and creative grooming",
            },
        ],
    },
    {
        "key": "teeth-brushing",
        "title": "Teeth Brushing",
        "subtitle": "Dental Hygiene & Care",
        "description": "Gentle dental care to help keep your dog's teeth and gums healthy.",
        "icon": "🪥",
        "image_folder": "teeth_brush",
        "media_type": "image",
        "media": [
            {
                "url": "https://ambiance-dev.s3.us-east-1.amazonaws.com/teeth_brush/photo_teeth_brush_1.jpg",
                "media_type": "image",
                "role": "before",
                "alt_text": "Dog teeth before brushing",
            },
            {
                "url": "https://ambiance-dev.s3.us-east-1.amazonaws.com/teeth_brush/photo_teeth_brush_2.jpg",
                "media_type": "image",
                "role": "after",
                "alt_text": "Dog teeth after brushing",
            },
        ],
    },
    {
        "key": "ozone-spa",
        "title": "Spa & Ozone Therapy",
        "subtitle": "Deep Cleanse & Healing Bath",
        "description": "A soothing ozone therapy session designed to cleanse and comfort sensitive skin.",
        "icon": "🛁",
        "image_folder": "spa",
        "media_type": "video",
        "media": [
            {
                "url": "https://ambiance-dev.s3.us-east-1.amazonaws.com/spa/video_spa_1.mov",
                "media_type": "video",
                "role": "primary",
                "alt_text": "Dog ozone spa therapy",
            },
        ],
    },
]

GALLERY_IMAGES = [
    {
        "name": f"Salon Image {index}",
        "alt_text": f"Salon Image {index}",
        "photo_url": f"https://ambiance-dev.s3.us-east-1.amazonaws.com/gallery/photo_gallery_{index}.jpg",
    }
    for index in range(1, 16)
]

CERTIFICATES = [
    {
        "key": "spa-ozon-fr",
        "src": "https://ambiance-s3.s3.us-east-1.amazonaws.com/certificates/untitled+folder/image_certificate_spa_ozon_rf.jpg",
        "alt": "Bon cadeau spa à l’ozone",
        "description": "Offrez à votre chien une séance de spa à l’ozone revitalisante. Ce soin oxygénant et purifiant nourrit le poil et procure une détente profonde — idéal pour les peaux sensibles et les pattes fatiguées.",
        "locale": "fr",
    },
    {
        "key": "gift-50-fr",
        "src": "https://ambiance-s3.s3.us-east-1.amazonaws.com/certificates/untitled+folder/image_certificate_50_euro_gift_fr.jpg",
        "alt": "Bon cadeau de 50 euros",
        "description": "Un crédit de 50 € valable pour tout service de toilettage ou de spa. Offrez un moment de soin personnalisé, disponible dans nos salons de Cagnes-sur-Mer et de Nice.",
        "locale": "fr",
    },
    {
        "key": "spa-ozon",
        "src": "https://ambiance-s3.s3.us-east-1.amazonaws.com/certificates/untitled+folder/image_certificate_spa_ozon.jpg",
        "alt": "Подарочный сертификат на озоновый спа",
        "description": "Нежная озоновая спа-процедура насыщает кожу кислородом, очищает и увлажняет шерсть вашего питомца — прекрасный способ подарить ему заслуженный отдых после насыщенного дня.",
        "locale": "ru",
    },
    {
        "key": "gift-50",
        "src": "https://ambiance-s3.s3.us-east-1.amazonaws.com/certificates/untitled+folder/image_certificate_50_euro_gift.jpg",
        "alt": "Подарочный сертификат на 50 евро",
        "description": "Универсальный подарочный сертификат на 50 €, который можно использовать для груминга, чистки зубов или фирменных спа-процедур — выбор за вами, удовольствие получит ваша собака.",
        "locale": "ru",
    },
]

SEED_DATA = {
    "places": PLACES,
    "groomers": GROOMERS,
    "services": SERVICES,
    "gallery_images": GALLERY_IMAGES,
    "certificates": CERTIFICATES,
}
