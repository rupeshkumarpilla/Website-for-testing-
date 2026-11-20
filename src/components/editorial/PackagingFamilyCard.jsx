import { PACKAGING_BY_ID } from '../../data/packaging.js';
import { PRODUCT_CONFIGURATIONS } from '../../data/products.js';
import { ROUTES, hrefFor } from '../../config/routes.js';
import ProductVisual from '../product/ProductVisual.jsx';

export default function PackagingFamilyCard({ packagingId }) {
  const family = PACKAGING_BY_ID[packagingId];
  if (!family) return null;

  const products = PRODUCT_CONFIGURATIONS.filter((product) => product.packagingId === family.id);
  const firstProduct = products[0];
  const quantity = family.sizes.length > 0
    ? `${family.sizes.length} sizes`
    : `${family.unitCount} × ${family.unitWeightGrams} g`;

  return (
    <article className="packaging-family-card">
      <div className="packaging-family-card__visual">
        <ProductVisual packagingId={family.id} product={firstProduct} label={family.name} />
      </div>
      <div className="packaging-family-card__body">
        <p className="packaging-family-card__eyebrow">{products.length} configurations</p>
        <h3 className="packaging-family-card__title">{family.shortName}</h3>
        <p className="packaging-family-card__quantity">{quantity}</p>
        <p className="packaging-family-card__description">{family.intendedConvenience}</p>
        <a className="packaging-family-card__link" href={hrefFor(`${ROUTES.products}/${family.slug}`)}>
          Explore format <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
