import { useEffect } from 'react';
import SiteLayout from './components/layout/SiteLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import JournalPage from './pages/JournalPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import UseCasesPage from './pages/UseCasesPage.jsx';
import CaseStudiesPage from './pages/CaseStudiesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { PAGE_TITLES, ROUTES } from './config/routes.js';
import { SITE } from './config/site.js';
import { PACKAGING_BY_SLUG } from './data/packaging.js';
import { JOURNAL_ARTICLE_BY_SLUG } from './data/editorial.js';
import { getProductConfiguration } from './data/products.js';
import { useHashRoute } from './utils/useHashRoute.js';

const PAGES = {
  [ROUTES.home]: HomePage,
  [ROUTES.products]: ProductsPage,
  [ROUTES.about]: AboutPage,
  [ROUTES.journal]: JournalPage,
  [ROUTES.useCases]: UseCasesPage,
  [ROUTES.caseStudies]: CaseStudiesPage,
  [ROUTES.contact]: ContactPage,
  [ROUTES.login]: LoginPage,
};

function resolveRoute(path) {
  const DirectPage = PAGES[path];
  if (DirectPage) {
    return {
      Page: DirectPage,
      pageProps: {},
      title: PAGE_TITLES[path] || 'Page not found',
    };
  }

  if (path.startsWith(`${ROUTES.journal}/`)) {
    const segment = path.slice(ROUTES.journal.length + 1);
    const article = JOURNAL_ARTICLE_BY_SLUG[segment];

    if (article) {
      return {
        Page: ArticlePage,
        pageProps: { articleSlug: segment },
        title: article.title,
      };
    }
  }

  if (path.startsWith(`${ROUTES.products}/`)) {
    const segment = path.slice(ROUTES.products.length + 1);
    const product = getProductConfiguration(segment);

    if (product) {
      return {
        Page: ProductDetailPage,
        pageProps: { productId: segment },
        title: product.displayName,
      };
    }

    const family = PACKAGING_BY_SLUG[segment];
    if (family) {
      return {
        Page: ProductsPage,
        pageProps: { packagingId: family.id },
        title: family.name,
      };
    }
  }

  return {
    Page: NotFoundPage,
    pageProps: {},
    title: PAGE_TITLES[ROUTES.notFound] || 'Page not found',
  };
}

export default function App() {
  const path = useHashRoute();
  const { Page, pageProps, title } = resolveRoute(path);

  useEffect(() => {
    document.title = `${title} | ${SITE.name}`;
    window.scrollTo(0, 0);
  }, [path, title]);

  return (
    <SiteLayout path={path}>
      <Page {...pageProps} />
    </SiteLayout>
  );
}
