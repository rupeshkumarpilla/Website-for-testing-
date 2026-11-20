export const BASE_PATH = '/Website-for-testing-/';

function normalizePathname(pathname) {
  const raw = typeof pathname === 'string' ? pathname.trim() : '';
  if (!raw || raw === '/') return '/';
  return `/${raw.replace(/^\/+/, '').replace(/\/+$/, '')}/`;
}

export function normalizeSitePathname(pathname) {
  return normalizePathname(pathname);
}

export function withBasePath(pathname = '/') {
  const normalized = normalizePathname(pathname);
  if (normalized === '/') return BASE_PATH;
  return `${BASE_PATH}${normalized.slice(1)}`;
}

export function hrefFor(path = '/') {
  const value = typeof path === 'string' ? path : '/';
  const queryIndex = value.indexOf('?');
  const pathname = queryIndex === -1 ? value : value.slice(0, queryIndex);
  const search = queryIndex === -1 ? '' : value.slice(queryIndex + 1);
  const baseHref = withBasePath(pathname);
  return search ? `${baseHref}?${search}` : baseHref;
}

export function legacyHref(value) {
  if (typeof value !== 'string') return value;
  if (value.startsWith('#/')) return hrefFor(value.slice(1));
  return value;
}

export function sitePathFromPathname(pathname = '/') {
  const current = typeof pathname === 'string' ? pathname : '/';
  const prefix = BASE_PATH.replace(/\/$/, '');

  if (current === prefix || current === `${prefix}/`) return '/';
  if (current.startsWith(`${prefix}/`)) {
    return normalizePathname(current.slice(prefix.length));
  }

  return normalizePathname(current);
}

function replaceUrl(path) {
  window.history.replaceState(window.history.state, '', hrefFor(path));
}

function pushUrl(path) {
  window.history.pushState({}, '', hrefFor(path));
}

function emitRouteChange() {
  const event = typeof PopStateEvent === 'function'
    ? new PopStateEvent('popstate')
    : new Event('popstate');
  window.dispatchEvent(event);
}

export function replaceLocationUrl(path) {
  replaceUrl(path);
}

export function navigateTo(path) {
  pushUrl(path);
  emitRouteChange();
}
