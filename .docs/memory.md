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
- **After any accepted change or improvement, always update this memory file to reflect the new state and decisions.**

## i18n
- Use the `messages/` and `src/lib/paraglide/` structure for translations and i18n logic.

## Email
- Email functionality is handled via Nodemailer, with setup in `src/lib/emailSetup.server.js`.

## SEO & Performance Improvements (2025-06-29)
- Added SEO meta tags, Open Graph, Twitter Card, and canonical link to `src/app.html`.
- Added LocalBusiness structured data in `static/structured-data.json` and referenced in `src/app.html`.
- Improved image alt text, width/height, and loading attributes in `src/components/Header.svelte` and hero image in `+page.svelte`.
- Added responsive image logic for hero image in `+page.svelte`.

---
_Last updated: 2025-06-29_
