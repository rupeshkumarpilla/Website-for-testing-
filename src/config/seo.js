import { SITE } from './site.js';
import { hrefFor } from './basePath.js';

export function seoUrlForRoute(route) {
  if (!route) return null;
  return `${SITE.origin}${hrefFor(route.cleanPath ?? route.path)}`;
}

export const SITEMAP_URL = `${SITE.origin}${hrefFor('/')}sitemap.xml`;

export function seoForRoute(route) {
  if (!route) return null;
  const indexable = route.public === true && !route.queryOnly && route.kind !== 'fallback';
  const url = seoUrlForRoute(route);
  const title = route.documentTitle ?? SITE.name;
  const description = route.seoDescription ?? SITE.description;
  return Object.freeze({
    indexable,
    title,
    description,
    canonical: indexable ? url : null,
    robots: indexable ? 'index,follow' : 'noindex,follow',
    ogTitle: title,
    ogType: route.kind === 'article' ? 'article' : 'website',
    ogUrl: indexable ? url : null,
    ogSiteName: SITE.name,
    ogDescription: description,
    twitterCard: 'summary',
    twitterTitle: title,
    twitterDescription: description,
    twitterUrl: indexable ? url : null,
  });
}
