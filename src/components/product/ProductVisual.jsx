import { getProductVisual } from '../../data/productVisuals.js';

export default function ProductVisual({ packagingId, label, large = false, className = '' }) {
  const visual = getProductVisual(packagingId);
  const classes = ['product-visual'];

  if (large) classes.push('product-visual--large');
  if (className) classes.push(className);

  const alt = label ? `${label}: ${visual.alt}` : visual.alt;

  return (
    <figure className={classes.join(' ')}>
      <div className="product-visual__frame">
        <img
          className="product-visual__image"
          src={visual.src}
          alt={alt}
          loading={large ? 'eager' : 'lazy'}
        />
        <span className="product-visual__badge">Concept illustration</span>
      </div>
      <figcaption className="product-visual__caption">{visual.caption}</figcaption>
    </figure>
  );
}
