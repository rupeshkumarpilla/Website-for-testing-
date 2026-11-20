import { FLAVOUR_BY_ID } from '../../data/flavours.js';
import { PRODUCT_CONFIGURATIONS } from '../../data/products.js';
import { ROUTES, hrefFor } from '../../config/routes.js';

export default function FlavourConceptCard({ flavourId }) {
  const flavour = FLAVOUR_BY_ID[flavourId];
  if (!flavour) return null;

  const configurations = PRODUCT_CONFIGURATIONS.filter((product) => product.flavourId === flavour.id);
  const firstProduct = configurations[0];

  return (
    <article
      className="flavour-concept-card"
      style={{ '--product-accent': flavour.accentColor, '--product-accent-soft': flavour.accentSoft }}
    >
      <div className="flavour-concept-card__top">
        <span className="flavour-concept-card__dot" aria-hidden="true" />
        <span>{configurations.length} configurations</span>
      </div>
      <h3 className="flavour-concept-card__title">{flavour.name}</h3>
      <p className="flavour-concept-card__description">{flavour.description}</p>
      <p className="flavour-concept-card__note">Formulation pending confirmation.</p>
      {firstProduct && (
        <a className="flavour-concept-card__link" href={hrefFor(`${ROUTES.products}/${firstProduct.id}`)}>
          View concept <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  );
}
