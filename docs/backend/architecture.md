# HONIESH Backend Architecture Proposal

> **Status: proposal only. No backend exists.**
>
> This document describes a possible future architecture. It does not describe
> running software. No server code, database, authentication system, or
> deployment pipeline has been created.

| Field | Value |
| --- | --- |
| Last reviewed | 2026-11-21 |
| Owner | HONIESH Backend Engineer |
| Decision | Static-first; no custom backend now |
| Implementation status | Not started |
| Approval status | Not approved |

---

## 1. Purpose and scope

This document:

- records the verified current architecture;
- explains why a backend is not justified today;
- defines the triggers that would justify one;
- compares realistic options;
- proposes the smallest suitable target architecture if a trigger is approved;
- defines data, non-functional, and failure-mode expectations.

It does **not** authorize implementation. Any implementation requires explicit
user approval and must respect the editing boundaries in
[`backend/README.md`](../../backend/README.md).

---

## 2. Constraints

These constraints are fixed unless the user explicitly approves a change:

1. Preserve React 19, Vite 8, and JavaScript/JSX.
2. Preserve GitHub Pages deployment and the `/Website-for-testing-/` base path.
3. Preserve clean prerendered routes and `src/config/routeManifest.js` as the
   routing source of truth.
4. Do not modify `src/**`, `package.json`, lock files, `vite.config.*`,
   `index.html`, `.github/**`, or root `.env.example` from backend work.
5. Do not introduce a paid service without approval.
6. Do not invent product, certification, contact, pricing, or customer facts.
7. The static website must remain usable if any future API is unavailable.

---

## 3. Verified current architecture

### 3.1 Runtime and hosting

- React 19 + Vite 8 single-page application, JavaScript/JSX.
- Vite base path: `/Website-for-testing-/`.
- Vite root: `src/`; build output: `dist/`.
- Static hosting: GitHub Pages.
- Live origin referenced in code: `https://rupeshkumarpilla.github.io`.
- No backend, database, authentication provider, or external runtime service.
- Dependencies are limited to React, React DOM, Vite, and the React Vite
  plugin.

### 3.2 Routing and prerender

`src/config/routeManifest.js` defines the route manifest and validates it at
build time. The manifest contains 27 entries:

| Category | Count | Prerendered | Indexable |
| --- | ---: | --- | --- |
| Static public routes | 9 | Yes | Yes, except login |
| Packaging family routes | 3 | Yes | Yes |
| Flavour routes | 5 | Yes | Yes |
| Journal article routes | 8 | Yes | Yes |
| Product detail (query-only) | 1 | No | No |
| Not found fallback | 1 | No | No |

`scripts/prerender.mjs` writes 25 canonical route files, plus `404.html`,
`sitemap.xml`, and `robots.txt`. Product detail is resolved from
`/products?product=<id>` and is intentionally not prerendered.

### 3.3 Content and data model

- Product configurations are generated from three packaging families and five
  flavour concepts.
- `src/data/products.js` asserts exactly 25 unique configurations and rejects
  duplicate IDs, configuration keys, or packaging/flavour/size triples.
- Breakdown: 15 glass jar, 5 honey stick, 5 hygienic portion pack.
- Flavour formulations are `unconfirmed`; ingredients, percentages, nutrition
  values, and health claims are `null`.
- Price, availability, SKU, rating, and review count are `null`.
- Packaging specifications are confirmed; packaging artwork is concept
  presentation pending final photography.
- The batch certification sticker is a confirmed packaging feature. Its
  authority, standard, and results are not published.
- Journal articles are editorial drafts with no author or publication date.
- Use cases are proposed contexts; case studies are illustrative frameworks,
  not customer stories.

### 3.4 Forms and missing runtime capabilities

- `ContactForm.jsx` prevents submission and displays a frontend-only notice.
- `LoginForm.jsx` prevents submission and displays a frontend-only notice.
- Contact email, phone, and address are `null`.
- There is no approved enquiry destination.
- There is no real authentication requirement or user account model.
- There is no runtime search, personalization, inventory, pricing, or commerce.

### 3.5 Environment

- Root `.env.example` defines `VITE_APP_NAME` and an empty `VITE_API_BASE_URL`.
- It warns that `VITE_`-prefixed values are exposed to the browser.
- No secret values are present in the active frontend.
- `.gitignore` excludes `.env`, `.env.local`, `.env.*`, key/secret patterns,
  `node_modules/`, and `dist/`, while allowing `.env.example`.

---

## 4. Requirements assessment

### 4.1 What would justify a backend

A backend is justified only by a requirement that static hosting cannot satisfy,
for example:

- accepting and delivering enquiries with an approved destination;
- mutating shared data at runtime;
- authenticating users and protecting content;
- processing payments or inventory;
- non-developer content editing;
- server-side personalization or search at a scale static search cannot handle;
- server-side analytics or consent processing.

### 4.2 Current assessment

None of those requirements is verified today:

| Candidate requirement | Current status | Backend justified? |
| --- | --- | --- |
| Enquiry submission | Frontend-only, no destination, no owner | No |
| User accounts | Placeholder login only | No |
| Dynamic catalogue | Deterministic static data with build-time integrity checks | No |
| Content editing | Developer-managed source files | No |
| Search | Not requested | No |
| Commerce | No pricing, availability, SKU, or fulfilment data | No |
| Analytics | Not requested; no consent model | No |

**Conclusion:** a custom backend is not justified. The correct action is to
keep the static architecture and document the triggers.

---

## 5. Decision record

### ADR-001 — Do not build a custom backend now

- **Status:** Accepted
- **Context:** Static content, no real accounts, no approved enquiry
  destination, no commerce, GitHub Pages hosting.
- **Decision:** Keep the site static. Do not create APIs, databases, auth, or
  server infrastructure.
- **Consequences:** Zero backend cost and attack surface. Enquiries and login
  remain non-functional and must be labelled as such. Any future backend
  requires a new decision.

### ADR-002 — If a backend is needed, keep it optional and on a separate origin

- **Status:** Proposed
- **Context:** GitHub Pages cannot execute server code.
- **Decision:** The static site remains on GitHub Pages. Any API is deployed to
  a separate origin and reached through a public, non-secret base URL.
- **Consequences:** CORS must be configured. The static site must degrade
  gracefully when the API is unavailable. Hosting and cost increase only when a
  trigger is approved.

### ADR-003 — Do not build custom authentication or payments

- **Status:** Proposed
- **Context:** Custom auth and payments carry high security and compliance risk.
- **Decision:** If accounts or commerce are approved, use managed providers with
  least-privilege configuration. Do not store passwords or card data.
- **Consequences:** Vendor selection, data-processing agreements, and legal
  review are required before implementation.

---

## 6. Options considered

| Option | Description | Runtime backend | GitHub Pages compatible | Cost | Operational burden | Recommendation |
| --- | --- | --- | --- | --- | --- | --- |
| A | Static only (current) | No | Yes | $0 | Low | **Recommended now** |
| B | Build-time data generation | No | Yes | $0–low | Low–medium | Use for catalogue updates |
| C | Serverless API on separate origin | Yes | Yes, with CORS | $0–low | Medium | Smallest option for T1/T2 |
| D | Migrate hosting to a function-capable platform | Yes | No (changes hosting) | Low–medium | Medium–high | Not recommended; changes architecture |

### Option A — Static only

**Pros:** zero runtime cost, no secrets, no PII handling, smallest attack
surface, fastest delivery, already working.

**Cons:** no form delivery, no accounts, no runtime data.

### Option B — Build-time data generation

Generate JSON or HTML during the existing build from an approved source. No
runtime server. Suitable for catalogue or editorial updates that can wait for a
deployment.

**Pros:** preserves GitHub Pages and static security model; no runtime secrets.

**Cons:** updates require a build and deploy; not suitable for user-submitted
data.

**Note:** adding a scheduled build would require changes to `.github/**`, which
are outside backend editing boundaries and require explicit approval.

### Option C — Serverless API on a separate origin

A single stateless function handles a small number of endpoints. The static site
calls it through `VITE_API_BASE_URL`.

**Pros:** supports enquiries and dynamic reads; scales to zero; can stay within
free tiers at low volume; keeps GitHub Pages.

**Cons:** introduces a second provider, CORS, secrets, rate limiting, monitoring,
PII handling, and vendor dependency.

### Option D — Migrate hosting

Move the site to a platform with integrated functions.

**Pros:** one provider; simpler routing.

**Cons:** changes the deployment architecture and base path assumptions, which
the project explicitly preserves. Not recommended.

---

## 7. Recommended target architecture (if approved)

```text
                    +----------------------------------+
                    |  Visitor browser                 |
                    +----------------+-----------------+
                                     |
                     static HTML/CSS/JS (no secrets)
                                     |
                    +----------------v-----------------+
                    |  GitHub Pages                    |
                    |  /Website-for-testing-/          |
                    |  25 prerendered routes           |
                    |  404.html, sitemap.xml, robots   |
                    +----------------+-----------------+
                                     |
                     optional fetch to VITE_API_BASE_URL
                                     |
                    +----------------v-----------------+
                    |  Serverless API (separate origin)|
                    |  - validation                    |
                    |  - rate limiting                 |
                    |  - CORS allowlist                |
                    |  - request IDs                   |
                    +----+-------------------+---------+
                         |                   |
              read-only catalogue     enquiry delivery
                         |                   |
              +----------v-------+   +-------v----------+
              | Build-time JSON  |   | Managed email    |
              | or static data   |   | provider         |
              +------------------+   +------------------+
                         |
              +----------v-------+
              | Optional KV/D1   |
              | only if approved |
              +------------------+
```

### 7.1 Components

| Component | Responsibility | Required now? |
| --- | --- | --- |
| GitHub Pages | Serve static frontend | Yes (exists) |
| Serverless API | Validate and serve dynamic requests | No |
| Build-time catalogue JSON | Single source for read endpoints | No |
| Managed email provider | Deliver enquiries | No |
| Optional KV/D1 | Persist data only if approved | No |
| Observability | Logs, metrics, alerts, request IDs | No |
| Secret store | Provider-managed secrets | No |

### 7.2 Read flow

1. Browser loads a prerendered HTML page from GitHub Pages.
2. If dynamic data is required, the browser calls a `GET` endpoint.
3. The API returns validated JSON with cache headers.
4. If the API fails, the page shows the static content and a non-blocking
   notice.

### 7.3 Enquiry flow

1. Browser submits a `POST /v1/enquiries` request with an idempotency key.
2. API validates schema, size, origin, and rate limits.
3. API checks spam controls (honeypot, provider challenge if approved).
4. API forwards the enquiry to the approved destination.
5. API returns `202 Accepted` with a reference only after the destination
   accepts the message. It must not claim delivery if delivery failed.
6. API logs a redacted event with a request ID. It does not log message bodies
   or email addresses by default.

---

## 8. Data model

The proposed API mirrors the verified frontend model. It must not add invented
business values.

### 8.1 ProductConfiguration

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Stable slug, e.g. `glass-jars-250-g-original-honey` |
| `slug` | string | Same as `id` in current code |
| `configurationKey` | string | `packagingId:flavourId:sizeId-or-single` |
| `displayName` | string | e.g. `Original / Glass jar 250 g` |
| `shortDescription` | string | Concept wording |
| `flavourId`, `flavourName`, `flavourSlug` | string | Reference to flavour |
| `packagingId`, `packagingName`, `packagingShortName`, `packagingSlug` | string | Reference to packaging |
| `sizeId`, `sizeLabel` | string \| null | Null for sticks and portion packs |
| `unitType` | `mass` \| `volume` | 1 litre is volume |
| `netContent` | object | `{ label, value, unit, unitType }` |
| `unitCount`, `unitWeightGrams` | number \| null | 20 × 8 g, 30 × 8 g |
| `format` | string | Packaging format |
| `intendedConvenience` | string | Format context |
| `formulationStatus` | string | Currently `unconfirmed` |
| `visualStatus`, `visualDisclosure` | string | Concept visual status |
| `price` | null | Must not be invented |
| `availability` | null | Must not be invented |
| `sku` | null | Must not be invented |
| `rating`, `reviewCount` | null | Must not be invented |
| `pendingInformation` | string[] | Review items |

**Invariants**

- Exactly 25 configurations.
- Unique `id`, `configurationKey`, and `(packagingId, flavourId, sizeId)`.
- 15 glass jar, 5 honey stick, 5 portion pack.
- 1 litre is a volume specification, never 1 kg.

### 8.2 Flavour

| Field | Type | Notes |
| --- | --- | --- |
| `id`, `slug`, `name` | string | Original, Ginger, Lemon, Cinnamon, Cardamom |
| `conceptDirection` | string | Concept label |
| `description` | string | Concept wording |
| `accentColor`, `accentSoft` | string | Presentation only |
| `formulationStatus` | string | `unconfirmed` |
| `ingredients` | null | Not supplied |
| `ingredientPercentages` | null | Not supplied |
| `nutritionalValues` | null | Not supplied |
| `healthClaims` | null | Not supplied |
| `reviewRequired` | boolean | True |
| `pendingInformation` | string[] | Review items |

### 8.3 PackagingFamily

| Field | Type | Notes |
| --- | --- | --- |
| `id`, `slug`, `name`, `shortName` | string | Three families |
| `format` | string | Confirmed format description |
| `specificationStatus` | string | Confirmed specification |
| `finalDesignStatus` | string | Not finalized / concept presentation |
| `visualStatus`, `visualDisclosure` | string | Concept visual status |
| `sizeLabel` | string | Size or format |
| `sizes` | array | Glass jar sizes only |
| `unitCount`, `unitWeightGrams` | number \| null | 20 × 8 g, 30 × 8 g |
| `netContent` | object \| null | 160 g, 240 g |
| `intendedConvenience` | string | Context |
| `displayOrder` | number | 1–3 |

### 8.4 Article

| Field | Type | Notes |
| --- | --- | --- |
| `id`, `slug`, `title` | string | Eight articles |
| `category` | string | Honey education, culinary, packaging |
| `summary` | string | Short summary |
| `visualId` | string | Editorial visual key |
| `readingTimeMinutes` | number | Estimate in source |
| `sources` | array | Reference links |
| `body` | array | Sections with paragraphs and bullets |
| `author` | null | Not supplied |
| `publishedAt` | null | Not supplied |
| `status` | string | `editorial-draft` |
| `factCheckRequired` | boolean | True |
| `prohibitedClaims` | string[] | Medical, therapeutic, nutrition superiority, unverified origin |

### 8.5 UseCase and CaseStudy

Use cases are `proposed` contexts with `isConfirmedPartnership: false` and empty
`proofPoints`. Case studies are `illustrative-placeholder` frameworks with
`client: null`, empty results, quotes, and statistics. The API must never
promote these to customer evidence.

### 8.6 Enquiry (proposed, not implemented)

| Field | Type | Notes |
| --- | --- | --- |
| `reference` | string | Generated opaque ID |
| `name` | string | 1–100 characters |
| `email` | string | Valid address, max 254 characters |
| `enquiryPathId` | enum | One of four existing enquiry paths |
| `message` | string | 10–5,000 characters |
| `productId` | string \| null | Must match a known configuration |
| `consent` | boolean | Must be true |
| `createdAt` | string | ISO 8601 |
| `source` | string | `website-contact` |
| `status` | string | `received` only after destination accepts |

Do not add marketing consent, phone, company, or address fields unless a
verified requirement and privacy review exist.

---

## 9. Non-functional requirements

| Area | Requirement | Status |
| --- | --- | --- |
| Static availability | Static site works without the API | Required |
| API latency | Target p95 < 300 ms at edge | Proposed, not measured |
| Caching | `ETag`/`Cache-Control` on GET; `no-store` on enquiries | Proposed |
| Scalability | Stateless functions; scale to zero | Proposed |
| Privacy | Collect only necessary enquiry fields | Required |
| Observability | Request IDs, structured logs, metrics, alerts | Required |
| Security | See `security.md` | Required |
| Cost | $0 until a trigger is approved | Required |
| Maintainability | Small surface, pinned dependencies, contract tests | Required |

---

## 10. Failure modes and degradation

| Failure | Expected behaviour |
| --- | --- |
| API unavailable | Static site remains usable; enquiry form shows an unavailable notice |
| Email provider unavailable | Return `503`; do not claim submission succeeded |
| Rate limit exceeded | Return `429` with `Retry-After` |
| Invalid input | Return `400` with field-level errors and no PII echo |
| Unknown product | Return `404`; do not fabricate a product |
| CORS origin rejected | Browser blocks request; log without leaking origin secrets |
| Secret misconfigured | Fail closed for writes; never fall back to an insecure default |
| Data drift | Build-time validation and contract tests fail the release |
| Traffic spike | Rate limits and provider quotas protect cost and availability |

---

## 11. Evolution phases

| Phase | Trigger | Scope | Backend type | Approval |
| --- | --- | --- | --- | --- |
| 0 | Current | Static site only | None | N/A |
| 1 | T1 | Enquiry delivery | Managed form provider or one endpoint | Required |
| 2 | T2 | Read-only catalogue API | Serverless read endpoints | Required |
| 3 | T3 | Accounts and protected content | Managed identity provider | Required |
| 4 | T4 | Content editing | Git-based or headless CMS | Required |
| 5 | T6 | Commerce | Managed commerce platform | Required |

Each phase needs a written requirement, data classification, retention policy,
threat model, test plan, and cost ceiling before implementation.

---

## 12. Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Scope creep | Unplanned cost and complexity | Trigger-based approval only |
| PII exposure | Privacy harm and legal risk | Minimize fields, redact logs, retention policy |
| Spam and abuse | Cost and inbox flooding | Rate limits, honeypot, provider challenge |
| Secret leakage | Full compromise | Secret store, no `VITE_` secrets, rotation |
| CORS misconfiguration | Unauthorized browser access | Explicit origin allowlist |
| Vendor lock-in | Migration cost | Small interfaces, exportable data |
| Supply-chain attack | Code execution | Minimal pinned dependencies, audit |
| Content fabrication | Brand and legal risk | Contracts use `null` for unconfirmed data |
| GitHub Pages limits | Deployment constraints | Keep API separate; static-first |
| Operational burden | Maintenance neglect | Prefer managed services; document ownership |

---

## 13. Open questions and approval gates

Before any implementation, the user must answer:

1. Which trigger is approved (T1–T8)?
2. Who owns and monitors the backend?
3. What is the approved enquiry destination?
4. What data is collected, where is it stored, and for how long?
5. What is the expected monthly volume?
6. What is the cost ceiling?
7. Which domain or subdomain will host the API?
8. Which jurisdiction and privacy obligations apply?
9. Is the login placeholder needed at all?
10. Is commerce planned within 12 months?

No implementation begins until these are answered and the plan is approved.

---

## Appendix A — Verified route inventory

| Path | Route ID | Kind | Prerendered | Public |
| --- | --- | --- | --- | --- |
| `/` | `home` | static | Yes | Yes |
| `/products` | `products` | static | Yes | Yes |
| `/about` | `about` | static | Yes | Yes |
| `/packaging` | `packaging` | static | Yes | Yes |
| `/journal` | `journal` | static | Yes | Yes |
| `/use-cases` | `use-cases` | static | Yes | Yes |
| `/case-studies` | `case-studies` | static | Yes | Yes |
| `/contact` | `contact` | static | Yes | Yes |
| `/login` | `login` | application | Yes | No |
| `/products/glass-jars` | `product-family-glass-jars` | product-family | Yes | Yes |
| `/products/honey-sticks` | `product-family-honey-sticks` | product-family | Yes | Yes |
| `/products/portion-packs` | `product-family-portion-packs` | product-family | Yes | Yes |
| `/flavours/original-honey` | `flavour-original-honey` | flavour | Yes | Yes |
| `/flavours/ginger-honey` | `flavour-ginger-honey` | flavour | Yes | Yes |
| `/flavours/lemon-honey` | `flavour-lemon-honey` | flavour | Yes | Yes |
| `/flavours/cinnamon-honey` | `flavour-cinnamon-honey` | flavour | Yes | Yes |
| `/flavours/cardamom-honey` | `flavour-cardamom-honey` | flavour | Yes | Yes |
| `/journal/why-does-honey-crystallize` | `article-why-does-honey-crystallize` | article | Yes | Yes |
| `/journal/how-should-honey-be-stored` | `article-how-should-honey-be-stored` | article | Yes | Yes |
| `/journal/understanding-honey-texture-colour-and-aroma` | `article-understanding-honey-texture-colour-and-aroma` | article | Yes | Yes |
| `/journal/honey-in-everyday-cooking` | `article-honey-in-everyday-cooking` | article | Yes | Yes |
| `/journal/glass-jars-vs-single-serve-honey-packaging` | `article-glass-jars-vs-single-serve-honey-packaging` | article | Yes | Yes |
| `/journal/what-are-honey-sticks` | `article-what-are-honey-sticks` | article | Yes | Yes |
| `/journal/understanding-individual-honey-portions` | `article-understanding-individual-honey-portions` | article | Yes | Yes |
| `/journal/different-ways-to-use-honey-in-everyday-life` | `article-different-ways-to-use-honey-in-everyday-life` | article | Yes | Yes |
| `/products?product=<id>` | `product-detail` | product-detail | No | No |
| `/not-found` | `not-found` | fallback | No | No |

---

## Appendix B — Source-of-truth files

| Concern | File |
| --- | --- |
| Routes, navigation, titles | `src/config/routeManifest.js` |
| Base path and URL helpers | `src/config/basePath.js` |
| Browser route resolution | `src/config/browserRoute.js` |
| SEO metadata | `src/config/seo.js` |
| Brand identity and company copy | `src/config/content.js` |
| Site identity | `src/config/site.js` |
| Content gaps and enquiry paths | `src/config/informationArchitecture.js` |
| Flavours | `src/data/flavours.js` |
| Packaging | `src/data/packaging.js` |
| Product configurations | `src/data/products.js` |
| Editorial content | `src/data/editorial.js` |
| Editorial visuals | `src/data/editorialVisuals.js` |
| Product visuals | `src/data/productVisuals.js` |
| Prerender pipeline | `scripts/prerender.mjs` |

---

## Appendix C — Verified facts versus assumptions

**Verified from the repository**

- React 19 + Vite 8, GitHub Pages, base path `/Website-for-testing-/`.
- 25 prerendered routes, 404, sitemap, robots.
- 25 product configurations with the stated breakdown.
- Flavour formulations unconfirmed; price, availability, SKU, rating, and
  reviews are `null`.
- Contact details are `null`; contact and login forms are frontend-only.
- No backend, database, auth provider, or external service exists.

**Assumptions or proposals (not verified business facts)**

- A serverless API is the smallest suitable future option.
- Free-tier limits are indicative and must be verified with providers.
- A managed email provider is preferable to custom SMTP.
- The four existing enquiry paths are sufficient for a first form.
- The static site can degrade gracefully when an API is unavailable.

**Not claimed**

- That any endpoint, form, authentication, or deployment is live.
- That HONIESH holds any certification beyond the confirmed sticker feature.
- Any price, availability, SKU, ingredient, nutrition, origin, or customer
  result.
