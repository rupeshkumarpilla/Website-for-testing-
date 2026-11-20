import { useRef } from 'react';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';

export default function SiteLayout({ path, children }) {
  const mainRef = useRef(null);

  const handleSkip = (event) => {
    event.preventDefault();
    if (mainRef.current) mainRef.current.focus();
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content" onClick={handleSkip}>
        Skip to main content
      </a>
      <SiteHeader path={path} />
      <main id="main-content" className="site-main" ref={mainRef} tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
