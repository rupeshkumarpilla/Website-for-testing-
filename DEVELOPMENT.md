# Development notes

## Current architecture

The active website lives in `src/` and is built by Vite from `src/index.html`. `src/config/routeManifest.js` is the single source of truth for routes, navigation and page titles; `src/config/routes.js` remains as a compatibility facade. `src/config/basePath.js` owns the `/Website-for-testing-/` base path, URL normalization and history navigation, while `src/config/browserRoute.js` resolves clean URLs and migrates legacy `#/` URLs to clean paths. Clean static URLs are prerendered; hash routing is not the current runtime. `App.jsx` resolves the current route to a page component and wraps every page in `SiteLayout`, which provides a skip link, responsive header, main landmark and footer.

Replaceable company copy lives in `src/config/content.js`. All unsupported values use `PLACEHOLDER_TEXT` from `src/config/site.js`, and missing contact fields are `null` so pages can render explicit placeholders without inventing details.

UI primitives are centralized in `src/components/ui/`, layout primitives in `src/components/layout/`, and all styling starts from tokens in `src/styles/tokens.css`. The CSS layers are tokens, base, layout, components and page refinements.

There is no backend. Unused legacy database and configuration files were removed during cleanup.

## Security decisions

- Phase 1 removed non-placeholder credential literals from legacy configuration files. Those unused files were deleted during cleanup.
- `.gitignore` excludes `.env`, `.env.local`, `.env.*`, key/secret/credential file patterns, `node_modules/` and `dist/`, while allowing `.env.example`.
- No secret values have been printed during inspection or reporting.
- No Git history was rewritten. The original commit `1ac6cd8503864226c2e4763c432f5c8d1f6241ec` remains HEAD. If previously exposed values were ever genuine, rotate them at the provider.
- No credentials or external services were added in Phase 2.
- Layer 3 added no dependencies; imagery is local inline SVG derived from the brand mark.

## Branding inventory and decision

Before changing identity, all files containing legacy branding were inventoried. The active React app uses HONIESH consistently in title, metadata, site config, header, footer, pages, favicon, asset, package name and documentation.

Legacy branding was removed from the tracked repository during cleanup. All previously identified ROOZ files and unused Phase 1 files were deleted after exact runtime-reference checks and backed up outside the repository.

No company services, products, contact details, certifications or achievements were invented. All unsupported content is marked with `PLACEHOLDER_TEXT` from `src/config/site.js`.

## Layer 1 completed work

- Centralized site identity, route manifest, navigation and page titles; `routeManifest.js` is now the single routing source of truth and `routes.js` is a compatibility facade.
- Responsive header with accessible mobile menu, Escape-to-close and route-change reset.
- Site shell with skip link, semantic landmarks and footer.
- Reusable Button, Card, TextField, StatusNotice, EmptyState, Section and PageHeader components.
- Render-error boundary with a safe fallback.
- Placeholder Home, About, Contact, Login and Not Found pages.
- Layered CSS architecture with design tokens, base reset, focus states and reduced-motion support.
- HONIESH brand mark and favicon.
- Documentation and package naming updated to HONIESH.

## Layer 2 completed work

- Centralized replaceable company copy in `src/config/content.js`.
- Expanded Home, About and Contact pages into coherent HONIESH company-page structures using placeholders only.
- Added a non-connected contact form and `TextArea` primitive with matching styles.
- Added explicit contact detail placeholders for email, phone and address.
- Updated documentation for the new content structure and obsolete file removal.

## Layer 3 completed work

- Established a premium editorial design language: deep ink, warm parchment, brushed brass, hairline rules and generous whitespace.
- Expanded `src/styles/tokens.css` with semantic colors, fluid typography, spacing rhythm, layout widths, borders, shadows, radii and explicit mobile/tablet/desktop breakpoints.
- Refined PageHeader and Section into reusable split/stack layouts with eyebrow labels and consistent hierarchy.
- Added a local abstract hero motif SVG derived from the HONIESH monogram; no external imagery or invented company visuals.
- Refined header, footer, buttons, cards, forms, empty states and CTA panels across all existing pages.
- Verified rendered pages with Chrome DevTools at 1440px, 768px and 390px; no horizontal overflow, correct grid collapse and mobile nav toggle.

## Layer 4 completed work

- Added a route-view fade-and-rise transition on page changes, disabled under `prefers-reduced-motion: reduce`.
- Moved focus to the `#main-content` landmark on route changes with `preventScroll`, matching the existing skip-link behaviour.
- Closed the mobile navigation on outside click or tap in addition to Escape and route-change reset.
- Added a subtle hover lift and refined shadow transition to cards and product cards.

## Layer 5 completed work

- Added `loading="lazy"` and `decoding="async"` to product and editorial images, while keeping large visuals eager.
- Verified the production build: `npm run build` completes and prerenders 25 canonical routes plus `404.html`, `sitemap.xml` and `robots.txt`.

## Cleanup completed work

- Removed the legacy ROOZ root pages, sub-brand pages, legacy stylesheets and legacy JavaScript demos after confirming the React app replaced them.
- Removed unused legacy database and configuration files; the project remains frontend-only.
- Updated documentation and `.env.example` so no stale legacy file references remain.

## Migration plan

1. Layer 1: technical and structural foundation — complete.
2. Layer 2: HONIESH content structure with approved placeholders — complete.
3. Layer 3: premium visual identity and design system refinement — complete.
4. Layer 4: refined interactions, motion and micro-details — complete.
5. Layer 5: full QA, responsive verification and optimization — complete.

## Information required from you

- Approved company description.
- Approved capabilities or services list.
- Products, if HONIESH has any.
- Contact email, phone and address.
- Whether the existing login placeholder should remain, become a real feature later, or be removed.

## Remaining work

- Replace centralized placeholders with approved content when supplied.
- Add automated tests in a later phase.
- Authentication and contact submission remain intentionally non-functional.

## Known limitations

- The site uses clean prerendered static URLs; legacy `#/` URLs are migrated on load and there is no current hash routing.
- No data loading exists, so loading states are not implemented; empty, error and notice states are.
- Login and contact forms only report that their backend flows are not connected.
- Legacy ROOZ files no longer exist in the repository.
