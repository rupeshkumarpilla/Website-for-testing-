# HONIESH Backend — Status and Decision

> **Status: documentation only. No backend exists.**
>
> This directory contains architecture documentation and an environment-variable
> template. It contains **no server code, no dependencies, no database, no
> deployment workflow, and no paid-service configuration**. Nothing here is
> deployed or executed.

| Field | Value |
| --- | --- |
| Last reviewed | 2026-11-21 |
| Owner | HONIESH Backend Engineer |
| Scope | Backend architecture planning for the HONIESH website |
| Decision | **Do not build a custom backend now** |
| Backend runtime | None |
| Dependencies added | None |
| Deployment changes | None |
| Git operations performed | None |

---

## 1. Decision

**HONIESH does not need a backend at this stage.**

The current website is a static, prerendered React application. Its content is
authored in source files, validated at build time, and published as static HTML
through GitHub Pages. There is no runtime data mutation, no real user account
system, no approved enquiry destination, and no commerce flow. Building a
backend now would add cost, attack surface, personal-data obligations, and
operational maintenance without a verified requirement.

This is a **planning decision**, not a claim that a backend has been built.

---

## 2. Evidence inspected

The decision is based on the following verified repository facts:

- The application is React 19 + Vite 8, JavaScript/JSX, with no backend,
  database, authentication provider, or external service.
- The site is deployed as static output through GitHub Pages at the base path
  `/Website-for-testing-/`.
- Clean URLs are prerendered. `scripts/prerender.mjs` writes **25 canonical
  routes**, plus `404.html`, `sitemap.xml`, and `robots.txt`.
- `src/config/routeManifest.js` is the single routing source of truth and
  contains **27 manifest entries**:
  - 25 prerendered public routes,
  - 1 query-only `product-detail` route,
  - 1 `not-found` fallback.
- The product catalogue is generated deterministically in
  `src/data/products.js` and asserts **25 unique configurations**:
  - 15 glass jar configurations (3 sizes × 5 flavours),
  - 5 honey stick configurations,
  - 5 hygienic portion pack configurations.
- Flavour formulations are explicitly marked `unconfirmed`; ingredients,
  percentages, nutrition values, and health claims are `null`.
- Prices, availability, SKUs, ratings, and review counts are `null` in the
  product model.
- Contact details (email, phone, address) are `null` in
  `src/config/content.js`.
- The contact form and login form are explicitly frontend-only. They do not
  transmit or store data.
- `src/config/informationArchitecture.js` records the content gaps that must be
  resolved before a real enquiry destination or product claims are published.
- The root `.env.example` contains only `VITE_APP_NAME` and an empty
  `VITE_API_BASE_URL`, and warns that `VITE_`-prefixed values are exposed to the
  browser. No API exists yet.

---

## 3. Future triggers

A backend is justified only when a trigger below is met, a named business owner
accepts responsibility, and the user explicitly approves implementation.

| ID | Trigger | Evidence required | Smallest suitable solution | Status |
| --- | --- | --- | --- | --- |
| T1 | Real enquiry submission | Approved destination, owner, retention policy, privacy notice | Managed form provider or a single serverless endpoint | Not approved |
| T2 | Dynamic catalogue data | Approved source of truth and update workflow | Build-time JSON generation, then read-only API if needed | Not approved |
| T3 | Real user accounts | Defined user value, roles, and protected content | Managed authentication provider; never custom password storage | Not approved |
| T4 | Non-developer content editing | Named editors and review workflow | Git-based CMS or headless CMS | Not approved |
| T5 | Site search or recommendations | Measured user need | Client-side static search index first | Not approved |
| T6 | Ordering, payments, or inventory | Legal, tax, payment, and fulfilment requirements | Managed commerce platform | Not approved |
| T7 | Server-side analytics or consent | Privacy review and lawful basis | Privacy-respecting analytics provider | Not approved |
| T8 | Multi-language content at scale | Approved translations and locale strategy | Static i18n build | Not approved |

**Rule:** do not start any trigger until it is explicitly approved. A feature
request is not backend approval.

---

## 4. Recommended future architecture (if approved)

If T1 or T2 is approved, the smallest suitable architecture is:

1. **Keep the static site on GitHub Pages unchanged.** Preserve React 19,
   Vite 8, the `/Website-for-testing-/` base path, clean routes, and the
   prerender pipeline.
2. **Add one stateless API on a separate origin**, for example a serverless
   edge function. The API is optional: if it is unavailable, the static site
   must remain fully readable.
3. **Serve read-only catalogue data from build-time output** rather than a live
   database. A database is added only when a verified write or persistence
   requirement exists.
4. **Expose exactly one write endpoint** for enquiries, forwarding to an
   approved destination (email or form provider). Do not store enquiry data
   unless retention is approved.
5. **Use a managed email provider.** Do not run a custom SMTP server.
6. **Do not build custom authentication.** If T3 is approved, use a managed
   identity provider with least-privilege roles.
7. **Add security controls before launch:** input validation, rate limiting,
   CORS allowlist, secret management, structured logging with PII redaction,
   and monitoring with a spending cap.

See [`docs/backend/architecture.md`](../docs/backend/architecture.md) for
options and trade-offs.

---

## 5. What this directory contains

| Path | Purpose | Status |
| --- | --- | --- |
| `backend/README.md` | Status, decision, and future triggers | Created |
| `backend/.env.example` | Variable **names only**, no values | Created |
| `docs/backend/architecture.md` | Architecture proposal and decision record | Created |
| `docs/backend/api-contracts.md` | Proposed endpoint inventory and contracts | Created |
| `docs/backend/security.md` | Validation, rate limiting, and secrets strategy | Created |
| `docs/backend/deployment.md` | GitHub Pages-compatible deployment architecture | Created |
| `docs/backend/costs.md` | Estimated costs and free-tier limits | Created |

The `.env.example` file is a template. It must never contain real values.

---

## 6. Boundaries

Permitted backend work areas, once implementation is approved:

- `backend/**`
- `server/**`
- `scripts/backend/**`
- `docs/backend/**`

Not permitted from backend work:

- `src/**`, `package.json`, lock files, `vite.config.*`, `index.html`
- `.github/**`, `.opencode/**`, `opencode.jsonc`
- `HONIESH_PROJECT.md`, `.git/**`
- Root `.env.example`

---

## 7. Security baseline

Any future implementation must satisfy the controls in
[`docs/backend/security.md`](../docs/backend/security.md), including:

- schema validation and allowlists for all untrusted input;
- body-size limits and rate limiting;
- explicit CORS allowlist;
- secrets stored outside the repository;
- no `VITE_` prefix on secrets;
- PII minimization, retention, and deletion rules;
- redacted logging and generic client-facing errors;
- dependency pinning and review;
- monitoring, alerts, and a spending cap.

No security guarantee is made until the controls are implemented and tested.

---

## 8. Non-goals

- No server code.
- No API implementation.
- No database.
- No authentication system.
- No deployment workflow.
- No dependency installation.
- No changes to the static frontend.
- No claim that any backend or endpoint is live.

---

## 9. Next approval required

To proceed beyond documentation, the user must explicitly approve:

1. the specific trigger (for example T1 enquiry submission);
2. the hosting provider and cost ceiling;
3. the data owner and retention policy;
4. the security review scope;
5. the implementation and deployment plan.

Until then, this directory remains documentation only.
