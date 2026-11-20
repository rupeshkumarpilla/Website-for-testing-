# HONIESH Website

Frontend-only React + Vite website for **HONIESH**. The project is being built in controlled layers; Layers 1–3 are complete (foundation, HONIESH content structure with approved placeholders, and premium visual design system).

## Project overview

- One company only: HONIESH. No sub-brands or business divisions are part of this website.
- React 19, Vite 8, JavaScript (JSX). No backend, database, authentication provider or external service.
- Hash-based routing (`#/`, `#/about`, `#/contact`, `#/login`) avoids an extra router dependency.
- Company-specific content is not invented. Replaceable copy is centralized in `src/config/content.js` and marked with `PLACEHOLDER_TEXT` until approved information is supplied.
- The original static ROOZ site has been removed; only the HONIESH React application remains.
- Visual language: restrained editorial luxury with deep ink, warm parchment, brushed brass, serif display headings and generous whitespace.

## Prerequisites

- Node.js 20.19+ or 22.12+
- npm

## Installation

```bash
npm install
```

## Development startup

```bash
npm run dev
```

Open the local URL printed by Vite. Copy `.env.example` to `.env.local` only if local overrides are needed; never commit real credentials.

## Production build

```bash
npm run build
npm run preview
```

Build output is written to `dist/`, which is Git-ignored.

## Project structure

```text
src/
  assets/                 Brand mark and abstract hero motif
  components/
    layout/               Header, footer, page shell, section, page header
    ui/                   Button, card, text field, text area, notice, empty state
    ContactForm.jsx       Non-connected placeholder contact form
    ErrorBoundary.jsx     Render-error fallback
    LoginForm.jsx         Placeholder account form
  config/
    content.js            Replaceable HONIESH copy and contact fields
    routes.js             Route registry, navigation and page titles
    site.js               Site identity and placeholder copy
  pages/                  Home, About, Contact, Login, Not found
  styles/
    tokens.css            Centralized design tokens
    base.css              Reset, base typography, focus and reduced motion
    layout.css            Page structure and responsive layout
    components.css        Reusable component styles
    app.css               Page-level refinements
  utils/useHashRoute.js   Hash routing hook
  App.jsx                 Route resolution and document title
  main.jsx                React entry point
  index.html              Vite HTML entry
public/                   Static assets served as-is
package.json              Dependencies and scripts
vite.config.js            Vite configuration
.env.example              Safe environment template
.gitignore                Dependency, build and secret exclusions
README.md                 This file
DEVELOPMENT.md            Architecture, security notes and migration plan
```

The Vite root is `src/` and the HTML entry is `src/index.html`. `dist/` is emitted at the repository root.

## Information still required

To replace placeholders, provide approved HONIESH content for: company description, capabilities or services, products if any, contact email, phone, address, and whether the account-access placeholder should remain.

## Security notes

- No private credentials are present in the active frontend.
- Legacy credential literals removed in Phase 1 remain removed. No Git history was rewritten.
- Dependencies are limited to React, React DOM, Vite and the standard React Vite plugin.
- Contact and login forms are frontend-only and do not transmit or store submitted data.
