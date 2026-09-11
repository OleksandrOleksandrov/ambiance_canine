<h1 style="margin: 0; font-size: 2em;">Ambiance Canine — L'Éden des Animaux</h1>
<p style="margin-top: 8px;">A premium dog grooming salon website with locations in <strong>Cagnes-sur-Mer</strong> and <strong>Nice, France</strong>. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4.</p>

---

## 🌐 Environments

We're live across multiple environments:

| Environment | URL | Description |
|-------------|-----|-------------|
| **🌟 Production** | https://d1r3btwzyaa7pg.cloudfront.net | The reliable gold standard |
| **🧪 Staging** | https://dk0gm769iduok.cloudfront.net | Where we polish the rough edges |
| **🛠️ Development** | https://d28y4aqu1ibh05.cloudfront.net | Our experimental playground |

## 🌟 Overview

**Ambiance Canine** (brand name: *L'Éden des Animaux*) is a professional dog grooming service offering personalized care for your beloved pets. The website showcases services, locations, team members, and provides an elegant booking experience.

### Key Features

- **Multi-location support** — Cagnes-sur-Mer & Nice, France
- **Three service categories** — Creative Design, Dental Care, Spa & Ozone Therapy
- **Team profiles** — Professional groomers with photos and assignments
- **Dark/Light theme** — Full theme switching with persistence
- **Responsive design** — Mobile-first, works beautifully on all devices
- **Image galleries** — Before/after comparisons, salon photos, team photos
- **Location finder** — Interactive cards with Google Maps integration
- **Authentication ready** — Clerk integration for future user accounts

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.3.0 | React framework with App Router |
| React | 19.2.8 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling |
| Clerk | 6.39.0 | Authentication |
| Embla Carousel | 9.x | Carousel/slider component |
| LightGallery | 2.9.0 | Image gallery lightbox |
| Lottie React | 3.1.0 | Animations |

### Backend (API)
| Technology | Purpose |
|------------|---------|
| FastAPI | High-performance Python API |
| OpenAI | GPT-5-nano for AI-powered consultation summaries |
| Clerk Auth | JWT validation for API protection |

### Infrastructure & DevOps
| Tool | Purpose |
|------|---------|
| Terraform | AWS infrastructure as code |
| Vercel/CloudFront | Global CDN deployment |
| GitHub Actions | CI/CD pipelines |
| AWS S3 | Image/video asset storage |

---

## 📦 Project Structure

```
ambiance_canine/
├── api/                      # FastAPI backend
│   └── index.py             # AI consultation summary endpoint
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   │   ├── page.tsx     # Home page
│   │   │   ├── layout.tsx   # Root layout
│   │   │   ├── globals.css  # Global styles
│   │   │   └── places/      # Location detail pages
│   │   ├── components/      # React components
│   │   │   ├── Hero.tsx           # Landing hero section
│   │   │   ├── Services.tsx       # Services showcase
│   │   │   ├── PlaceSelect.tsx    # Location cards
│   │   │   ├── PlaceDetailView.tsx# Location detail page
│   │   │   ├── Gallery.tsx        # Image gallery
│   │   │   ├── Certificates.tsx   # Certifications display
│   │   │   ├── Navbar.tsx         # Navigation bar
│   │   │   ├── Footer.tsx         # Site footer
│   │   │   ├── BeforeAfterComparison.tsx
│   │   │   └── SocialLinks.tsx    # Social media links
│   │   ├── contexts/        # React contexts
│   │   │   └── ThemeContext.tsx   # Dark/light theme management
│   │   ├── data/            # Static data
│   │   │   └── mockPlaces.ts      # Salon locations & team data
│   │   ├── types/           # TypeScript definitions
│   │   │   └── index.ts           # Core type definitions
│   │   └── constants/       # App constants
│   │       └── strings.ts         # Brand name, copy
│   ├── public/              # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
├── terraform/               # AWS infrastructure
│   ├── main.tf             # Main Terraform config
│   ├── variables.tf        # Input variables
│   ├── outputs.tf          # Output values
│   ├── backend.tf          # State backend config
│   ├── prod.tfvars         # Production variables
│   └── versions.tf         # Provider versions
├── scripts/                # Utility scripts
│   ├── deploy.sh           # Deployment script
│   ├── run_local.py        # Local development runner
│   └── destroy.sh          # Infrastructure teardown
├── .github/workflows/      # CI/CD pipelines
│   ├── deploy.yml          # Deploy workflow
│   └── destroy.yml         # Destroy workflow
├── package.json            # Root package.json (monorepo)
├── tsconfig.json           # Root TypeScript config
├── eslint.config.mjs       # ESLint configuration
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+ (for API)
- pnpm / npm / yarn
- AWS CLI configured (for deployment)
- Terraform 1.5+ (for infrastructure)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ambiance_canine

# Install frontend dependencies
cd frontend
npm install

# Install API dependencies (in separate terminal)
cd ../api
pip install -r requirements.txt  # Create requirements.txt from imports
```

### Environment Variables

Create `.env.local` in `frontend/`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
CLERK_JWKS_URL=https://xxx.clerk.accounts.dev/.well-known/jwks.json

# API
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create `.env` in `api/`:

```env
CLERK_JWKS_URL=https://xxx.clerk.accounts.dev/.well-known/jwks.json
OPENAI_API_KEY=sk-xxx
```

### Development

```bash
# Terminal 1: Start frontend (from frontend/)
npm run dev

# Terminal 2: Start API (from api/)
python -m uvicorn index:app --reload --port 8000

# Terminal 3: Run local infra (optional)
python scripts/run_local.py
```

Visit `http://localhost:3000` for the frontend and `http://localhost:8000/docs` for API docs.

---

### Deploy to Production

```bash
# Using the deploy script
./scripts/deploy.sh prod

# Or via GitHub Actions
git push origin main  # Triggers deploy workflow
```

### Destroy Infrastructure

```bash
./scripts/destroy.sh prod
# Or via GitHub Actions: workflow_dispatch on destroy.yml
```

---

## 🎨 Services Offered

### 1. Holiday, Design & Creativity
*Creative grooming with artistic flair — perfect for special occasions*
- Breed-standard cuts
- Creative styling & coloring
- Holiday-themed designs
- Show preparation

### 2. Teeth Brushing
*Professional dental hygiene for optimal oral health*
- Ultrasonic scaling
- Polishing & fluoride treatment
- Before/after comparison
- Home care guidance

### 3. Spa & Ozone Therapy
*Deep cleanse and healing bath with ozone technology*
- Ozonated hydrotherapy
- Skin condition treatment
- Relaxation & stress relief
- Therapeutic benefits for allergies, dermatitis

---

## 🏢 Locations

### Cagnes-sur-Mer
- **Address:** 64 Bd Maréchal Juin, 06800 Cagnes-sur-Mer
- **Phone:** +33 4 93 20 71 94
- **Team:** Oleksandr, Natasha
- [View on Google Maps](https://www.google.com/maps/search/?api=1&query=64+Bd+Marechal+Juin,+06800+Cages-sur-Mer)

### Nice
- **Address:** 5 Rue Vernier, 06000 Nice
- **Phone:** +33 9 81 98 37 34 / +33 7 68 22 46 54
- **Team:** Oleksandr, Natasha
- [View on Google Maps](https://www.google.com/maps/search/?api=1&query=5+Rue+Vernier,+06000+Nice)

---

## 👥 Team

| Groomer | Locations | Specialty |
|---------|-----------|-----------|
| **Oleksandr** | Cagnes-sur-Mer, Nice | Creative Design, Show Grooming |
| **Natasha** | Cagnes-sur-Mer, Nice | Dental Care, Spa Therapy |

---

## 🔧 API Endpoints

### POST `/api`
Generates AI-powered consultation summaries for veterinary visits.

**Request:**
```json
{
  "patient_name": "Buddy",
  "date_of_visit": "2024-01-15",
  "notes": "Patient presented with..."
}
```

**Response:** Server-sent events stream with three sections:
1. Summary for doctor's records
2. Next steps for the doctor
3. Draft email to patient

**Authentication:** Requires Clerk JWT token via `Authorization: Bearer <token>`

---

## 📝 Available Scripts

### Frontend (from `frontend/`)
```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Root (monorepo)
```bash
npm run dev      # Same as frontend dev
npm run build    # Same as frontend build
npm run start    # Same as frontend start
npm run lint     # Same as frontend lint
```

---

## 🏗 Infrastructure (Terraform)

The `terraform/` directory contains AWS infrastructure:

- **S3 Buckets** — Asset storage (images, videos)
- **CloudFront Distributions** — Global CDN for each environment
- **Route53** — DNS management (if configured)
- **ACM Certificates** — SSL/TLS for custom domains

### Key Files
- `main.tf` — Core resources
- `variables.tf` — Configurable inputs
- `prod.tfvars` — Production-specific values
- `backend.tf` — Remote state configuration (S3 + DynamoDB)

---

## 🔐 Authentication

Uses **Clerk** for authentication:
- User sign-up/sign-in
- JWT token management
- Protected API routes
- Organization support (future)

Configuration in `frontend/src/app/layout.tsx` with `<ClerkProvider>`.

---

## 🎯 Roadmap

- [ ] Online booking system with calendar integration
- [ ] Customer portal with visit history
- [ ] Loyalty program & rewards
- [ ] Multi-language support (French/English)
- [ ] Mobile app (React Native)
- [ ] Inventory & product sales
- [ ] Automated appointment reminders (SMS/Email)

---

## 📄 License

Private project — All rights reserved.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Contact

**Ambiance Canine — L'Éden des Animaux**
- Website: [Production](https://d1r3btwzyaa7pg.cloudfront.net)
- Email: Contact via website form
- Locations: Cagnes-sur-Mer & Nice, France

---

*Built with ❤️ for dogs and their humans*