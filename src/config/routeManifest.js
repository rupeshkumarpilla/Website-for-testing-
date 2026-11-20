import { FLAVOURS } from '../data/flavours.js';
import { PACKAGING_FAMILIES, PACKAGING_BY_SLUG } from '../data/packaging.js';
import { JOURNAL_ARTICLES } from '../data/editorial.js';
import { getProductConfiguration } from '../data/products.js';
import { SITE } from './site.js';
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
    props: Object.freeze({}),
    ...config,
    props: Object.freeze(config.props ?? {}),
    documentTitle: config.documentTitle ?? makeDocumentTitle(config.title, config.id === 'home'),
  });
}

const STATIC_ROUTES = Object.freeze([
  makeRoute({
    id: 'home',
    path: ROUTES.home,
    title: 'Home',
    component: 'home',
    kind: 'static',
  }),
  makeRoute({
    id: 'products',
    path: ROUTES.products,
    title: 'Our Honey',
    component: 'products',
    kind: 'static',
  }),
  makeRoute({
    id: 'about',
    path: ROUTES.about,
    title: 'Our Story',
    component: 'about',
    kind: 'static',
  }),
  makeRoute({
    id: 'packaging',
    path: ROUTES.packaging,
    title: 'Our Packaging',
    component: 'packaging',
    kind: 'static',
  }),
  makeRoute({
    id: 'journal',
    path: ROUTES.journal,
    title: 'Honey Journal',
    component: 'journal',
    kind: 'static',
  }),
  makeRoute({
    id: 'use-cases',
    path: ROUTES.useCases,
    title: 'Use Cases',
    component: 'use-cases',
    kind: 'static',
  }),
  makeRoute({
    id: 'case-studies',
    path: ROUTES.caseStudies,
    title: 'Case Studies',
    component: 'case-studies',
    kind: 'static',
  }),
  makeRoute({
    id: 'contact',
    path: ROUTES.contact,
    title: 'Contact',
    component: 'contact',
    kind: 'static',
  }),
  makeRoute({
    id: 'login',
    path: ROUTES.login,
    title: 'Login',
    component: 'login',
    kind: 'application',
    public: false,
  }),
]);

const PACKAGING_ROUTES = Object.freeze(
  PACKAGING_FAMILIES.map((family) => makeRoute({
    id: `product-family-${family.id}`,
    path: `${ROUTES.products}/${family.slug}`,
    title: family.name,
    component: 'products',
    kind: 'product-family',
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
