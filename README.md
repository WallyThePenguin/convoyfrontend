# Convoy Frontend

Marketing + signup experience for Convoy built with React and Vite. The UI integrates with the Convoy backend to capture newsletter subscriptions, accept team applications, and surface live stats in the hero section.

## Prerequisites

- Node.js 18+
- Convoy backend running locally or deployed (see `../backend/README.md`)

## Environment Variables

Create `.env.local` for development (or `.env.production` for deploys) and set:

```
VITE_API_BASE_URL=http://localhost:4000
```

Point this to the backend origin you want the frontend to query (e.g., `https://api.convoy.app`). Do not include a trailing slash.

## Install & Run

```bash
npm install
npm run dev         # start Vite with HMR
npm run build       # create production bundle in dist/
npm run preview     # serve the production build locally
```

## Feature Highlights

- Hero metrics fetch live counts from `GET /api/stats/summary`.
- Newsletter form posts to `POST /api/newsletter` with loading/error feedback.
- Team application form posts to `POST /api/applications` and refreshes stats.
- Responsive layout tuned for desktop and mobile breakpoints.

## Deploy

1. Configure `VITE_API_BASE_URL` in your hosting provider.
2. Run `npm run build`.
3. Upload the `dist/` folder or let the host run the build step automatically.

Redeploy the frontend whenever the backend URL or environment variables change.
