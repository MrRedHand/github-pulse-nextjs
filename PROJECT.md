# Project Github DevPulse
server-rendered analytics dashboard for any public GitHub repository

# MVP Scope
src/
├── app/
│   ├── layout.tsx                 # root layout, fonts, metadata
│   ├── page.tsx                   # home — search form
│   ├── not-found.tsx              # global 404
│   └── repo/
│       └── [owner]/
│           └── [name]/
│               ├── page.tsx       # Server Component — orchestration
│               ├── loading.tsx
│               ├── error.tsx
│               └── not-found.tsx  # optional, или global
│
├── features/
│   ├── search/
│   │   └── ui/
│   │       └── RepositorySearchForm.tsx   # Client Component
│   └── repository/
│       └── ui/
│           ├── RepositoryPage.tsx         # Server — composes sections
│           ├── RepositoryHeader.tsx
│           ├── RepositoryStats.tsx
│           ├── CommitList.tsx
│           ├── ReadmeSection.tsx
│           └── HealthScoreBadge.tsx
│
├── entities/
│   └── repository/
│       ├── model/
│       │   ├── types.ts           # domain types (Repository, Commit)
│       │   └── health-score.ts    # pure domain logic
│       └── api/
│           ├── github-client.ts   # low-level fetch wrapper
│           ├── get-repository.ts
│           ├── get-commits.ts
│           └── get-readme.ts
│
└── shared/
    ├── ui/                        # Card, Badge, Input — dumb components
    ├── lib/
    │   └── parse-repo-slug.ts     # "vercel/next.js" → { owner, name }
    └── types/
        └── github-dto.ts          # raw API response types


Routes:
  /                           → repo search
  /repo/[owner]/[name]        → analytics page

Data (GitHub REST):
  GET /repos/{owner}/{repo}
  GET /repos/{owner}/{repo}/commits?per_page=10
  GET /repos/{owner}/{repo}/readme

UI blocks:
  RepositoryHeader      (name, description, owner link)
  RepositoryStats       (stars, forks, issues, language, updated)
  HealthScoreBadge      (rating)
  CommitList            (last 10 commits)
  ReadmeSection         (rendered markdown — server-side)

Next.js mechanics:
Server Components (default)
Dynamic route + params validation
notFound() for nо repo
loading.tsx / error.tsx / not-found.tsx
generateMetadata на repo page
fetch caching + revalidate
1 Client Component (tabs или search form)        

# Non-goals
Authentication / OAuth / user sessions
Database / persistence / favorites
GraphQL GitHub API
Route Handlers (/api/...) proxy
TanStack Query, Redux, Zustand
shadcn/ui no polish
CI/CD, Docker, deployment pipeline
Contributors graph, CI status, dependency audit
Pagination commits (10 is enough)
Rate limit UI с retry logic

# Architecture principles
DRY KISS SOLID mandatory
Client Component only browser state/event handlers is needed

# Next.js concepts checklist 
[ ] App Router (file-based routing)
[ ] Server Components (default, no 'use client' on pages)
[ ] Client Components (minimal, justified)
[ ] Dynamic routes [owner]/[name]
[ ] Layouts (root layout.tsx)
[ ] loading.tsx
[ ] error.tsx ('use client' error boundary)
[ ] not-found.tsx + notFound()
[ ] generateMetadata
[ ] Server-side fetch (not client fetch to GitHub)
[ ] fetch caching / revalidate
[ ] Parallel fetching (Promise.all)
[ ] server-only module (GitHub token)
[ ] Suspense (optional — README streaming)
[ ] TypeScript strict, no any
[ ] DTO → domain mapping
[ ] Runtime validation user input (parse owner/repo slug)

# Health Score formula
Health Score =
    35% Activity
  + 25% Maintenance
  + 20% Community
  + 20% Issue Health

                      ┌─ Activity       × 0.35
                    │
Health Score =      ├─ Maintenance    × 0.25
                    │
                    ├─ Community      × 0.20
                    │
                    └─ Issue Health   × 0.20