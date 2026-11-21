# HONIESH API Contracts (Proposed)

> **Status: proposed contract only. No API exists.**
>
> These endpoints are a design proposal for a possible future backend. They are
> not implemented, deployed, or reachable. No server code has been written.

| Field | Value |
| --- | --- |
| Last reviewed | 2026-11-21 |
| Owner | HONIESH Backend Engineer |
| Version | `v1` (proposed) |
| Implementation status | Not started |
| Approval status | Not approved |

---

## 1. Conventions

### 1.1 Base URL

Use a placeholder until a host is approved:

```text
{API_BASE_URL}
```

Do **not** treat any example host as real. The static frontend would receive the
base URL through the public `VITE_API_BASE_URL` variable. That variable is
public by design and must never contain a secret.

### 1.2 Versioning

- All endpoints are under `/v1`.
- Additive changes are allowed within `v1`.
- Removing or renaming a field, changing a type, or adding a required request
  field requires `/v2`.
- Deprecations require a documented notice period (proposed: 90 days).

### 1.3 Transport and content type

- HTTPS only.
- `Content-Type: application/json; charset=utf-8`.
- Requests with any other content type return `415`.
- Responses use UTF-8 JSON.

### 1.4 Authentication

| Endpoint class | Authentication |
| --- | --- |
| Public reads | None |
| Enquiry submission | None; protected by origin checks, validation, spam controls, and rate limits |
| Admin or account endpoints | Not designed; deferred until approved |

No API key or secret is ever shipped to the browser.

### 1.5 Response envelope

Success:

```json
{
  "data": {},
  "meta": {
    "requestId": "req_example",
    "generatedAt": "2026-11-21T00:00:00Z"
  }
}
```

Error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid.",
    "details": [
      {
        "field": "email",
        "code": "INVALID_EMAIL",
        "message": "Enter a valid email address."
      }
    ]
  },
  "meta": {
    "requestId": "req_example"
  }
}
```

Rules:

- `requestId` is always present and safe to show to support.
- Error messages must not echo secrets, stack traces, or the full request body.
- Validation details identify fields but do not repeat submitted PII.

### 1.6 Null policy

Fields that are unconfirmed in the current data model **must be returned as
`null`**, not omitted and not invented:

- `price`
- `availability`
- `sku`
- `rating`
- `reviewCount`
- `ingredients`
- `ingredientPercentages`
- `nutritionalValues`
- `healthClaims`
- article `author`
- article `publishedAt`
- case study `client`
- case study `results`, `quotes`, `statistics`

This keeps the contract stable and prevents fabricated business facts.

### 1.7 Pagination

- Cursor-based.
- Query parameters: `limit` (default 20, max 100) and `cursor` (opaque).
- Response `meta.page`:

```json
{
  "page": {
    "limit": 20,
    "nextCursor": null,
    "hasMore": false
  }
}
```

Invalid cursors return `400`.

### 1.8 Caching

| Endpoint class | Suggested headers |
| --- | --- |
| Catalogue reads | `Cache-Control: public, max-age=300, stale-while-revalidate=86400`, `ETag` |
| Article reads | `Cache-Control: public, max-age=300`, `ETag` |
| Health | `Cache-Control: no-store` |
| Enquiries | `Cache-Control: no-store` |

Support `If-None-Match` and return `304` when appropriate.

### 1.9 CORS

- Allow only explicitly configured origins.
- Production origin: `https://rupeshkumarpilla.github.io`.
- Local development origin: the configured Vite origin (for example
  `http://localhost:5173`, subject to local configuration).
- Do not use `Access-Control-Allow-Origin: *` with credentials.
- Return `Vary: Origin`.
- Preflight must allow `POST`, `GET`, `OPTIONS` and the headers
  `Content-Type`, `Idempotency-Key`.
- Requests from unknown origins are rejected for writes.

### 1.10 Rate limits (proposed)

| Endpoint class | Limit |
| --- | --- |
| Public reads | 60 requests/minute/IP burst; 1,000/hour/IP |
| Health | 120 requests/minute/IP |
| Enquiry submission | 5/hour/IP; 3/hour/email; 20/day/IP |
| Global | Provider-level DDoS protection and a cost cap |

Limits are enforced at the edge. Exceeding a limit returns `429` with
`Retry-After`.

### 1.11 Idempotency

`POST /v1/enquiries` accepts an `Idempotency-Key` header (UUID recommended).

- Same key and same payload: replay the original response.
- Same key and different payload: `409 IDEMPOTENCY_CONFLICT`.
- Keys are retained for a bounded period (proposed: 24 hours).

### 1.12 Field naming

- JSON uses `camelCase`.
- IDs and slugs are lowercase, URL-safe strings.
- Timestamps are ISO 8601 UTC.

---

## 2. Endpoint inventory

| Method | Path | Purpose | Auth | Writes data |
| --- | --- | --- | --- | --- |
| GET | `/v1/health` | Liveness and version | None | No |
| GET | `/v1/catalogue/summary` | Counts and catalogue metadata | None | No |
| GET | `/v1/products` | List product configurations | None | No |
| GET | `/v1/products/{id}` | Single product configuration | None | No |
| GET | `/v1/flavours` | List flavour concepts | None | No |
| GET | `/v1/flavours/{slug}` | Single flavour concept | None | No |
| GET | `/v1/packaging` | List packaging families | None | No |
| GET | `/v1/packaging/{slug}` | Single packaging family | None | No |
| GET | `/v1/articles` | List journal articles | None | No |
| GET | `/v1/articles/{slug}` | Single journal article | None | No |
| GET | `/v1/use-cases` | List proposed use cases | None | No |
| GET | `/v1/case-studies` | List illustrative case studies | None | No |
| POST | `/v1/enquiries` | Submit an enquiry | None | Forwards only |

**Total:** 13 proposed endpoints. Only one writes or forwards data.

---

## 3. Read endpoints

### 3.1 `GET /v1/health`

Response `200`:

```json
{
  "data": {
    "status": "ok",
    "version": "v1",
    "time": "2026-11-21T00:00:00Z"
  },
  "meta": {
    "requestId": "req_example"
  }
}
```

Rules:

- Do not include environment names, commit hashes, hostnames, or dependency
  versions that aid attackers.
- `503` if a required dependency is unavailable.

### 3.2 `GET /v1/catalogue/summary`

Response `200`:

```json
{
  "data": {
    "totalConfigurations": 25,
    "glassJarConfigurations": 15,
    "honeyStickConfigurations": 5,
    "portionPackConfigurations": 5,
    "flavourCount": 5,
    "packagingFamilyCount": 3,
    "articleCount": 8,
    "useCaseCount": 7,
    "caseStudyCount": 5
  },
  "meta": {
    "requestId": "req_example",
    "generatedAt": "2026-11-21T00:00:00Z"
  }
}
```

These counts are verified from the current frontend data model. The API must
fail its build if they drift.

### 3.3 `GET /v1/products`

Query parameters:

| Name | Type | Rules |
| --- | --- | --- |
| `flavour` | string | One of the five flavour IDs |
| `packaging` | string | `glass-jars`, `honey-sticks`, `portion-packs` |
| `size` | string | `250-g`, `500-g`, `1-litre`; only with glass jars |
| `limit` | integer | 1–100, default 20 |
| `cursor` | string | Opaque pagination cursor |

Unknown filter values return `400 VALIDATION_ERROR`.

Response `200` (compact projection):

```json
{
  "data": [
    {
      "id": "glass-jars-250-g-original-honey",
      "displayName": "Original / Glass jar 250 g",
      "flavourId": "original-honey",
      "packagingId": "glass-jars",
      "sizeId": "250-g",
      "netContent": {
        "label": "250 g",
        "value": 250,
        "unit": "g",
        "unitType": "mass"
      },
      "formulationStatus": "unconfirmed",
      "price": null,
      "availability": null,
      "sku": null,
      "rating": null,
      "reviewCount": null
    }
  ],
  "meta": {
    "requestId": "req_example",
    "page": {
      "limit": 20,
      "nextCursor": null,
      "hasMore": false
    }
  }
}
```

### 3.4 `GET /v1/products/{id}`

Path parameter: `id` is the stable product configuration ID.

Response `200`:

```json
{
  "data": {
    "id": "glass-jars-250-g-original-honey",
    "slug": "glass-jars-250-g-original-honey",
    "configurationKey": "glass-jars:original-honey:250-g",
    "displayName": "Original / Glass jar 250 g",
    "shortDescription": "Original concept in a 250 g glass jar. Packaging shown is a concept illustration.",
    "formulationNotice": "Flavour formulation is unconfirmed and requires review before publication.",
    "flavourId": "original-honey",
    "flavourName": "Original",
    "flavourSlug": "original-honey",
    "packagingId": "glass-jars",
    "packagingName": "Glass Jar Collection",
    "packagingShortName": "Glass jar",
    "packagingSlug": "glass-jars",
    "sizeId": "250-g",
    "sizeLabel": "250 g",
    "variantLabel": "250 g",
    "unitType": "mass",
    "netContent": {
      "label": "250 g",
      "value": 250,
      "unit": "g",
      "unitType": "mass"
    },
    "unitCount": null,
    "unitWeightGrams": null,
    "format": "Glass jar",
    "intendedConvenience": "Glass jar format available in 250 g, 500 g and 1 litre.",
    "formulationStatus": "unconfirmed",
    "visualStatus": "concept-visual-pending-photography",
    "visualDisclosure": "Premium illustrative packaging concept; not a photograph of finalized packaging.",
    "price": null,
    "availability": null,
    "sku": null,
    "rating": null,
    "reviewCount": null,
    "pendingInformation": [
      "Confirmed ingredient list",
      "Confirmed formulation",
      "Approved product description",
      "Final packaging photography or approved illustration"
    ]
  },
  "meta": {
    "requestId": "req_example"
  }
}
```

Rules:

- Unknown ID returns `404 NOT_FOUND`.
- Do not fabricate missing values.
- The 1 litre configuration must report `unitType: "volume"` and must never be
  described as 1 kg.

### 3.5 `GET /v1/flavours`

Response `200`:

```json
{
  "data": [
    {
      "id": "original-honey",
      "slug": "original-honey",
      "name": "Original",
      "conceptDirection": "original",
      "description": "Original concept direction in the HONIESH collection. Formulation and ingredient details pending confirmation.",
      "formulationStatus": "unconfirmed",
      "ingredients": null,
      "ingredientPercentages": null,
      "nutritionalValues": null,
      "healthClaims": null,
      "reviewRequired": true
    }
  ],
  "meta": {
    "requestId": "req_example"
  }
}
```

The list contains five items. No ingredient, nutrition, origin, or health claim
may be added without approved data.

### 3.6 `GET /v1/flavours/{slug}`

Returns one flavour plus related product configuration IDs and related article
slugs. Unknown slug returns `404`.

### 3.7 `GET /v1/packaging`

Response `200`:

```json
{
  "data": [
    {
      "id": "glass-jars",
      "slug": "glass-jars",
      "name": "Glass Jar Collection",
      "shortName": "Glass jar",
      "format": "Glass jar",
      "specificationStatus": "confirmed-specification",
      "finalDesignStatus": "not-finalized",
      "visualStatus": "concept-visual-pending-photography",
      "sizeLabel": "Size",
      "sizes": [
        { "id": "250-g", "label": "250 g", "value": 250, "unit": "g", "unitType": "mass" },
        { "id": "500-g", "label": "500 g", "value": 500, "unit": "g", "unitType": "mass" },
        { "id": "1-litre", "label": "1 litre", "value": 1, "unit": "litre", "unitType": "volume" }
      ],
      "unitCount": null,
      "unitWeightGrams": null,
      "netContent": null,
      "intendedConvenience": "Glass jar format available in 250 g, 500 g and 1 litre.",
      "displayOrder": 1
    }
  ],
  "meta": {
    "requestId": "req_example"
  }
}
```

The list contains three families.

### 3.8 `GET /v1/packaging/{slug}`

Returns one packaging family plus its configuration IDs. Unknown slug returns
`404`.

### 3.9 `GET /v1/articles`

Query parameters: `topic` (category), `limit`, `cursor`.

Response `200` (compact):

```json
{
  "data": [
    {
      "id": "why-does-honey-crystallize",
      "slug": "why-does-honey-crystallize",
      "title": "Why Does Honey Crystallize?",
      "category": "Honey education",
      "summary": "Crystallization is a natural honey characteristic. Learn what affects it and how to think about texture without treating it as a defect.",
      "readingTimeMinutes": 4,
      "status": "editorial-draft",
      "author": null,
      "publishedAt": null,
      "factCheckRequired": true
    }
  ],
  "meta": {
    "requestId": "req_example",
    "page": {
      "limit": 20,
      "nextCursor": null,
      "hasMore": false
    }
  }
}
```

The list contains eight articles.

### 3.10 `GET /v1/articles/{slug}`

Returns the full article body, sources, related packaging IDs, related flavour
IDs, and related article slugs. Unknown slug returns `404`.

Rules:

- `author` and `publishedAt` remain `null` until supplied.
- `publicationNote` must state that the article is an editorial draft.
- Prohibited claims must not be added.

### 3.11 `GET /v1/use-cases`

Returns seven proposed use cases. Each item includes `status: "proposed"`,
`isConfirmedPartnership: false`, and empty `proofPoints`. Do not add client
names or results.

### 3.12 `GET /v1/case-studies`

Returns five illustrative frameworks. Each item includes
`status: "illustrative-placeholder"`, `client: null`, and empty `results`,
`quotes`, and `statistics`. The API must not present them as customer stories.

---

## 4. Write endpoint

### 4.1 `POST /v1/enquiries`

Headers:

| Header | Required | Notes |
| --- | --- | --- |
| `Content-Type` | Yes | `application/json` |
| `Origin` | Browser sends | Must be an allowed origin |
| `Idempotency-Key` | Recommended | UUID; prevents duplicate sends |
| `Accept` | Optional | `application/json` |

Request body:

```json
{
  "name": "Example enquirer",
  "email": "enquirer@example.com",
  "enquiryPathId": "individual-product",
  "message": "I would like to ask about the glass jar formats.",
  "productId": "glass-jars-250-g-original-honey",
  "consent": true
}
```

Field rules:

| Field | Type | Rules |
| --- | --- | --- |
| `name` | string | 1–100 characters after trim; no control characters |
| `email` | string | Valid address, max 254 characters; normalized to lowercase domain |
| `enquiryPathId` | enum | `individual-product`, `retail-distribution`, `hotels-hospitality`, `bulk-business` |
| `message` | string | 10–5,000 characters; plain text only |
| `productId` | string \| null | If present, must match a known configuration ID |
| `consent` | boolean | Must be `true` |
| Unknown fields | — | Rejected with `400` |

JSON Schema (proposed):

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "EnquiryRequest",
  "type": "object",
  "additionalProperties": false,
  "required": ["name", "email", "enquiryPathId", "message", "consent"],
  "properties": {
    "name": { "type": "string", "minLength": 1, "maxLength": 100 },
    "email": { "type": "string", "format": "email", "maxLength": 254 },
    "enquiryPathId": {
      "type": "string",
      "enum": [
        "individual-product",
        "retail-distribution",
        "hotels-hospitality",
        "bulk-business"
      ]
    },
    "message": { "type": "string", "minLength": 10, "maxLength": 5000 },
    "productId": {
      "type": ["string", "null"],
      "maxLength": 120
    },
    "consent": { "const": true }
  }
}
```

Response `202`:

```json
{
  "data": {
    "reference": "enq_example",
    "status": "received"
  },
  "meta": {
    "requestId": "req_example"
  }
}
```

Rules:

- Return `202` only after the approved destination accepts the message.
- If delivery fails, return `503 DELIVERY_UNAVAILABLE`; do not claim success.
- Do not return the submitted email, message, or internal destination.
- Do not store the enquiry unless retention is approved.
- If storage is approved, encrypt at rest, restrict access, and define deletion.

Error responses:

| Status | Code | Cause |
| --- | --- | --- |
| 400 | `INVALID_JSON` | Malformed JSON |
| 400 | `VALIDATION_ERROR` | Schema or field failure |
| 403 | `ORIGIN_NOT_ALLOWED` | Disallowed `Origin` |
| 409 | `IDEMPOTENCY_CONFLICT` | Same key, different payload |
| 413 | `PAYLOAD_TOO_LARGE` | Body exceeds limit (proposed 16 KB) |
| 415 | `UNSUPPORTED_MEDIA_TYPE` | Not JSON |
| 429 | `RATE_LIMITED` | Limit exceeded; includes `Retry-After` |
| 503 | `DELIVERY_UNAVAILABLE` | Destination unavailable |

---

## 5. Deferred and not-proposed endpoints

These are **not designed** and must not be implemented without a new approved
requirement.

| Path | Reason |
| --- | --- |
| `POST /v1/auth/login` | Login is a placeholder; no user model or auth requirement |
| `POST /v1/auth/register` | No account requirement |
| `/v1/admin/*` | No admin users or content workflow |
| `/v1/orders` | No pricing, availability, or fulfilment |
| `/v1/payments` | No payment requirement; high compliance risk |
| `/v1/inventory` | No inventory data |
| `/v1/reviews` | No reviews or ratings |
| `/v1/certifications` | No authority, standard, or test results to publish |
| `/v1/customers` | No customer data or permission |

Do not add placeholder endpoints that return invented data.

---

## 6. Shared schemas

### 6.1 NetContent

```json
{
  "label": "250 g",
  "value": 250,
  "unit": "g",
  "unitType": "mass"
}
```

`unitType` is `mass` or `volume`. A 1 litre item is `volume`.

### 6.2 Source reference

```json
{
  "label": "National Honey Board — Honey FAQ",
  "url": "https://honey.com/faq"
}
```

Only publish sources that exist in the approved content. Do not add citations to
support invented claims.

### 6.3 Error detail

```json
{
  "field": "email",
  "code": "INVALID_EMAIL",
  "message": "Enter a valid email address."
}
```

### 6.4 Request metadata

Every response includes:

```json
{
  "requestId": "req_example"
}
```

`generatedAt` is optional and must not be used as a cache key.

---

## 7. Error code catalogue

| Code | HTTP | Meaning |
| --- | ---: | --- |
| `INVALID_JSON` | 400 | Body is not valid JSON |
| `VALIDATION_ERROR` | 400 | Field validation failed |
| `NOT_FOUND` | 404 | Resource does not exist |
| `METHOD_NOT_ALLOWED` | 405 | Method not supported |
| `ORIGIN_NOT_ALLOWED` | 403 | CORS origin rejected |
| `IDEMPOTENCY_CONFLICT` | 409 | Key reused with a different payload |
| `PAYLOAD_TOO_LARGE` | 413 | Body exceeds the limit |
| `UNSUPPORTED_MEDIA_TYPE` | 415 | Content type not JSON |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `DELIVERY_UNAVAILABLE` | 503 | Enquiry destination unavailable |
| `INTERNAL_ERROR` | 500 | Unhandled server error |

Client-facing `INTERNAL_ERROR` messages are generic. Details belong in redacted
server logs.

---

## 8. Contract testing requirements

Before any implementation is considered complete:

1. Validate every response against its schema.
2. Assert catalogue counts: 25 total, 15 glass jar, 5 sticks, 5 portion packs,
   5 flavours, 3 packaging families, 8 articles, 7 use cases, 5 case studies.
3. Assert unconfirmed fields remain `null`.
4. Assert 1 litre is `volume`, not mass.
5. Assert unknown IDs return `404`.
6. Assert invalid input returns `400` without echoing PII.
7. Assert `413`, `415`, `429`, and `503` behaviour.
8. Assert CORS preflight and origin rejection.
9. Assert idempotency replay and conflict.
10. Assert logs contain no email addresses, message bodies, or secrets.
11. Load-test read endpoints and enquiry rate limits.
12. Run a security review before production.

No endpoint is considered production-ready until these tests pass.

---

## 9. Change management

- Maintain a changelog for `v1`.
- Additive fields are optional and documented.
- Never silently change the meaning of a field.
- Never return fabricated values to satisfy a schema.
- If a data source is missing, return `null` and document why.
- If a field becomes required, release a new version.
- Keep the static frontend functional across API versions.

---

## 10. Explicit non-claims

This contract does **not** claim:

- that any endpoint is implemented;
- that any enquiry is delivered;
- that authentication exists;
- that HONIESH has certifications, prices, inventory, SKUs, reviews, or
  customer results;
- that the API is secure. Security requires implementation and testing.
