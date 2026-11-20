import { useEffect } from 'react';
import SiteLayout from './components/layout/SiteLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import JournalPage from './pages/JournalPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import FlavourPage from './pages/FlavourPage.jsx';
import PackagingPage from './pages/PackagingPage.jsx';
import UseCasesPage from './pages/UseCasesPage.jsx';
import CaseStudiesPage from './pages/CaseStudiesPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { useAppRoute } from './utils/useAppRoute.js';

const PAGES = {
  home: HomePage,
  products: ProductsPage,
  'product-detail': ProductDetailPage,
  about: AboutPage,
  packaging: PackagingPage,
  flavour: FlavourPage,
  journal: JournalPage,
  article: ArticlePage,
  'use-cases': UseCasesPage,
  'case-studies': CaseStudiesPage,
  contact: ContactPage,
  login: LoginPage,
  'not-found': NotFoundPage,
};

export default function App({ initialRoute }) {
  const route = useAppRoute(initialRoute);
  const Page = PAGES[route.component] ?? NotFoundPage;

  useEffect(() => {
    document.title = route.documentTitle;
    const root = document.getElementById('root');
    if (root) root.dataset.routeId = route.id;
    window.scrollTo(0, 0);
  }, [route.id, route.path, route.documentTitle]);

  return (
    <SiteLayout path={route.path}>
      <Page {...route.props} />
    </SiteLayout>
  );
}
