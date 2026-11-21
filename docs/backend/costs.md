# HONIESH Backend Cost Estimate

> **Status: estimate only. No service has been purchased or configured.**
>
> Figures below are indicative and must be verified with each provider before
> any commitment. Prices, free tiers, and limits change. This document does not
> quote HONIESH product prices.

| Field | Value |
| --- | --- |
| Last reviewed | 2026-11-21 |
| Owner | HONIESH Backend Engineer |
| Current monthly backend cost | **$0** |
| Paid services active | None |
| Budget approved | None |

---

## 1. Principles

1. Stay at **$0** until a verified trigger is approved.
2. Prefer free tiers and managed services.
3. Avoid fixed monthly commitments for unproven demand.
4. Set spending caps and alerts before enabling any paid resource.
5. Treat engineering, security, and legal time as real costs.
6. Do not trade security for a lower headline price.

---

## 2. Current cost

| Component | Cost | Notes |
| --- | ---: | --- |
| GitHub Pages hosting | $0 | Public repository, static site |
| Frontend build | $0 | Runs in the existing environment |
| Domain | $0 | Using the existing `github.io` origin |
| Backend | $0 | None exists |
| Database | $0 | None exists |
| Email | $0 | None configured |
| **Total** | **$0/month** | No paid service |

---

## 3. Indicative provider limits

> **Confidence: low-to-medium.** These are commonly published figures at the
> time of writing. Verify on the provider's official page before relying on
> them. Limits may be region-specific, change without notice, or have fair-use
> conditions.

| Component | Indicative free tier | Indicative paid entry | Verify |
| --- | --- | --- | --- |
| GitHub Pages (public repo) | 1 GB published site; ~100 GB/month soft bandwidth; ~10 builds/hour | N/A | GitHub Pages usage limits |
| Static host alternative (if approved) | Generous free static hosting | Varies | Provider pricing |
| Serverless functions | ~100,000 requests/day; short CPU per request | ~$5/month base | Provider limits/pricing |
| Edge key-value store | ~100,000 reads/day; ~1,000 writes/day | Usage-based | Provider limits |
| Serverless SQL (D1-style) | ~5 GB storage; millions of rows read/day | Usage-based | Provider limits |
| Managed form provider | ~50 submissions/month | ~$10–25/month | Provider pricing |
| Transactional email | ~3,000 emails/month; ~100/day | Usage-based | Provider pricing |
| CAPTCHA / bot challenge | Free | Free | Provider pricing |
| Error monitoring | ~5,000 events/month | Usage-based | Provider pricing |
| Uptime monitoring | ~50 monitors at ~5-minute intervals | Usage-based | Provider pricing |
| Domain (optional) | N/A | ~$10–20/year | Registrar |

### 3.1 Official verification links

Use these links to confirm current limits. Do not assume the figures above are
still accurate.

- GitHub Pages usage limits:
  `https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits`
- Cloudflare Workers limits:
  `https://developers.cloudflare.com/workers/platform/limits/`
- Cloudflare Workers pricing:
  `https://developers.cloudflare.com/workers/platform/pricing/`
- Cloudflare D1 limits:
  `https://developers.cloudflare.com/d1/platform/limits/`
- Cloudflare KV limits:
  `https://developers.cloudflare.com/kv/platform/limits/`
- Cloudflare Turnstile:
  `https://developers.cloudflare.com/turnstile/`
- Resend pricing:
  `https://resend.com/pricing`
- Formspree pricing:
  `https://formspree.io/plans`
- Netlify pricing:
  `https://www.netlify.com/pricing/`
- Sentry pricing:
  `https://sentry.io/pricing/`
- UptimeRobot pricing:
  `https://uptimerobot.com/pricing/`

---

## 4. Scenario analysis

### Scenario 0 — Current static site

| Item | Monthly |
| --- | ---: |
| Hosting | $0 |
| Backend | $0 |
| **Total** | **$0** |

**Recommendation:** remain here until a trigger is approved.

### Scenario 1 — Enquiries via a managed form provider (T1)

| Item | Monthly |
| --- | ---: |
| GitHub Pages | $0 |
| Managed form provider | $0 within free tier |
| Domain | $0 (optional) |
| **Total** | **$0** at low volume |

If submissions exceed the free tier, expect roughly $10–25/month. Verify the
current plan.

**Trade-off:** least engineering effort, but less control over validation,
routing, and data handling. The provider becomes a data processor.

### Scenario 2 — Enquiries via a serverless API + email (T1)

| Item | Monthly |
| --- | ---: |
| GitHub Pages | $0 |
| Serverless functions | $0 within free tier |
| Transactional email | $0 within free tier |
| Bot challenge | $0 |
| Domain | $0 (optional) |
| **Total** | **$0** at low volume |

At sustained volume above free tiers, expect roughly $5–20/month plus email
usage. Verify current limits.

**Trade-off:** more control, but more code, secrets, monitoring, and maintenance.

### Scenario 3 — Read-only catalogue API (T2)

| Item | Monthly |
| --- | ---: |
| GitHub Pages | $0 |
| Serverless functions | $0 within free tier |
| KV or D1 (optional) | $0 within free tier |
| **Total** | **$0** at low volume |

Above free tiers, expect roughly $5–20/month depending on reads and storage.

**Note:** if the catalogue can be generated at build time, a runtime API and
database may be unnecessary.

### Scenario 4 — Accounts and authentication (T3)

| Item | Monthly |
| --- | ---: |
| Managed identity provider | $0 up to a monthly active user limit |
| Serverless functions | $0–low |
| **Total** | **$0–low** at small scale |

Pricing is usually per monthly active user. Verify the provider's current free
tier and overage rate.

**Trade-off:** identity providers reduce security risk but add vendor
dependency, data-processing agreements, and user-support obligations.

### Scenario 5 — Commerce (T6)

Commerce is **not estimated** because it depends on:

- payment processing fees;
- tax and VAT handling;
- fulfilment and shipping;
- returns and refunds;
- fraud prevention;
- legal and accounting review;
- platform subscription.

A commerce business case is required before any cost estimate is meaningful.

---

## 5. Cost drivers

| Driver | Why it matters |
| --- | --- |
| Requests | Most serverless pricing is request-based |
| CPU time | Long requests cost more and may hit limits |
| Storage | Database and object storage grow over time |
| Egress | Large responses and downloads cost bandwidth |
| Email volume | Transactional email has monthly and daily caps |
| Logs | High-volume logging can be billable |
| DDoS/abuse | Malicious traffic can exhaust quotas |
| Build minutes | Frequent deployments consume CI minutes |
| Domain and DNS | Small recurring cost |
| Support plans | Usually unnecessary at launch |

---

## 6. Hidden costs

Free tiers do not make a backend free in practice. Budget for:

- engineering time to build, test, and maintain;
- security review and remediation;
- privacy notice and legal review;
- monitoring and incident response;
- email deliverability and domain reputation;
- content review for any new claims;
- design and production of final imagery;
- provider migration if limits or terms change;
- on-call or support ownership.

These are often larger than the hosting bill.

---

## 7. Budget controls

Before enabling any paid resource:

- [ ] Set a hard spending cap where the provider supports it.
- [ ] Configure alerts at 50%, 80%, and 100% of expected usage.
- [ ] Enforce rate limits and quotas.
- [ ] Disable unused services.
- [ ] Review the bill monthly.
- [ ] Name an owner for each service.
- [ ] Document the rollback or disable procedure.
- [ ] Confirm the plan in writing.

Do not rely on “it should stay free”. Verify limits and monitor usage.

---

## 8. Recommendation

**Stay at $0 until a trigger is approved.**

If T1 is approved:

1. Start with a managed form provider if it satisfies the requirement.
2. Move to a serverless API only if control, validation, or routing requires it.
3. Add a database only when persistence is explicitly required.
4. Add a domain only when the brand and business require it.

If T2 is approved:

1. Prefer build-time generation over a runtime API.
2. Add a read-only API only if build-time output cannot satisfy the requirement.
3. Add storage only if the data cannot be generated at build time.

---

## 9. Verification checklist

Before committing to any provider:

- [ ] Confirm the current free-tier limits on the official page.
- [ ] Confirm overage pricing and billing increments.
- [ ] Confirm regional availability.
- [ ] Confirm data-processing terms and data location.
- [ ] Confirm deletion and export capabilities.
- [ ] Confirm uptime and support terms.
- [ ] Confirm the exit or migration path.
- [ ] Confirm the total cost at 1×, 5×, and 20× expected volume.
- [ ] Confirm the cost of logging, egress, and backups.
- [ ] Confirm that no paid plan is enabled by default.

---

## 10. Disclaimer

This is a planning estimate, not a quotation. It excludes taxes, currency
fluctuation, engineering labour, legal fees, and HONIESH product pricing. No
provider has been engaged. No cost has been incurred.
