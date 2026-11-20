import { SITE } from '../../config/site.js';
import { NAV_ITEMS, ROUTES, hrefFor } from '../../config/routes.js';
import brandMark from '../../assets/brand-mark.svg';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand-wrap">
          <img className="site-footer__mark" src={brandMark} alt="" aria-hidden="true" />
          <p className="site-footer__brand">{SITE.name}</p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="site-footer__links">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <a href={hrefFor(item.path)}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href={hrefFor(ROUTES.login)}>Account access</a>
            </li>
          </ul>
        </nav>
        <p className="site-footer__note">Company details pending approval.</p>
      </div>
    </footer>
  );
}
