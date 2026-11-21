# HONIESH Backend Security Requirements

> **Status: requirements only. No backend exists.**
>
> This document defines controls that a future backend must implement. It is not
> evidence that any control is active. No system should be described as secure
> until these controls are implemented, tested, and reviewed.

| Field | Value |
| --- | --- |
| Last reviewed | 2026-11-21 |
| Owner | HONIESH Backend Engineer |
| Scope | Future API, data handling, and deployment |
| Implementation status | Not started |
| Security review status | Not performed |

---

## 1. Scope and principles

Applies to any future API, database, email integration, authentication, or
deployment added to HONIESH.

Principles:

1. **Least privilege** — every identity, token, and service gets the minimum
   access required.
2. **Data minimization** — collect only what is necessary for a stated purpose.
3. **Secure by default** — deny by default; fail closed for writes.
4. **Defense in depth** — validate at the edge and in the application.
5. **No secrets in the browser or repository** — public configuration only.
6. **No invented data** — missing business facts remain `null`.
7. **Evidence before claims** — security claims require tests and review.

---

## 2. Assets to protect

| Asset | Sensitivity | Notes |
| --- | --- | --- |
| Enquiry name and email | Personal data | Collected only if T1 is approved |
| Enquiry message | Personal data; may contain free text | Do not log by default |
| API credentials and tokens | Secret | Provider secret store only |
| Email provider credentials | Secret | Never in frontend |
| Database credentials | Secret | Only if a database is approved |
| Source code and build artifacts | Internal | Public repository may expose logic |
| Brand and content integrity | Business | Prevent unauthorized edits |
| Availability and cost | Operational | Rate limits and budget caps |

---

## 3. Threat model

| Threat | Vector | Impact | Mitigation | Status |
| --- | --- | --- | --- | --- |
| Spam enquiry flooding | Automated form posts | Inbox flooding, cost | Rate limits, honeypot, provider challenge | Planned |
| PII leakage in logs | Logging request bodies | Privacy harm | Redaction, field allowlist | Planned |
| Secret leakage | Commit, log, error, bundle | Full compromise | Secret store, scanning, no `VITE_` secrets | Planned |
| CORS misconfiguration | Wildcard origin | Unauthorized browser calls | Explicit allowlist, `Vary: Origin` | Planned |
| XSS through API data | Malicious content rendered as HTML | Session/data compromise | React escaping, no raw HTML, validation | Planned |
| Injection | SQL/NoSQL/command injection | Data breach | Parameterized queries, no shell calls | Planned |
| SSRF | API fetches user-supplied URL | Internal network access | Do not fetch user URLs | Planned |
| Enumeration | Guessing enquiry references | Privacy leak | Opaque IDs, authorization, rate limits | Planned |
| Denial of service | Traffic spike | Outage, cost | Provider DDoS protection, quotas | Planned |
| Cost abuse | High-volume requests | Financial loss | Rate limits, budget alerts, caps | Planned |
| Supply-chain compromise | Malicious dependency | Code execution | Minimal pinned dependencies, review | Planned |
| Email spoofing | Forged sender | Brand damage | SPF, DKIM, DMARC | Planned |
| CSRF | Cookie-based session | Unauthorized actions | SameSite cookies, CSRF token | Planned if auth |
| Clickjacking | Framing the site | UI redress | `frame-ancestors 'none'` where supported | Planned |
| Data retention violation | Data kept indefinitely | Legal/privacy risk | Retention job and documented policy | Planned |
| Insider misuse | Excessive access | Data exposure | Least privilege, audit logs | Planned |
| Backup loss | No restore testing | Data loss | Backups and restore drills | Planned if storage |

---

## 4. Trust boundaries

```text
Browser (untrusted)
   |
   | HTTPS, CORS, rate limits
   v
Edge / API (trust boundary)
   |
   | validated, normalized data only
   v
Application logic
   |
   +--> Email provider (trusted third party, least privilege)
   |
   +--> Optional database (private network, least privilege)
```

Rules:

- Treat every request field as untrusted.
- Treat third-party responses as untrusted.
- Never trust `Origin`, `Referer`, or client-side validation alone.
- Never expose internal service names or error details to clients.

---

## 5. Input validation

### 5.1 Transport and body

- HTTPS only.
- Require `Content-Type: application/json` for JSON writes; otherwise `415`.
- Enforce a body-size limit (proposed: 16 KB for enquiries).
- Enforce JSON depth and key-count limits.
- Reject malformed JSON with `400 INVALID_JSON`.
- Reject unknown fields with `400 VALIDATION_ERROR`.
- Reject duplicate keys using a strict parser.
- Do not accept file uploads.
- Do not accept user-supplied URLs that the server fetches.

### 5.2 Schema validation

- Validate every request against an explicit schema.
- Validate types, lengths, enums, and required fields.
- Use an allowlist for `enquiryPathId` and `productId`.
- Reject `null` where a value is required.
- Reject arrays or objects where a string is expected.

### 5.3 Field rules

| Field | Rules |
| --- | --- |
| `name` | Trim; 1–100 characters; strip control characters; no HTML |
| `email` | Max 254 characters; valid address; normalize domain to lowercase; reject display names and header injection |
| `enquiryPathId` | Enum of the four existing enquiry paths |
| `message` | 10–5,000 characters; plain text; strip control characters; no HTML |
| `productId` | Optional; must match a known configuration ID |
| `consent` | Must be literal `true` |
| Unknown fields | Reject |

### 5.4 Normalization

- Trim leading and trailing whitespace.
- Normalize Unicode to NFC.
- Remove control characters except newlines in the message.
- Collapse excessive whitespace where appropriate.
- Do not silently truncate; reject values that exceed limits.

### 5.5 Output encoding

- The frontend uses React, which escapes text by default.
- Do not use `dangerouslySetInnerHTML` with API data.
- Do not render API content as raw HTML.
- Set `Content-Type: application/json` and `X-Content-Type-Options: nosniff`.
- Escape any value placed into email templates.

### 5.6 Spam controls

- Honeypot field that must remain empty.
- Minimum completion time threshold.
- Provider challenge (for example a managed CAPTCHA) if abuse is observed.
- Per-IP, per-email-hash, and global rate limits.
- Optional email verification for high-risk flows.
- Do not disclose which control triggered a rejection.
- Do not claim delivery when a submission is silently dropped.

---

## 6. CORS and CSRF

### CORS

- Allow only explicitly configured origins.
- Production: `https://rupeshkumarpilla.github.io`.
- Local: the configured Vite origin only.
- Do not use `*` with credentials.
- Return `Vary: Origin`.
- Allow only required methods and headers.
- Reject disallowed origins for writes with `403`.

### CSRF

- Public reads and the enquiry endpoint do not use cookies, so classic CSRF is
  not applicable.
- If cookie-based authentication is added:
  - use `SameSite=Lax` or `Strict`;
  - set `HttpOnly` and `Secure`;
  - require a CSRF token or double-submit pattern;
  - validate `Origin` on state-changing requests;
  - never use GET for state changes.

---

## 7. Rate limiting and abuse prevention

| Scope | Proposed limit | Action |
| --- | --- | --- |
| Public reads | 60/minute/IP; 1,000/hour/IP | `429` with `Retry-After` |
| Health | 120/minute/IP | `429` |
| Enquiries per IP | 5/hour; 20/day | `429` |
| Enquiries per email hash | 3/hour | `429` |
| Global enquiry volume | Provider quota | Circuit breaker and alert |

Implementation requirements:

- Enforce at the edge where possible.
- Use a sliding window or token bucket.
- Key on IP and a salted hash of email; do not store raw email for rate limiting.
- Return `Retry-After`.
- Log the limit event without PII.
- Alert on sustained `429` spikes.
- Apply a provider spending cap.
- Do not rely on client-side throttling.

---

## 8. Authentication and authorization

### Current state

- No authentication exists.
- The login page is a placeholder.
- No user accounts, roles, or protected content are defined.

### If authentication is approved

- Use a managed identity provider. Do not build custom password storage.
- Prefer OIDC authorization code flow with PKCE for browser clients.
- Do not use the implicit flow.
- Use short-lived access tokens and rotating refresh tokens.
- If using cookies, set `HttpOnly`, `Secure`, and `SameSite`.
- Implement logout and session revocation.
- Protect against account enumeration with generic responses.
- Rate-limit login attempts and support lockout or progressive delays.
- Require MFA for administrative access.
- Apply role-based access control with least privilege.
- Log authentication events without passwords or tokens.
- Do not place tokens in `localStorage` if a safer pattern is available.
- Do not expose admin endpoints on the public origin without strong controls.

### Authorization rules

- Public reads require no authorization.
- Enquiry submission requires no account but is rate-limited.
- Admin and account endpoints require explicit roles.
- Deny by default.
- Check authorization on every request, not only in the UI.

---

## 9. Secrets management

### Rules

1. Never commit secrets to Git.
2. Never place secrets in frontend code or `VITE_` variables.
3. Never print secrets in logs, errors, documentation, or reports.
4. Use the hosting provider's secret store or environment variables.
5. Separate development, staging, and production secrets.
6. Grant each secret the minimum scope.
7. Rotate secrets on a schedule and after any suspected exposure.
8. Revoke unused credentials promptly.
9. Do not reuse secrets across services.
10. Do not store secrets in build artifacts.

### Environment variables

- `VITE_`-prefixed values are public and bundled into the browser. They may hold
  only public configuration such as an API base URL.
- Server secrets must use non-`VITE_` names and must never be exposed to the
  client.
- `backend/.env.example` lists variable names only, with empty values.
- Real values belong in a local `.env` file that is Git-ignored, or in the
  provider secret store.
- The existing `.gitignore` excludes `.env`, `.env.local`, `.env.*`, and common
  key/secret patterns, while allowing `.env.example`.

### CI/CD

- Prefer short-lived OIDC credentials over long-lived keys.
- Use protected environments and required reviewers for production.
- Do not echo secrets in workflow logs.
- Restrict who can change deployment configuration.
- Adding or changing workflows requires explicit approval and is outside backend
  editing boundaries.

### If a secret leaks

1. Revoke or rotate immediately.
2. Disable the affected endpoint or integration.
3. Audit access logs.
4. Remove the secret from the working tree and history only with explicit
   authorization.
5. Document the incident and notify affected parties as required.

---

## 10. Personal data and privacy

### Data collected (only if T1 is approved)

- Name
- Email
- Enquiry path
- Message
- Optional product ID
- Consent flag
- Timestamp and request metadata

### Requirements

- State the purpose at collection: responding to the enquiry.
- Provide a privacy notice before submission.
- Do not use enquiry data for marketing without separate consent.
- Do not sell or share data for advertising.
- Collect no special-category data.
- Ask users not to submit sensitive information.
- Restrict access to authorized staff only.
- Encrypt data in transit and at rest.
- Define a retention period (proposed: 90 days unless a documented business
  need requires longer).
- Delete data when no longer needed.
- Provide a process for access, correction, and deletion requests.
- Use data-processing agreements with providers.
- Review cross-border transfer requirements.
- Do not claim GDPR/CCPA compliance without legal review.
- Do not target children.

### Logging and PII

- Do not log names, emails, messages, or full request bodies by default.
- If debugging requires content, use a temporary, access-controlled process with
  explicit approval.
- Hash IP addresses for rate limiting; do not store raw IPs longer than needed.
- Redact query strings that may contain personal data.

---

## 11. Logging, monitoring, and alerting

### Log fields

- Timestamp
- Request ID
- Route and method
- Status code
- Latency
- Allowed origin (not full referrer)
- Hashed IP
- User-agent category
- Error code

### Do not log

- Passwords or tokens
- Authorization headers or cookies
- Email addresses or names
- Message bodies
- Secret values
- Full URLs containing personal data

### Monitoring

- Error rate and 5xx spikes
- `429` rate
- Enquiry delivery failures
- Latency
- Traffic anomalies
- Cost and quota usage
- Certificate expiry
- Dependency vulnerabilities

### Alerting

- Alert to a named owner.
- Define thresholds and runbooks.
- Avoid alert fatigue.
- Test alerts before launch.

---

## 12. Error handling

- Return generic client-facing errors.
- Include a request ID for support.
- Do not include stack traces, SQL, internal hostnames, or secret values.
- Log detailed errors server-side with redaction.
- Distinguish validation errors from server errors.
- Fail closed for writes.
- Never return a success response when delivery or storage failed.
- Do not leak whether an email address exists in the system.

---

## 13. Transport and response headers

### API

- HTTPS only.
- `Strict-Transport-Security` with a reviewed max-age.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: no-referrer`.
- `Permissions-Policy` denying unnecessary features.
- `Cache-Control: no-store` for enquiries.
- `Content-Security-Policy` appropriate to a JSON API.
- `frame-ancestors 'none'` where supported.
- CORS headers as defined above.

### Static site

- GitHub Pages does not expose custom response-header configuration. Verify
  current platform capabilities before relying on headers.
- Use meta tags where appropriate, but understand their limits.
- Avoid inline scripts where possible.
- Keep dependencies minimal.
- Serve only static assets.

---

## 14. Dependency and supply-chain security

- Keep dependencies minimal.
- Pin versions and commit the lockfile.
- Review new dependencies before adding them.
- Prefer well-maintained packages.
- Avoid packages with unnecessary install scripts.
- Run dependency and secret scans in CI when workflows are approved.
- Monitor advisories.
- Remove unused dependencies.
- Generate an SBOM if required.
- Verify build reproducibility where feasible.
- Do not install packages as part of this documentation task.

---

## 15. Infrastructure and least privilege

- Separate development, staging, and production.
- Use separate credentials per environment.
- Grant the API only the permissions it needs.
- Keep databases private; do not expose them publicly.
- Use a managed WAF or edge protection if available.
- Restrict administrative access.
- Enable audit logging.
- Use infrastructure-as-code with review.
- Do not use default credentials.
- Document ownership and on-call responsibility.

---

## 16. Data storage (only if approved)

- Encrypt at rest and in transit.
- Restrict network and identity access.
- Use parameterized queries.
- Validate schema migrations.
- Back up data and test restores.
- Define retention and deletion jobs.
- Avoid storing PII unless necessary.
- Do not store payment card data.
- Do not store passwords in a custom database.
- Log administrative access.
- Review access periodically.

---

## 17. Email security

- Configure SPF, DKIM, and DMARC for the sending domain.
- Use a dedicated sending subdomain if appropriate.
- Handle bounces and complaints.
- Rate-limit outbound email.
- Do not operate an open relay.
- Sanitize user content in email templates.
- Set a monitored reply-to address.
- Do not send marketing without consent.
- Monitor deliverability and abuse reports.

---

## 18. Incident response

1. **Detect** — alerting, reports, or monitoring.
2. **Contain** — disable the endpoint, revoke credentials, isolate systems.
3. **Assess** — scope, affected data, and legal obligations.
4. **Eradicate** — remove the cause and patch.
5. **Recover** — restore service and verify integrity.
6. **Notify** — inform affected parties and regulators as legally required.
7. **Review** — document lessons and update controls.

Keep an incident log. Preserve evidence. Do not destroy logs during
investigation.

---

## 19. Security testing and acceptance criteria

Before production:

- [ ] Threat model reviewed.
- [ ] Input validation tested with valid, invalid, boundary, and malicious input.
- [ ] Body-size and content-type limits tested.
- [ ] CORS allowlist and preflight tested.
- [ ] Rate limits tested.
- [ ] Idempotency tested.
- [ ] Error responses contain no secrets or PII.
- [ ] Logs contain no PII or secrets.
- [ ] Secrets are stored outside the repository.
- [ ] Dependency and secret scans pass.
- [ ] Authentication and authorization tested, if applicable.
- [ ] Data retention and deletion tested, if applicable.
- [ ] Backup and restore tested, if applicable.
- [ ] Load and abuse tests completed.
- [ ] Independent security review completed.
- [ ] Incident runbook documented.
- [ ] Owner and escalation path documented.

No control is considered complete until evidence exists.

---

## 20. Residual risks

Even after controls are implemented:

- Third-party providers can fail or be compromised.
- Free tiers can change or be withdrawn.
- Email deliverability is not guaranteed.
- Client-side code is inspectable.
- Public repositories expose implementation details.
- No system is perfectly secure.
- Legal and privacy obligations require jurisdiction-specific review.

These risks must be accepted explicitly by the business owner before launch.

---

## 21. Explicit non-guarantee

This document is a requirements specification. It does **not** assert that the
HONIESH website or any future backend is secure. Security claims require
implemented controls, tests, and independent review.
