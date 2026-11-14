# Scheme Website

A React + TypeScript + Vite application for browsing public-benefit scheme information, exploring eligibility, and using related support features. The project uses Supabase client libraries and includes serverless API handlers under `api/`.

> Scheme information can change. Always verify eligibility, benefit amounts, deadlines, and application procedures on the relevant official government portal.

## Tech stack

- React and TypeScript
- Vite
- Supabase JavaScript client
- Tailwind CSS
- Framer Motion
- Vercel-style serverless handlers in `api/`

## Repository layout

- `src/` — frontend application, components, contexts, translations, and utilities
- `api/` — server-side handlers for schemes, applications, bookmarks, feedback, and support
- `src/lib/supabase.ts` — browser Supabase client using Vite environment variables
- `vercel.json` — deployment configuration
- `package.json` — scripts and dependencies

## Requirements

- Node.js compatible with the Vite version declared in `package.json`
- npm
- A configured Supabase project for features that require backend data

## Local setup

Create a local environment file named `.env.local` in the project root. Configure the browser-safe values:

```dotenv
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
```

Never put a Supabase service-role key in a `VITE_*` variable or any frontend-exposed file. Configure server-only credentials in the hosting provider's encrypted environment settings.

Install and start:

```bash
npm ci
npm run dev
```

Other available scripts:

```bash
npm run build
npm run lint
npm run preview
```

## Deployment configuration

The frontend reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Serverless code under `api/` must use server-only environment variables where required. Review `api/db-client.js` before deployment: it references `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`, while the browser client uses Vite-prefixed variables. Configure the server-only values securely and align the URL variable names in deployment settings; do not copy service-role credentials into the repository.

## Data accuracy and trust

- Prefer official government sources for scheme names, benefits, eligibility, and application URLs.
- Record source URLs and a last-verified date for each scheme record.
- Clearly label illustrative, generated, or sample scheme content; never present it as verified government policy.
- Do not promise eligibility based solely on a client-side wizard.
- Provide an accessible disclaimer and a path to the official application portal.

## Pre-deployment checklist

- Confirm Supabase URL/key configuration separately for browser and server code.
- Review Supabase Row Level Security policies and database permissions.
- Verify that service-role credentials are server-only and never committed.
- Test every API route, empty/error state, and external link.
- Run `npm run build` and `npm run lint`.
- Verify scheme data against official sources and add a last-verified date.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
