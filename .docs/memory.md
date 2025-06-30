# Cariari Painter 2025 - Project Memory

## Project Purpose
Single page website for exterior home painting services in the Cariari area.

## Tech Stack
- SvelteKit 5
- CSS (component-scoped preferred)
- Paraglide (i18n)
- Nodemailer (email)

## Directory Structure
- `messages/`: English/Spanish translations
- `src/components/`: All UI and feature-specific Svelte components (keep all components here)
- `src/lib/`: Utility functions and helpers (use `utils.js` for most functions unless a separate file is justified)
- `src/routes/`: SvelteKit file-based routing
- `static/assets/`: Images, fonts, and other static assets (use these for all media)
- `static/global.css`: Only for styles affecting all elements/components sitewide; otherwise, use component-level styles

## Development Guidelines
- New components must be placed in `src/components/`.
- Utility scripts should be in `src/lib/`, with most logic in `utils.js` unless a separate file is needed.
- Use assets from `static/assets/`.
- Prefer component-scoped styles; avoid using `global.css` unless absolutely necessary.
- Follow SvelteKit and project conventions for file and folder organization.

## i18n
- Use the `messages/` and `src/lib/paraglide/` structure for translations and i18n logic.

## Email
- Email functionality is handled via Nodemailer, with setup in `src/lib/emailSetup.server.js`.

## For Agents
- Always read this memory before making changes or adding features.
- Maintain the above conventions for consistency and maintainability.

---
_Last updated: 2025-06-29_
