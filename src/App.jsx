import { useEffect } from 'react';
import SiteLayout from './components/layout/SiteLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { PAGE_TITLES, ROUTES } from './config/routes.js';
import { SITE } from './config/site.js';
import { useHashRoute } from './utils/useHashRoute.js';

const PAGES = {
  [ROUTES.home]: HomePage,
  [ROUTES.about]: AboutPage,
  [ROUTES.contact]: ContactPage,
  [ROUTES.login]: LoginPage,
};

export default function App() {
  const path = useHashRoute();
  const Page = PAGES[path] || NotFoundPage;
  const title = PAGE_TITLES[path] || 'Page not found';

  useEffect(() => {
    document.title = `${title} | ${SITE.name}`;
    window.scrollTo(0, 0);
  }, [path, title]);

  return (
    <SiteLayout path={path}>
      <Page />
    </SiteLayout>
  );
}
