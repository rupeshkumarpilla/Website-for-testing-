export const ENQUIRY_PATHS = Object.freeze([
  Object.freeze({
    id: 'individual-product',
    label: 'Individual product enquiries',
    description: 'Questions about flavours, packaging and personal use.',
    destination: null,
    interfaceStatus: 'frontend-only',
    publicClaimStatus: 'must-not-claim-submission',
  }),
  Object.freeze({
    id: 'retail-distribution',
    label: 'Retail and distribution enquiries',
    description: 'Questions about carrying HONIESH products.',
    destination: null,
    interfaceStatus: 'frontend-only',
    publicClaimStatus: 'must-not-claim-submission',
  }),
  Object.freeze({
    id: 'hotels-hospitality',
    label: 'Hotels and hospitality enquiries',
    description: 'Questions about portion formats for hospitality contexts.',
    destination: null,
    interfaceStatus: 'frontend-only',
    publicClaimStatus: 'must-not-claim-submission',
  }),
  Object.freeze({
    id: 'bulk-business',
    label: 'Bulk and business enquiries',
    description: 'Questions about larger-quantity and business needs.',
    destination: null,
    interfaceStatus: 'frontend-only',
    publicClaimStatus: 'must-not-claim-submission',
  }),
]);

export const CONTENT_GAPS = Object.freeze([
  Object.freeze({
    id: 'company-story',
    requiredFor: Object.freeze(['home', 'our-story']),
    items: Object.freeze([
      'Approved tagline, mission, vision, values and personality are published.',
      'Founder identity, founding date, brand history and sourcing claims are intentionally not published without approved evidence.',
    ]),
    status: 'resolved-by-approved-brand-identity',
  }),
  Object.freeze({
    id: 'product-imagery',
    requiredFor: Object.freeze(['our-honey', 'packaging', 'home']),
    items: Object.freeze([
      'Final glass jar photography or approved concept renders',
      'Final honey stick container and stick photography or approved concept renders',
      'Final portion-pack box and dispensing illustration or approved concept renders',
    ]),
    status: 'required',
  }),
  Object.freeze({
    id: 'formulation-details',
    requiredFor: Object.freeze(['our-honey', 'journal']),
    items: Object.freeze([
      'Confirmed ingredient lists',
      'Confirmed formulation for each flavour',
      'Approved ingredient percentages if publication is intended',
      'Approved nutrition information if publication is intended',
    ]),
    status: 'required-before-publication',
  }),
  Object.freeze({
    id: 'contact-details',
    requiredFor: Object.freeze(['contact', 'all-enquiry-paths']),
    items: Object.freeze([
      'Approved enquiry email',
      'Approved phone number if required',
      'Approved business address if required',
      'Form provider or mailto destination',
    ]),
    status: 'required',
  }),
  Object.freeze({
    id: 'editorial-authorship',
    requiredFor: Object.freeze(['journal']),
    items: Object.freeze([
      'Author names',
      'Publication dates',
      'Reviewed source list',
      'Fact-check approval',
    ]),
    status: 'required-before-publication',
  }),
  Object.freeze({
    id: 'real-case-studies',
    requiredFor: Object.freeze(['case-studies']),
    items: Object.freeze([
      'Client permission',
      'Verified outcomes',
      'Approved quotations',
      'Approved imagery',
    ]),
    status: 'optional-until-available',
  }),
]);
