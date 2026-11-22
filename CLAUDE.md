# HONIESH Project Instructions

Read this file before starting every task. All specialist agents must follow it. Do not rely on another agent's memory; verify claims independently.

## Operating Rules

- Work inside the existing repository only.
- Preserve the existing Git history, GitHub Pages deployment architecture, and Vite base path.
- Distinguish verified facts from proposed concepts.
- Produce a structured report for every task.
- Never expose credentials, API keys, OAuth tokens, passwords, authorization headers or secret environment-variable values.
- Never invent business, product, certification or customer information.

## Brand

**Company:** HONIESH

**Tagline:** Honey, thoughtfully brought to everyday life.

**Industry:** Honey and honey-based food products.

**Positioning:** A contemporary premium honey brand combining flavour exploration, thoughtful packaging and useful everyday product formats.

## Visual Identity

Maintain the existing premium editorial design direction.

- Deep Ink: `#211F1A`
- Warm Parchment: `#F2EBDD`
- Muted Brass: `#B3935C`
- Honey Amber: `#D2A04A`
- Soft Cream: `#F9F7F0`
- Botanical Neutral: `#5D6251`

## GitHub Pages

**Repository:** `rupeshkumarpilla/Website-for-testing-`

**Base path:** `/Website-for-testing-/`

**Live website:** `https://rupeshkumarpilla.github.io/Website-for-testing-/`

Preserve the existing deployment architecture and Git history.

## Git and Approval Safety

- Feature implementation approval is not commit approval.
- Commit approval is not push approval.
- Commit and push must be separate, explicitly approved operations.
- Never use force-push, history rewriting, `git reset --hard`, `git clean`, amend or rebase without explicit authorization.
- Only Build may request commit or push operations, and only after user approval.
- Specialist agents must not commit or push.

---

## Current Architecture

The active website lives in `src/` and is built by Vite from `src/index.html`. 

- `src/config/routeManifest.js` is the single routing source of truth
- `src/config/basePath.js` owns the `/Website-for-testing-/` base path
- `src/config/browserRoute.js` resolves clean URLs and migrates legacy `#/` URLs
- Prerendered clean static URLs; hash routing is not the current runtime
- Replaceable company copy lives in `src/config/content.js`
- UI primitives in `src/components/ui/`, layout primitives in `src/components/layout/`
- Styling from tokens in `src/styles/tokens.css`

---

## Security Decisions

- Phase 1 removed non-placeholder credential literals from legacy files
- `.gitignore` excludes `.env`, `.env.local`, `.env.*`, `node_modules/`, `dist/`
- No secret values have been printed during inspection

---

## Layers 1-5 Completed Work

### Layer 1 - Foundation (complete)
- Centralized site identity, route manifest, navigation
- Responsive header with accessible mobile menu, Escape-to-close
- Site shell with skip link, semantic landmarks, footer

### Layer 2 - Content Structure (complete)
- Centralized replaceable company copy in `src/config/content.js`
- Expanded Home, About, Contact pages with placeholders

### Layer 3 - Visual Design (complete)
- Premium editorial design language established
- Expanded `src/styles/tokens.css` with semantic colors, typography, spacing

### Layer 4 - Interactions (complete)
- Route-view fade-and-rise transitions
- Focus management on route changes

### Layer 5 - QA & Optimization (complete)
- `loading="lazy"` and `decoding="async"` on images
- Verified 25 prerendered routes plus 404, sitemap, robots.txt

---

## Remaining Work

- Replace centralized placeholders with approved content when supplied
- Add automated tests in a later phase
- Authentication and contact submission remain intentionally non-functional

---

## Automated Quality Checks

- `npm run test` - Vitest unit tests
- `npm run lint` - ESLint with React, Hooks, accessibility
- `npm run typecheck` - TypeScript no-emit over JS source