# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **SAP CAP (Cloud Application Programming Model)** project using Node.js, built as a Vacation & Traveller Management application for training purposes.

## Commands

```bash
# Start with live-reload (primary development mode)
cds watch

# Start without live-reload
npm start          # runs cds-serve

# Serve with mocks and optional in-memory DB
cds serve --with-mocks --in-memory?

# Lint
npx eslint .

# Export ER diagram to PNG (requires puppeteer)
node screenshot.js [output-filename]
```

## Project Structure

| Path | Purpose |
|------|---------|
| `db/schema.cds` | Main entity definitions (Travellers, Destinations, Contacts, Vacations, AppUsers) |
| `db/common.cds` | Reusable code list entities and type aliases (AddressType, Status, Roles) |
| `db/data/` | CSV seed data files, named `anubhav.claude-<EntityName>.csv` |
| `db/i18n/` | Translations: `i18n.properties` (default EN), `i18n_en.properties`, `i18n_de.properties`, `i18n_hi.properties` |
| `srv/` | CDS service definitions and custom Node.js handlers (currently empty) |
| `app/` | UI frontend content (currently empty) |
| `material/` | Session HTML transcripts by day (day4–day7), not part of the app |

## Architecture

**Data layer (`db/`)** — Two CDS files with a clear separation:
- `schema.cds` imports shared types from `common.cds` and uses them for Association fields. All entity fields carry `@title: '{i18n>Key}'` annotations for localization.
- `common.cds` is the single source of truth for code lists (`AddressTypes`, `TravellerStatus`, `Roles`) and their corresponding type aliases. Extend here before touching `schema.cds`.

**i18n** — Labels are externalized via `{i18n>Key}` annotations. Always add new keys to all four property files when adding new fields.

**Service layer (`srv/`)** — Not yet defined. When adding services: place a `.cds` service file here and an optional `.js` handler alongside it with the same base name — CAP auto-wires it.

**Runtime**: `@sap/cds` drives everything. `express` is the underlying HTTP server. `@cap-js/sqlite` is used automatically in development; `db.sqlite` (gitignored) is the local dev database file.

**Seed data** — CSV files in `db/data/` are loaded automatically on `cds watch`/`cds serve`. File naming must exactly match `<namespace>-<EntityName>.csv`.

## Key Conventions

- Namespace: `anubhav.claude` — used in CDS files and CSV filenames.
- All main entities mix in `cuid` for auto-generated UUIDs. `Travellers` and `AppUsers` also mixin `managed` for audit fields.
- `Vacations.currency` uses the built-in `Currency` type from `@sap/cds/common`; supported currencies are limited to USD, EUR, CAD, INR, CNY, GBP, AED.
- `modifiedAt` on `Travellers` is annotated `@odata.etag` for optimistic concurrency.
- `Travellers.status` defaults to `'A'` (Active); `AppUsers.isActive` defaults to `true`.
