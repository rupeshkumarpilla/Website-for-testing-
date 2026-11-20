import { FLAVOUR_BY_ID } from '../../data/flavours.js';
import { ROUTES, hrefFor } from '../../config/routes.js';
import brandMark from '../../assets/brand-mark.svg';
import ProductVisual from './ProductVisual.jsx';

export default function ProductCard({ product }) {
  const flavour = FLAVOUR_BY_ID[product.flavourId];
  const quantity = product.sizeId
    ? product.sizeLabel
    : `${product.unitCount} × ${product.unitWeightGrams} g`;
  const showNetContent = product.netContent.label !== quantity;
  const style = {
    '--product-accent': flavour.accentColor,
    '--product-accent-soft': flavour.accentSoft,
  };

  return (
    <article className="product-card" data-configuration-key={product.configurationKey} style={style}>
      <div className="product-card__visual">
        <ProductVisual packagingId={product.packagingId} product={product} label={product.displayName} />
      </div>
      <div className="product-card__body">
        <div className="product-card__brand">
          <img src={brandMark} alt="" aria-hidden="true" />
          <span>HONIESH</span>
        </div>
        <p className="product-card__flavour">Flavour concept · {flavour.name}</p>
        <h3 className="product-card__title">{product.displayName}</h3>
        <dl className="product-card__specs">
          <div>
            <dt>Packaging</dt>
            <dd>{product.format}</dd>
          </div>
          <div>
            <dt>{product.sizeId ? 'Size' : 'Pack'}</dt>
            <dd>{quantity}</dd>
          </div>
          {showNetContent && (
            <div>
              <dt>Net content</dt>
              <dd>{product.netContent.label}</dd>
            </div>
          )}
        </dl>
        <p className="product-card__description">{product.shortDescription}</p>
        <a
          className="button button--secondary product-card__action"
          href={hrefFor(`${ROUTES.products}/${product.id}`)}
        >
          View product
        </a>
      </div>
    </article>
  );
}
