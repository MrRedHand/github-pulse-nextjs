# GitHub DevPulse

Server-rendered dashboard for public GitHub repositories — stats, commits, README, and a explainable Health Score.

# Features

Next.js App Router — file-based routing, Server Components by default, minimal client JS (search form + error boundary only).

Server-first data fetching — GitHub REST API called from the server; token via server-only, never in the browser bundle.

Dynamic route /repo/[owner]/[name] — params validation, generateMetadata, notFound() for missing repos.

Layered architecture — app → features → entities → shared; DTO → domain model → UI.

DevPulse Health Score — weighted heuristic (Activity 35%, Maintenance 25%, Community 20%, Issue Health 20%) in pure TypeScript, no React.

Parallel + streamed loading — Promise.all for repo/commits; Suspense streams README separately.

Caching — fetch revalidate 300s + React.cache() dedupes metadata/page requests.

Loading / error / 404 — loading.tsx, error.tsx with reset, custom not-found.tsx.

README rendering — react-markdown + GFM + raw HTML support (rehype-raw + rehype-sanitize).

Intentionally simple — no database, OAuth, Route Handlers proxy, or client data libraries.

Run
npm install

# .env.local → GITHUB_TOKEN=...

npm run dev
Open http://localhost:3000 → try vercel/next.js.
