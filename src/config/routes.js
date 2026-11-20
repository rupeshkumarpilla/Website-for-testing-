export const ROUTES = {
  home: '/',
  products: '/products',
  about: '/about',
  journal: '/journal',
  useCases: '/use-cases',
  caseStudies: '/case-studies',
  contact: '/contact',
  login: '/login',
  notFound: '/not-found',
};

export const PAGE_TITLES = {
  [ROUTES.home]: 'Home',
  [ROUTES.products]: 'Our Honey',
  [ROUTES.about]: 'Our Story',
  [ROUTES.journal]: 'Honey Journal',
  [ROUTES.useCases]: 'Use Cases',
  [ROUTES.caseStudies]: 'Case Studies',
  [ROUTES.contact]: 'Contact',
  [ROUTES.login]: 'Account access',
};

export const NAV_ITEMS = [
  { label: 'Home', path: ROUTES.home },
  { label: 'Our Honey', path: ROUTES.products },
  { label: 'Our Story', path: ROUTES.about },
  { label: 'Honey Journal', path: ROUTES.journal },
  { label: 'Use Cases', path: ROUTES.useCases },
  { label: 'Case Studies', path: ROUTES.caseStudies },
  { label: 'Contact', path: ROUTES.contact },
];

export function hrefFor(path) {
  return `#${path}`;
}
