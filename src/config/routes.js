export const ROUTES = {
  home: '/',
  about: '/about',
  contact: '/contact',
  login: '/login',
  notFound: '/not-found',
};

export const PAGE_TITLES = {
  [ROUTES.home]: 'Home',
  [ROUTES.about]: 'About',
  [ROUTES.contact]: 'Contact',
  [ROUTES.login]: 'Account access',
};

export const NAV_ITEMS = [
  { label: 'Home', path: ROUTES.home },
  { label: 'About', path: ROUTES.about },
  { label: 'Contact', path: ROUTES.contact },
];

export function hrefFor(path) {
  return `#${path}`;
}
