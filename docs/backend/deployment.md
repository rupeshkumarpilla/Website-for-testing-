# HONIESH Deployment Architecture

> **Status: proposal only. No deployment changes have been made.**
>
> The current website remains a static GitHub Pages deployment. This document
> describes how a future backend could be deployed **without breaking** the
> existing static architecture.

| Field | Value |
| --- | --- |
| Last reviewed | 2026-11-21 |
| Owner | HONIESH Backend Engineer |
| Current hosting | GitHub Pages (static) |
| Base path | `/Website-for-testing-/` |
| Backend deployed | None |
| Workflow changes | None |

---

## 1. Deployment constraints

1. GitHub Pages serves static files only. It cannot run server-side code.
2. The Vite base path `/Website-for-testing-/` must be preserved.
3. Clean prerendered routes must continue to work.
4. `dist/` remains the build output and is Git-ignored.
5. No deployment workflow may be changed without explicit approval.
6. No secrets may be committed or exposed to the browser.
7. The static site must remain usable if a future API is unavailable.

---

## 2. Verified current deployment

### 2.1 Build pipeline

`package.json` defines:

```text
npm run build = vite build && node scripts/prerender.mjs
```

`vite.config.js` sets:

- `base: '/Website-for-testing-/'
- `root: src/`
- `publicDir: public/`
- `build.outDir: dist/`
- `build.emptyOutDir: true`

`scripts/prerender.mjs`:

- loads `src/config/routeManifest.js`;
- calls `assertRouteManifest()`;
- renders each prerender route with `renderRoute`;
- writes 25 canonical route files;
- writes `404.html`;
- writes `sitemap.xml`;
- writes `robots.txt`.

### 2.2 Output

```text
dist/
  index.html                         -> /
  products/index.html                -> /products
  products/glass-jars/index.html     -> /products/glass-jars
  products/honey-sticks/index.html   -> /products/honey-sticks
  products/portion-packs/index.html  -> /products/portion-packs
  about/index.html                   -> /about
  packaging/index.html               -> /packaging
  journal/index.html                 -> /journal
  journal/<article-slug>/index.html  -> 8 article routes
  flavours/<flavour-slug>/index.html -> 5 flavour routes
  use-cases/index.html               -> /use-cases
  case-studies/index.html            -> /case-studies
  contact/index.html                 -> /contact
  login/index.html                   -> /login
  404.html
  sitemap.xml
  robots.txt
  assets/...
```

Product detail is **not** a prerendered file. It is resolved at runtime from
`/products?product=<id>` using the `/products/index.html` document.

### 2.3 GitHub Pages behaviour

- Static files are served over HTTPS.
- Directory-style URLs resolve to `index.html`.
- Unknown paths are served `404.html`.
- The site is published under `/Website-for-testing-/`.
- The canonical origin is `https://rupeshkumarpilla.github.io`.
- A deployment workflow file exists at `.github/workflows/deploy.yml`
  (verified by directory listing). Its contents were **not inspected** because
  reads of `.github/**` are restricted. This document does not modify it.

---

## 3. Deployment topology

### 3.1 Current (static only)

```text
Git repository
   |
   | approved build
   v
dist/ (static HTML, CSS, JS, SVG)
   |
   | GitHub Pages
   v
https://rupeshkumarpilla.github.io/Website-for-testing-/
```

No runtime server, database, or secret is involved.

### 3.2 Future (static + optional API)

```text
Git repository
   |
   +--> static build --> GitHub Pages (unchanged)
   |
   +--> backend/ (approved later) --> serverless API on separate origin
                                          |
                                          +--> email provider
                                          +--> optional KV/D1
```

The static site remains the primary experience. The API is an enhancement, not a
dependency for reading content.

---

## 4. Environment matrix

| Environment | Frontend | API | Data | Secrets | Purpose |
| --- | --- | --- | --- | --- | --- |
| Local | Vite dev server | Optional local mock | None or synthetic | Local `.env` only | Development |
| Preview | Static preview or approved PR preview | Staging API if approved | Synthetic only | Provider staging store | Review |
| Production | GitHub Pages | Production API if approved | Approved data only | Provider production store | Public site |

Rules:

- Never use production data in local or preview environments.
- Never reuse production secrets outside production.
- Never commit `.env` files.
- Use `backend/.env.example` for variable names only.

---

## 5. Build and release process

### 5.1 Pre-build

- [ ] Confirm the working tree contains no secrets.
- [ ] Confirm the intended change is approved.
- [ ] Confirm no forbidden files are modified.
- [ ] Review dependency changes, if any.

### 5.2 Build

```text
npm ci
npm run build
```

`npm ci` and `npm run build` require the normal project permissions and should
be run only when implementation is approved. This documentation task does not
run them.

### 5.3 Verify output

- [ ] 25 canonical route files exist.
- [ ] `404.html` exists.
- [ ] `sitemap.xml` exists and contains 25 URLs.
- [ ] `robots.txt` references the sitemap.
- [ ] Asset URLs include the `/Website-for-testing-/` base path.
- [ ] No source maps or secrets are published.
- [ ] No unintended files are included.

### 5.4 Publish

- Publish `dist/` through the approved GitHub Pages workflow.
- Do not publish `node_modules/`, source files, or `.env` files.
- Do not change the workflow as part of a backend documentation task.

### 5.5 Post-deploy smoke test

- [ ] Home page loads.
- [ ] All 25 canonical routes return 200.
- [ ] Unknown route returns the 404 page.
- [ ] Product detail query route resolves a known product.
- [ ] Product detail rejects an unknown product without fabricating data.
- [ ] Sitemap and robots are reachable.
- [ ] Canonical and meta tags are correct.
- [ ] No mixed-content requests.
- [ ] If an API exists, health and CORS checks pass.

---

## 6. GitHub Pages limitations

| Limitation | Impact | Mitigation |
| --- | --- | --- |
| Static only | Cannot run server code | Use a separate API origin |
| No custom response headers | Limited CSP/HSTS control | Use meta tags where possible; keep static assets minimal |
| No server-side redirects | Routing is file-based | Use prerendered directories and `404.html` |
| No per-PR previews natively | Review friction | Use static preview or an approved preview service |
| Usage limits | Bandwidth/build limits | Monitor and optimize assets |
| Public repository exposure | Implementation is visible | Never embed secrets; assume code is public |
| Base path coupling | Broken links if changed | Keep `/Website-for-testing-/` until approved |

Verify current GitHub Pages limits and header capabilities before relying on
them. Platform behaviour can change.

---

## 7. Future API deployment (if approved)

### 7.1 Hosting

- Deploy the API to a serverless platform with a free tier.
- Keep it on a separate origin from GitHub Pages.
- Use a subdomain such as `api.<approved-domain>` if a domain is approved.
- Do not invent a domain in code or documentation.
- Use the provider's managed TLS.

### 7.2 Configuration

- Public frontend configuration: `VITE_API_BASE_URL` (non-secret).
- Server secrets: provider secret store, non-`VITE_` names.
- Separate values for staging and production.
- No secrets in build artifacts or logs.

### 7.3 CORS

- Allow `https://rupeshkumarpilla.github.io`.
- Allow the configured local development origin.
- Do not allow `*` for writes.
- Return `Vary: Origin`.
- Test preflight and rejection paths.

### 7.4 Health and readiness

- `GET /v1/health` for liveness.
- Readiness must verify required dependencies.
- Do not expose internal versions or hostnames.
- Alert on repeated failures.

### 7.5 Scaling and limits

- Stateless functions.
- Scale to zero when idle.
- Enforce rate limits at the edge.
- Set provider quotas and spending caps.
- Monitor cold-start latency.
- Avoid long-running requests.

### 7.6 Rollback

- Deploy immutable versions.
- Keep the previous version available.
- Roll back by switching traffic to the previous version.
- Keep API versions backward compatible.
- Do not rewrite Git history.

---

## 8. CI/CD requirements (future)

Adding or changing workflows requires explicit approval and is outside backend
editing boundaries.

If a workflow is approved:

- Use least-privilege permissions.
- Prefer OIDC over long-lived cloud keys.
- Use protected environments for production.
- Require review for production deployment.
- Do not echo secrets.
- Pin action versions.
- Run tests, schema validation, and secret scanning.
- Publish only the build output.
- Keep static and API deployments independent.
- Record deployment provenance.

No workflow is created by this document.

---

## 9. Observability

### Static site

- Uptime checks for key routes.
- Broken-link checks.
- Lighthouse or equivalent performance checks.
- Privacy-respecting analytics only if approved.
- Error monitoring that does not collect PII.

### API (if approved)

- Structured logs with request IDs.
- Error rate, latency, and throughput metrics.
- Rate-limit and abuse metrics.
- Enquiry delivery success and failure.
- Cost and quota monitoring.
- Alerts to a named owner.
- Dashboards for launch and incidents.

### Synthetic checks

- Home, products, a product detail query, contact, and 404.
- Enquiry submission in staging with synthetic data.
- CORS preflight from the production origin.

---

## 10. Disaster recovery

| Scenario | Recovery |
| --- | --- |
| Bad static deployment | Redeploy the previous approved commit or artifact |
| Bad API deployment | Roll back to the previous API version |
| Provider outage | Static site remains available; API features degrade |
| Secret compromise | Rotate secrets, disable integration, audit |
| Data loss (if storage approved) | Restore from backup and verify integrity |
| Domain/DNS issue | Use provider DNS rollback; keep documented records |

Proposed targets (not commitments):

- Static recovery: under 1 hour.
- API recovery: under 4 hours.
- Data RPO: 24 hours if storage is approved.
- Data RTO: 8 hours if storage is approved.

Document and test restore procedures before relying on them.

---

## 11. Cost and operational guardrails

- Keep the static deployment at $0.
- Do not enable a paid plan without approval.
- Set provider spending caps.
- Alert at 50%, 80%, and 100% of expected usage.
- Rate-limit writes.
- Avoid unnecessary logging volume.
- Review costs monthly.
- Document the owner of each service.
- Prefer managed services over self-hosted infrastructure.

See [`costs.md`](costs.md) for indicative limits.

---

## 12. Approval gates

Explicit user approval is required before:

1. creating any backend code or dependency;
2. creating or changing a deployment workflow;
3. changing hosting or DNS;
4. adding a custom domain;
5. creating a provider account or paid plan;
6. creating or storing secrets;
7. enabling an enquiry destination;
8. adding authentication;
9. collecting or storing personal data;
10. publishing any new business claim.

Until approval, the deployment remains static and unchanged.

---

## 13. What must not change

- The Vite base path `/Website-for-testing-/`.
- The React 19 + Vite 8 stack.
- The prerender pipeline.
- The route manifest as the routing source of truth.
- The GitHub Pages static deployment model.
- The existing Git history.

Any change to these requires explicit approval and a separate plan.
