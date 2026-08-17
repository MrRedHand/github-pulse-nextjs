# Architecture

## Layers

- `app` — routes, layouts, metadata, orchestration
- `features` — user-facing UI capabilities (search, repository page)
- `entities` — domain types, GitHub API, health score logic
- `shared` — dumb UI, utilities, DTO types

## Dependency direction

app → features → entities → shared

## Server/Client boundary

- Default: Server Components
- Client Components only for: search form, error boundaries, browser interactivity
