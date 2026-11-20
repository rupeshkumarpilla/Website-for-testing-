import { normalizeSitePathname, replaceLocationUrl, sitePathFromPathname } from '../config/basePath.js';
import {
  getProductDetailRoute,
  getRoutePublicPath,
  resolveLegacyPath,
  resolveSiteRoute,
} from '../config/routeManifest.js';

function readLegacyHashPath() {
  const hash = window.location.hash;
  if (!hash.startsWith('#/')) return null;
  return hash.slice(1).split('?')[0];
}

export function resolveBrowserRoute() {
  const legacyPath = readLegacyHashPath();
  if (legacyPath) {
    const legacyRoute = resolveLegacyPath(legacyPath);
    replaceLocationUrl(getRoutePublicPath(legacyRoute));
    if (legacyRoute.id === 'not-found') return resolveSiteRoute('/');
    return legacyRoute;
  }

  const sitePath = sitePathFromPathname(window.location.pathname);
  const productId = new URLSearchParams(window.location.search).get('product');

  if (productId && normalizeSitePathname(sitePath) === '/products/') {
    const productRoute = getProductDetailRoute(productId);
    if (productRoute.id !== 'not-found') return productRoute;
  }

  return resolveSiteRoute(sitePath);
}
