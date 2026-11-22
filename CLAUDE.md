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

## Product Packaging

### Glass Jars
- 250 g., 500 g., 1 litre (volume, not kg)

### Honey Sticks
- Cylindrical container with removable top lid
- 20 individually packed sticks @ 8 g each = 160 g total

### Hygienic Portion Packs
- Plastic dispensing box, split-open format
- 30 individually packed portions @ 8 g each = 240 g total

## Five Proposed Flavours
1. Original
2. Ginger
3. Lemon
4. Cinnamon
5. Cardamom

These are proposed flavour concepts until actual formulations are confirmed.

## Product Configuration Integrity

There are 25 potential product configurations:
- 15 Glass Jar configurations
- 5 Honey Stick configurations
- 5 Hygienic Portion Pack configurations

Never duplicate product configurations.

## Batch Certification Sticker

Every HONIESH product box includes a batch certification sticker.

This is a confirmed packaging feature.

Never invent:
- Certification authority
- Certification standard
- Laboratory testing results
- Regulatory approval
- Certification claims not verified by the user

## Unconfirmed Information

Never fabricate:
- Product recipes, ingredients, nutritional values
- Ingredient percentages, honey origins
- Product purity claims, certifications
- Company history, founder identity
- Customer partnerships, testimonials, results
- Public contact details, prices, availability
- SKUs or barcodes

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
- Do not use "allow always" for commit or push operations.

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
- No credentials or external services added in Phase 2
- Layer 3 added no dependencies; imagery is local inline SVG

---

## Layers 1-5 Completed Work

### Layer 1 - Foundation (complete)
- Centralized site identity, route manifest, navigation
- Responsive header with accessible mobile menu, Escape-to-close
- Site shell with skip link, semantic landmarks, footer
- Reusable UI components, render-error boundary
- Placeholder pages, layered CSS architecture, brand mark

### Layer 2 - Content Structure (complete)
- Centralized replaceable company copy in `src/config/content.js`
- Expanded Home, About, Contact pages with placeholders
- Non-connected contact form, TextArea primitive
- Contact detail placeholders (email, phone, address)

### Layer 3 - Visual Design (complete)
- Premium editorial design language established
- Expanded `src/styles/tokens.css` with semantic colors, typography, spacing
- Refined PageHeader and Section components
- Local abstract hero motif SVG, refined styling

### Layer 4 - Interactions (complete)
- Route-view fade-and-rise transitions
- Focus management on route changes
- Mobile nav close on outside click/tap
- Card hover lift and shadow transitions

### Layer 5 - QA & Optimization (complete)
- `loading="lazy"` and `decoding="async"` on images
- Verified production build prerenders 25 canonical routes plus 404, sitemap, robots.txt

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

---

## Remaining Information Required

- Approved company description
- Approved capabilities or services list
- Products (if HONIESH has any)
- Contact email, phone and address
- Whether login placeholder should remain, become a real feature, or be removed

---

## Known Limitations

- Clean prerendered static URLs; legacy `#/` URLs migrated on load; no hash routing
- No data loading; loading states not implemented
- Login and contact forms only report backend flows not connected
- Legacy ROOZ files no longer exist

---

## Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build and prerender
npm run preview  # Preview production build
npm run test     # Run Vitest tests
npm run lint     # Run ESLint
npm run typecheck  # Run TypeScript check
```