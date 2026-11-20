import { FLAVOUR_PATHS, FLAVOURS } from '../data/flavours.js';
import { PACKAGING_FAMILIES, PACKAGING_PATHS } from '../data/packaging.js';
import { JOURNAL_ARTICLES } from '../data/editorial.js';
import { CATALOGUE_SUMMARY } from '../data/products.js';

export const URL_ARCHITECTURE = Object.freeze({
  currentRuntimeMode: 'hash',
  targetMode: 'pre-rendered-static-paths',
  repositoryBase: '/Website-for-testing-/',
  implementationStage: 'D',
  rule: 'Public content URLs should become crawlable static HTML pages in Stage D; hash routing remains the current runtime until then.',
});

export const SITE_SECTIONS = Object.freeze([
  Object.freeze({
    id: 'home',
    label: 'Home',
    path: '/',
    currentHashPath: '/',
    status: 'available',
    parentId: null,
    navigation: Object.freeze({ header: true, footer: true }),
    purpose: 'Introduce HONIESH as a honey brand and route visitors into product, story and enquiry areas.',
  }),
  Object.freeze({
    id: 'our-story',
    label: 'Our Story',
    path: '/about/',
    currentHashPath: '/about',
    status: 'available',
    parentId: null,
    navigation: Object.freeze({ header: true, footer: true }),
    purpose: 'Present the approved HONIESH brand identity, mission, vision, values and philosophy-based brand story.',
  }),
  Object.freeze({
    id: 'our-honey',
    label: 'Our Honey',
    path: '/products/',
    currentHashPath: '/products',
    status: 'available',
    parentId: null,
    navigation: Object.freeze({ header: true, footer: true }),
    purpose: `Product discovery across ${CATALOGUE_SUMMARY.totalConfigurations} configured variants with flavour, packaging and size filters.`,
  }),
  ...PACKAGING_FAMILIES.map((family) => Object.freeze({
    id: `product-${family.id}`,
    label: family.name,
    path: PACKAGING_PATHS[family.id],
    currentHashPath: null,
    status: 'planned',
    parentId: 'our-honey',
    navigation: Object.freeze({ header: false, footer: false }),
    purpose: `Explain the ${family.name} format using confirmed specifications and concept visuals.`,
  })),
  ...FLAVOURS.map((flavour) => Object.freeze({
    id: `flavour-${flavour.id}`,
    label: flavour.name,
    path: FLAVOUR_PATHS[flavour.id],
    currentHashPath: null,
    status: 'planned',
    parentId: 'our-honey',
    navigation: Object.freeze({ header: false, footer: false }),
    purpose: `Present the ${flavour.name} concept across packaging families while formulation details remain unconfirmed.`,
  })),
  Object.freeze({
    id: 'packaging',
    label: 'Our Packaging',
    path: '/packaging/',
    currentHashPath: null,
    status: 'planned',
    parentId: null,
    navigation: Object.freeze({ header: false, footer: false }),
    purpose: 'Compare the three packaging families, their confirmed quantities and their intended convenience.',
  }),
  Object.freeze({
    id: 'journal',
    label: 'Honey Journal',
    path: '/journal/',
    currentHashPath: '/journal',
    status: 'available-with-placeholders',
    parentId: null,
    navigation: Object.freeze({ header: true, footer: true }),
    purpose: 'Host original, sourced honey education and packaging insight articles with explicit draft status.',
  }),
  ...JOURNAL_ARTICLES.map((article) => Object.freeze({
    id: `article-${article.id}`,
    label: article.title,
    path: `/journal/${article.slug}/`,
    currentHashPath: `/journal/${article.slug}`,
    status: 'available-with-placeholders',
    parentId: 'journal',
    navigation: Object.freeze({ header: false, footer: false }),
    purpose: article.summary,
  })),
  Object.freeze({
    id: 'use-cases',
    label: 'Use Cases',
    path: '/use-cases/',
    currentHashPath: '/use-cases',
    status: 'available-with-placeholders',
    parentId: null,
    navigation: Object.freeze({ header: true, footer: true }),
    purpose: 'Explain proposed applications for HONIESH formats without claiming confirmed partnerships.',
  }),
  Object.freeze({
    id: 'case-studies',
    label: 'Case Studies',
    path: '/case-studies/',
    currentHashPath: '/case-studies',
    status: 'available-with-placeholders',
    parentId: null,
    navigation: Object.freeze({ header: true, footer: true }),
    purpose: 'Provide an editorial framework ready for real customer case studies, with no invented results.',
  }),
  Object.freeze({
    id: 'contact',
    label: 'Contact',
    path: '/contact/',
    currentHashPath: '/contact',
    status: 'available-with-placeholders',
    parentId: null,
    navigation: Object.freeze({ header: true, footer: true }),
    purpose: 'Provide honest product, retail, hospitality and bulk enquiry paths without fake submission claims.',
  }),
  Object.freeze({
    id: 'account-access',
    label: 'Account access',
    path: null,
    currentHashPath: '/login',
    status: 'legacy-placeholder',
    parentId: null,
    navigation: Object.freeze({ header: false, footer: true }),
    purpose: 'Existing frontend-only login placeholder retained until a real authentication decision is made.',
  }),
  Object.freeze({
    id: 'not-found',
    label: 'Not Found',
    path: null,
    currentHashPath: '/not-found',
    status: 'available',
    parentId: null,
    navigation: Object.freeze({ header: false, footer: false }),
    purpose: 'Provide a clear fallback for unknown URLs.',
  }),
]);

export const PRIMARY_NAVIGATION = Object.freeze(
  SITE_SECTIONS.filter((section) => section.navigation.header).map((section) => Object.freeze({
    id: section.id,
    label: section.label,
    path: section.path,
    currentHashPath: section.currentHashPath,
    status: section.status,
  })),
);

export const FOOTER_NAVIGATION = Object.freeze(
  SITE_SECTIONS.filter((section) => section.navigation.footer).map((section) => Object.freeze({
    id: section.id,
    label: section.label,
    path: section.path,
    currentHashPath: section.currentHashPath,
    status: section.status,
  })),
);

export const PAGE_BLUEPRINTS = Object.freeze({
  home: Object.freeze({
    sectionId: 'home',
    blocks: Object.freeze([
      'premium-hero',
      'brand-statement',
      'featured-five-flavour-collection',
      'packaging-families',
      'product-discovery',
      'story-preview',
      'journal-highlights',
      'use-case-and-case-study-highlights',
      'enquiry-cta',
    ]),
    contentRequirements: Object.freeze([
      'Approved short brand statement',
      'Final packaging imagery or approved concept illustrations',
      'Confirmed flavour descriptions',
    ]),
  }),
  'our-honey': Object.freeze({
    sectionId: 'our-honey',
    blocks: Object.freeze([
      'flavour-filter',
      'packaging-family-filter',
      'glass-jar-size-filter',
      'product-card-grid',
      'packaging-comparison',
      'enquiry-cta',
    ]),
    contentRequirements: Object.freeze([
      'Final product imagery',
      'Confirmed formulation details',
      'Approved category descriptions',
    ]),
  }),
  packaging: Object.freeze({
    sectionId: 'packaging',
    blocks: Object.freeze([
      'glass-jar-presentation',
      'honey-stick-presentation',
      'portion-pack-presentation',
      'format-comparison',
    ]),
    contentRequirements: Object.freeze([
      'Final packaging photography or approved illustrations',
      'Approved packaging copy review',
    ]),
  }),
  'our-story': Object.freeze({
    sectionId: 'our-story',
    blocks: Object.freeze([
      'approved-brand-identity',
      'approved-mission',
      'approved-vision',
      'approved-values',
      'brand-personality',
      'product-philosophy',
      'story-boundaries',
    ]),
    contentRequirements: Object.freeze([
      'Approved tagline and brand essence',
      'Approved mission and vision',
      'Approved values and personality',
      'Confirmed product specifications',
      'Final packaging imagery and formulation details',
    ]),
  }),
  journal: Object.freeze({
    sectionId: 'journal',
    blocks: Object.freeze([
      'featured-articles',
      'article-index',
      'topic-navigation',
      'related-product-links',
    ]),
    contentRequirements: Object.freeze([
      'Authored article bodies',
      'Author details',
      'Publication dates',
      'Verified external sources',
      'Useful illustrations',
    ]),
  }),
  'use-cases': Object.freeze({
    sectionId: 'use-cases',
    blocks: Object.freeze([
      'application-categories',
      'format-suitability',
      'proposed-use-disclosure',
      'business-enquiry-cta',
    ]),
    contentRequirements: Object.freeze([
      'Confirmed business applications',
      'Approved images for each context',
    ]),
  }),
  'case-studies': Object.freeze({
    sectionId: 'case-studies',
    blocks: Object.freeze([
      'illustrative-framework',
      'future-case-study-template',
      'business-enquiry-cta',
    ]),
    contentRequirements: Object.freeze([
      'Real client permission',
      'Verified outcomes',
      'Approved quotations',
      'Approved case-study imagery',
    ]),
  }),
  contact: Object.freeze({
    sectionId: 'contact',
    blocks: Object.freeze([
      'individual-product-enquiry',
      'retail-distribution-enquiry',
      'hospitality-enquiry',
      'bulk-business-enquiry',
      'contact-details',
    ]),
    contentRequirements: Object.freeze([
      'Approved email address',
      'Approved phone number',
      'Approved business address if required',
      'Approved form provider or contact destination',
    ]),
  }),
});

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

const SITE_SECTION_BY_ID = Object.fromEntries(
  SITE_SECTIONS.map((section) => [section.id, section]),
);

export function getSiteSection(id) {
  return SITE_SECTION_BY_ID[id] ?? null;
}

export function getChildSections(parentId) {
  return SITE_SECTIONS.filter((section) => section.parentId === parentId);
}
