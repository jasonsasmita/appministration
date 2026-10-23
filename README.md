# Appministration

A small central hub for sharing and discovering projects made by creators.

## Pages

- `/` — landing page with a galaxy-inspired CSS background.
- `/projects` — searchable, category-filtered project grid with pagination.
- `/<creator-username>/<project-slug>` — project detail with gallery, description, and resource links.
- `/menus` — permanent redirect to `/projects`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project data

The app reads from local dummy data by default:

- `lib/projects/types.ts` — domain types and category constants.
- `lib/projects/dummy-data.ts` — the dummy project catalog.
- `lib/projects/dummy-repository.ts` — search, filtering, and pagination.
- `lib/projects/repository.ts` — the `ProjectRepository` interface and source switch.

MongoDB support is prepared but inactive. The Mongoose model and repository live in
`lib/projects/mongo-model.ts` and `lib/projects/mongo-repository.ts`. To use them:

1. Set `DB_URI` and `PROJECTS_SOURCE=mongo` in `.env`.
2. Seed the `projects` collection with documents matching `ProjectRecord`.

No database connection is attempted while `PROJECTS_SOURCE` is unset.

## Project images

Placeholder artwork is committed in `public/images/projects`. To regenerate it:

```bash
npm run generate:images
```

The script uses the Sharp installation already available through Next.js.

## Scripts

```bash
npm run lint
npm run build
npm run start
```
