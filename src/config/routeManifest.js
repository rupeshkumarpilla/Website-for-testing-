import { FLAVOURS } from '../data/flavours.js';
import { PACKAGING_FAMILIES, PACKAGING_BY_SLUG } from '../data/packaging.js';
import { EDITORIAL_SUMMARY, JOURNAL_ARTICLES } from '../data/editorial.js';
import { CATALOGUE_SUMMARY, getProductConfiguration } from '../data/products.js';
import { SITE } from './site.js';
import { BRAND_IDENTITY, COMPANY_CONTENT } from './content.js';
import { hrefFor, normalizeSitePathname } from './basePath.js';

export const ROUTES = Object.freeze({
  home: '/',
  products: '/products',
  about: '/about',
  journal: '/journal',
  useCases: '/use-cases',
  caseStudies: '/case-studies',
  contact: '/contact',
  login: '/login',
  packaging: '/packaging',
  flavours: '/flavours',
  notFound: '/not-found',
});

function makeDocumentTitle(title, home = false) {
  if (home) return `${SITE.name} | Home`;
  return `${title} | ${SITE.name}`;
}

function makeRoute(config) {
  return Object.freeze({
    prerender: true,
    public: true,
    queryOnly: false,
    ...config,
    props: Object.freeze(config.props ?? {}),
    documentTitle: config.documentTitle ?? makeDocumentTitle(config.title, config.id === 'home'),
    seoDescription: config.seoDescription ?? SITE.description,
  });
}

const STATIC_SEO_DESCRIPTIONS = Object.freeze({
  home: BRAND_IDENTITY.positioning,
  products: `Explore ${CATALOGUE_SUMMARY.totalConfigurations} flavour and packaging configurations across glass jars, honey sticks and portion packs.`,
  about: COMPANY_CONTENT.about,
  packaging: 'Compare the confirmed HONIESH packaging families. Visuals are concept presentations while final packaging photography is pending.',
  journal: 'A growing set of short articles about honey characteristics, storage questions, packaging formats and everyday use.',
  'use-cases': `${EDITORIAL_SUMMARY.useCaseCount} proposed application areas for HONIESH formats. Each one is framed as a use context to discuss, not as a confirmed customer, partnership or placement.`,
  'case-studies': `No customer case studies are claimed. This page presents ${EDITORIAL_SUMMARY.caseStudyCount} illustrative frameworks showing how verified client contexts, permissions and outcomes can be added later.`,
  contact: 'Choose an enquiry path, review the product information you need, and use the form below. No submission is claimed until a real form provider or contact destination is connected.',
  login: 'Account access is a placeholder in this frontend-only build.',
  'not-found': 'The page you requested does not exist.',
});

const STATIC_ROUTES = Object.freeze([
  makeRoute({
    id: 'home',
    path: ROUTES.home,
    title: 'Home',
    component: 'home',
    kind: 'static',
    documentTitle: `${SITE.name} — ${BRAND_IDENTITY.tagline}`,
    seoDescription: STATIC_SEO_DESCRIPTIONS.home,
  }),
  makeRoute({
    id: 'products',
    path: ROUTES.products,
    title: 'Our Honey',
    component: 'products',
    kind: 'static',
    seoDescription: STATIC_SEO_DESCRIPTIONS.products,
  }),
  makeRoute({
    id: 'about',
    path: ROUTES.about,
    title: 'Our Story',
    component: 'about',
    kind: 'static',
    seoDescription: STATIC_SEO_DESCRIPTIONS.about,
  }),
  makeRoute({
    id: 'packaging',
    path: ROUTES.packaging,
    title: 'Our Packaging',
    component: 'packaging',
    kind: 'static',
    seoDescription: STATIC_SEO_DESCRIPTIONS.packaging,
  }),
  makeRoute({
    id: 'journal',
    path: ROUTES.journal,
    title: 'Honey Journal',
    component: 'journal',
    kind: 'static',
    seoDescription: STATIC_SEO_DESCRIPTIONS.journal,
  }),
  makeRoute({
    id: 'use-cases',
    path: ROUTES.useCases,
    title: 'Use Cases',
    component: 'use-cases',
    kind: 'static',
    seoDescription: STATIC_SEO_DESCRIPTIONS['use-cases'],
  }),
  makeRoute({
    id: 'case-studies',
    path: ROUTES.caseStudies,
    title: 'Case Studies',
    component: 'case-studies',
    kind: 'static',
    seoDescription: STATIC_SEO_DESCRIPTIONS['case-studies'],
  }),
  makeRoute({
    id: 'contact',
    path: ROUTES.contact,
    title: 'Contact',
    component: 'contact',
    kind: 'static',
    seoDescription: STATIC_SEO_DESCRIPTIONS.contact,
  }),
  makeRoute({
    id: 'login',
    path: ROUTES.login,
    title: 'Login',
    component: 'login',
    kind: 'application',
    public: false,
    seoDescription: STATIC_SEO_DESCRIPTIONS.login,
  }),
]);

const PACKAGING_ROUTES = Object.freeze(
  PACKAGING_FAMILIES.map((family) => makeRoute({
    id: `product-family-${family.id}`,
    path: `${ROUTES.products}/${family.slug}`,
    title: family.name,
    component: 'products',
    kind: 'product-family',
    seoDescription: family.intendedConvenience,
    props: { packagingId: family.id },
  })),
);

const FLAVOUR_ROUTES = Object.freeze(
  FLAVOURS.map((flavour) => makeRoute({
    id: `flavour-${flavour.id}`,
    path: `${ROUTES.flavours}/${flavour.slug}`,
    title: `${flavour.name} Honey Concept`,
    component: 'flavour',
    kind: 'flavour',
    seoDescription: flavour.description,
    props: { flavourSlug: flavour.slug },
  })),
);

const ARTICLE_ROUTES = Object.freeze(
  JOURNAL_ARTICLES.map((article) => makeRoute({
    id: `article-${article.slug}`,
    path: `${ROUTES.journal}/${article.slug}`,
    title: article.title,
    component: 'article',
    kind: 'article',
    seoDescription: article.summary,
    props: { articleSlug: article.slug },
  })),
);

const NOT_FOUND_ROUTE = makeRoute({
  id: 'not-found',
  path: ROUTES.notFound,
  title: 'Page not found',
  component: 'not-found',
  kind: 'fallback',
  public: false,
  prerender: false,
  seoDescription: STATIC_SEO_DESCRIPTIONS['not-found'],
});

const PRODUCT_DETAIL_ROUTE = makeRoute({
  id: 'product-detail',
  path: ROUTES.products,
  title: 'Product detail',
  component: 'product-detail',
  kind: 'product-detail',
  public: false,
  prerender: false,
  queryOnly: true,
});

export const ROUTE_MANIFEST = Object.freeze([
  ...STATIC_ROUTES,
  ...PACKAGING_ROUTES,
  ...FLAVOUR_ROUTES,
  ...ARTICLE_ROUTES,
  PRODUCT_DETAIL_ROUTE,
  NOT_FOUND_ROUTE,
]);

export const PRERENDER_ROUTES = Object.freeze(
  ROUTE_MANIFEST.filter((route) => route.prerender),
);

export function assertRouteManifest() {
  if (!Array.isArray(ROUTE_MANIFEST) || ROUTE_MANIFEST.length === 0) {
    throw new Error('Route manifest must be a non-empty array.');
  }

  const ids = new Set();
  const paths = new Set();

  ROUTE_MANIFEST.forEach((route) => {
    if (route === null || typeof route !== 'object' || Array.isArray(route)) {
      throw new Error('Every route manifest entry must be an object.');
    }

    for (const field of ['id', 'path', 'title', 'component', 'kind']) {
      if (typeof route[field] !== 'string' || route[field].trim() === '') {
        throw new Error(`Route field "${field}" must be a non-empty string.`);
      }
    }

    for (const flag of ['prerender', 'public', 'queryOnly']) {
      if (typeof route[flag] !== 'boolean') {
        throw new Error(`Route "${route.id}" flag "${flag}" must be a boolean.`);
      }
    }

    if (ids.has(route.id)) {
      throw new Error(`Duplicate route id: ${route.id}`);
    }
    ids.add(route.id);

    if (!route.queryOnly && route.kind !== 'fallback') {
      const path = normalizeSitePathname(route.path);
      if (paths.has(path)) {
        throw new Error(`Duplicate route path: ${path}`);
      }
      paths.add(path);
    }
  });

  const fallbackRoutes = ROUTE_MANIFEST.filter((route) => route.kind === 'fallback');
  if (fallbackRoutes.length !== 1 || fallbackRoutes[0].id !== 'not-found') {
    throw new Error('Route manifest must contain exactly one fallback route with id "not-found".');
  }

  const queryOnlyRoutes = ROUTE_MANIFEST.filter((route) => route.queryOnly);
  if (queryOnlyRoutes.length !== 1 || queryOnlyRoutes[0].id !== 'product-detail') {
    throw new Error('Route manifest must contain exactly one query-only route with id "product-detail".');
  }

  if (PRERENDER_ROUTES.some((route) => route.prerender !== true)) {
    throw new Error('PRERENDER_ROUTES contains a route that is not marked for prerendering.');
  }
}

export const NOT_FOUND_ROUTE_EXPORT = NOT_FOUND_ROUTE;

const ROUTE_BY_PATH = Object.freeze(
  ROUTE_MANIFEST.reduce((routes, route) => {
    if (route.queryOnly || route.kind === 'fallback') return routes;
    routes[normalizeSitePathname(route.path)] = route;
    return routes;
  }, {}),
);

const NAVIGATION_IDS = [
  'home',
  'products',
  'about',
  'journal',
  'use-cases',
  'case-studies',
  'contact',
];

export const NAV_ITEMS = Object.freeze(
  NAVIGATION_IDS.map((id) => {
    const route = ROUTE_BY_PATH[normalizeSitePathname(
      STATIC_ROUTES.find((item) => item.id === id).path,
    )];
    return Object.freeze({ label: route.title, path: route.path });
  }),
);

export const PAGE_TITLES = Object.freeze(
  ROUTE_MANIFEST.reduce((titles, route) => {
    if (!route.queryOnly && route.kind !== 'fallback') titles[route.path] = route.title;
    return titles;
  }, {}),
);

export function resolveSiteRoute(path) {
  const [pathname] = String(path ?? '/').split('?');
  const normalized = normalizeSitePathname(pathname);
  return ROUTE_BY_PATH[normalized] ?? NOT_FOUND_ROUTE;
}

export function productDetailPath(productId) {
  return `${ROUTES.products}?product=${encodeURIComponent(productId)}`;
}

export function productDetailHref(productId) {
  const [path, search] = productDetailPath(productId).split('?');
  return hrefFor(`${path}?${search}`);
}

export function getProductDetailRoute(productId) {
  const product = getProductConfiguration(productId);
  if (!product) return NOT_FOUND_ROUTE;

  return makeRoute({
    id: `product-detail-${product.id}`,
    path: ROUTES.products,
    cleanPath: productDetailPath(product.id),
    title: product.displayName,
    component: 'product-detail',
    kind: 'product-detail',
    public: false,
    prerender: false,
    queryOnly: true,
    props: { productId: product.id },
  });
}

export function resolveLegacyPath(path) {
  const [pathname] = String(path ?? '/').split('?');
  const normalized = normalizeSitePathname(pathname);
  const direct = ROUTE_BY_PATH[normalized];
  if (direct) return direct;

  const productMatch = normalized.match(/^\/products\/([^/]+)\/$/);
  if (productMatch) {
    const segment = productMatch[1];
    if (getProductConfiguration(segment)) return getProductDetailRoute(segment);

    const family = PACKAGING_BY_SLUG[segment];
    if (family) {
      return ROUTE_BY_PATH[normalizeSitePathname(`${ROUTES.products}/${family.slug}`)]
        ?? NOT_FOUND_ROUTE;
    }
  }

  return NOT_FOUND_ROUTE;
}

export function getRoutePublicPath(route) {
  if (!route || route.id === 'not-found') return ROUTES.home;
  return route.cleanPath ?? route.path;
}

export { NOT_FOUND_ROUTE };
