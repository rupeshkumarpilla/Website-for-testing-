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

function buildHtml(template, route, appHtml) {
  const title = escapeHtml(route.documentTitle);
  const routeId = escapeHtml(route.id);

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-route-id="${routeId}">${appHtml}</div>`,
    );
}

async function writeRoute(template, route, renderRoute, fileName = null) {
  const appHtml = renderRoute(route);
  const html = buildHtml(template, route, appHtml);
  const target = fileName ? join(distRoot, fileName) : outputPathForRoute(route);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html, 'utf8');
  return target;
}

const vite = await createServer({
  configFile: join(projectRoot, 'vite.config.js'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'warn',
});

try {
  const { renderRoute } = await vite.ssrLoadModule('/entry-server.jsx');
  const { PRERENDER_ROUTES, NOT_FOUND_ROUTE } = await vite.ssrLoadModule('/config/routeManifest.js');
  const template = await readFile(templatePath, 'utf8');

  const written = [];
  for (const route of PRERENDER_ROUTES) {
    written.push(await writeRoute(template, route, renderRoute));
  }

  written.push(await writeRoute(template, NOT_FOUND_ROUTE, renderRoute, '404.html'));

  const routeList = PRERENDER_ROUTES.map((route) => `${route.path} -> ${route.id}`).join('\n');
  process.stdout.write(`Prerendered ${PRERENDER_ROUTES.length} canonical routes plus 404.html\n${routeList}\n404.html -> not-found\n`);
} finally {
  await vite.close();
}
