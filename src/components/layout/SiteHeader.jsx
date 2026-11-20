import { useEffect, useState } from 'react';
import { SITE } from '../../config/site.js';
import { NAV_ITEMS, hrefFor, ROUTES } from '../../config/routes.js';
import brandMark from '../../assets/brand-mark.svg';

export default function SiteHeader({ path }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href={hrefFor(ROUTES.home)} aria-label={`${SITE.name} home`}>
          <img className="brand__mark" src={brandMark} alt="" aria-hidden="true" />
          <span className="brand__name">{SITE.name}</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-nav${menuOpen ? ' is-open' : ''}`}
          aria-label="Primary navigation"
        >
          <ul className="primary-nav__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <a
                  className={`primary-nav__link${path === item.path ? ' is-active' : ''}`}
                  href={hrefFor(item.path)}
                  aria-current={path === item.path ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
