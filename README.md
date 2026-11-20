# QUIET BATTLES™ – Website Demo

Technical assessment for Pholus Globos Facility Service Pvt. Ltd.

## Links
- Website: [Vercel link, deploy ke baad]
- Admin panel: [Strapi link]/admin
- Source code: [GitHub link]

## Tech stack
| Layer | Tool | Why |
|---|---|---|
| Frontend | Next.js (App Router), React, Tailwind CSS | Fast, SEO-friendly, responsive |
| CMS and backend | Strapi (headless CMS) | Admin panel, API and media library built in |
| Database | SQLite (local), PostgreSQL (production) | Simple locally, reliable in production |
| Cart | React Context and localStorage | Enough for a demo |
| Hosting | Vercel (frontend), Render (backend) | Free tiers, Git-based deploys |

## Third-party items (disclosed)
- Placeholder photos: Unsplash
- Fonts: Cormorant Garamond and Inter (Google Fonts)
- Libraries: Next.js, React, Tailwind CSS, Strapi

## Architecture
Admin (Strapi) → Database → REST API → Next.js pages → Visitor's browser

Content model: Series → many Chapters → each Chapter linked to one Product.

## Run locally
1. Backend: cd backend, npm install, npm run develop (http://localhost:1337/admin)
2. Frontend: cd frontend, npm install, npm run dev (http://localhost:3000)
3. In frontend create .env.local with: STRAPI_URL=http://localhost:1337

## What the admin can do without a developer
- Add or edit Series, Chapters and Products
- Upload and replace images
- Publish or unpublish content