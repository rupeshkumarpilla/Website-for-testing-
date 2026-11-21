import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = join(projectRoot, 'dist');
const templatePath = join(distRoot, 'index.html');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function outputPathForRoute(route) {
  if (route.path === '/') return join(distRoot, 'index.html');
  return join(distRoot, route.path.replace(/^\//, ''), 'index.html');
}

function metaTag(attribute, name, value, key) {
  return `<meta ${attribute}="${name}" content="${escapeHtml(value)}" data-seo="${key}" />`;
}

function canonicalTag(url) {
  return `<link rel="canonical" href="${escapeHtml(url)}" data-seo="canonical" />`;
}

function replaceSeoTag(html, key, replacement) {
  const pattern = new RegExp(`<[^>]*\\sdata-seo="${key}"[^>]*>`);
  if (!pattern.test(html)) throw new Error(`Missing SEO tag in template: ${key}`);
  return html.replace(pattern, replacement);
}

function buildHtml(template, route, appHtml, seo) {
  const title = escapeHtml(route.documentTitle);
  const routeId = escapeHtml(route.id);

  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  if (html === template) throw new Error(`Missing title tag in template: ${route.id}`);

  html = replaceSeoTag(html, 'description', metaTag('name', 'description', seo.description, 'description'));
  html = replaceSeoTag(html, 'robots', metaTag('name', 'robots', seo.robots, 'robots'));
  html = replaceSeoTag(html, 'canonical', seo.canonical ? canonicalTag(seo.canonical) : '');
  html = replaceSeoTag(html, 'og-title', metaTag('property', 'og:title', seo.ogTitle, 'og-title'));
  html = replaceSeoTag(html, 'og-type', metaTag('property', 'og:type', seo.ogType, 'og-type'));
  html = replaceSeoTag(html, 'og-url', seo.ogUrl ? metaTag('property', 'og:url', seo.ogUrl, 'og-url') : '');
  html = replaceSeoTag(html, 'og-site-name', metaTag('property', 'og:site_name', seo.ogSiteName, 'og-site-name'));
  html = replaceSeoTag(html, 'og-description', metaTag('property', 'og:description', seo.ogDescription, 'og-description'));
  html = replaceSeoTag(html, 'twitter-card', metaTag('name', 'twitter:card', seo.twitterCard, 'twitter-card'));
  html = replaceSeoTag(html, 'twitter-title', metaTag('name', 'twitter:title', seo.twitterTitle, 'twitter-title'));
  html = replaceSeoTag(html, 'twitter-description', metaTag('name', 'twitter:description', seo.twitterDescription, 'twitter-description'));
  html = replaceSeoTag(html, 'twitter-url', seo.twitterUrl ? metaTag('name', 'twitter:url', seo.twitterUrl, 'twitter-url') : '');

  const withRoot = html.replace(
    '<div id="root"></div>',
    `<div id="root" data-route-id="${routeId}">${appHtml}</div>`,
  );
  if (withRoot === html) throw new Error(`Missing root element in template: ${route.id}`);

  return withRoot;
}

async function writeRoute(template, route, renderRoute, seoForRoute, fileName = null) {
  const appHtml = renderRoute(route);
  const seo = seoForRoute(route);
  const html = buildHtml(template, route, appHtml, seo);
  const target = fileName ? join(distRoot, fileName) : outputPathForRoute(route);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
  return target;
}

function sitemapXml(routes, seoForRoute) {
  const entries = routes
    .filter((route) => route.public && !route.queryOnly && route.kind !== 'fallback')
    .map((route) => `  <url>\n    <loc>${escapeHtml(seoForRoute(route).canonical)}</loc>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

const vite = await createServer({
  configFile: join(projectRoot, 'vite.config.js'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
});

try {
  const { renderRoute } = await vite.ssrLoadModule('/entry-server.jsx');
  const { assertRouteManifest, PRERENDER_ROUTES, NOT_FOUND_ROUTE } = await vite.ssrLoadModule('/config/routeManifest.js');
  assertRouteManifest();
  const { seoForRoute, SITEMAP_URL } = await vite.ssrLoadModule('/config/seo.js');
  const template = await readFile(templatePath, 'utf8');

  const written = [];
  for (const route of PRERENDER_ROUTES) {
    written.push(await writeRoute(template, route, renderRoute, seoForRoute));
  }

  written.push(await writeRoute(template, NOT_FOUND_ROUTE, renderRoute, seoForRoute, '404.html'));

  await writeFile(join(distRoot, 'sitemap.xml'), sitemapXml(PRERENDER_ROUTES, seoForRoute), 'utf8');
  await writeFile(
    join(distRoot, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITEMAP_URL}\n`,
    'utf8',
  );

  const routeList = PRERENDER_ROUTES.map((route) => `${route.path} -> ${route.id}`).join('\n');
  process.stdout.write(`Prerendered ${PRERENDER_ROUTES.length} canonical routes plus 404.html, sitemap.xml and robots.txt\n${routeList}\n404.html -> not-found\nsitemap.xml\nrobots.txt\n`);
} finally {
  await vite.close();
}
