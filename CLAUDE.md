# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **SAP CAP (Cloud Application Programming Model)** project using Node.js. CAP follows a convention-based layout where domain models, services, and UI content live in dedicated top-level folders.

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
```

## Project Structure

| Folder | Purpose |
|--------|---------|
| `db/`  | CDS domain models (`.cds` files) and CSV seed data |
| `srv/` | CDS service definitions and custom Node.js handlers |
| `app/` | UI frontend content (Fiori/HTML5 apps) |
| `gen/` | Build output — generated, gitignored |

## Architecture

- **Data layer (`db/`)**: Define entities in `.cds` schema files. CAP auto-generates the SQLite DB from these at startup during development.
- **Service layer (`srv/`)**: Expose entities via `.cds` service definitions. Add custom logic by placing a `.js` file alongside the `.cds` file with the same name — CAP auto-wires it as the service handler.
- **Runtime**: `@sap/cds` drives everything. `express` is the underlying HTTP server that CDS mounts onto.
- **Local DB**: `@cap-js/sqlite` provides the SQLite adapter used automatically in development (`cds watch` / `cds serve`).

## ESLint

Config extends `@sap/cds` recommended rules (`eslint.config.mjs`). Uses flat config format (ESM).
