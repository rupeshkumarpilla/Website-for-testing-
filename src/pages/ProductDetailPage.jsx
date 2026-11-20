import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Button from '../components/ui/Button.jsx';
import ProductVisual from '../components/product/ProductVisual.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import ProductVariantSelector from '../components/product/ProductVariantSelector.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import { FLAVOUR_BY_ID } from '../data/flavours.js';
import { PACKAGING_BY_ID } from '../data/packaging.js';
import { getProductConfiguration, getRelatedProductConfigurations } from '../data/products.js';
import { ROUTES, hrefFor } from '../config/routes.js';

export default function ProductDetailPage({ productId }) {
  const product = getProductConfiguration(productId);

  if (!product) return <NotFoundPage />;

  const flavour = FLAVOUR_BY_ID[product.flavourId];
  const family = PACKAGING_BY_ID[product.packagingId];
  const relatedProducts = getRelatedProductConfigurations(product);
  const quantity = product.sizeId
    ? `Size · ${product.sizeLabel}`
    : `${product.unitCount} × ${product.unitWeightGrams} g`;

  const selectVariant = (id) => {
    const nextHash = hrefFor(`${ROUTES.products}/${id}`);
    if (window.location.hash !== nextHash) window.location.hash = nextHash;
  };

  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol className="breadcrumb__list">
          <li><a href={hrefFor(ROUTES.home)}>Home</a></li>
          <li><a href={hrefFor(ROUTES.products)}>Our Honey</a></li>
          <li><a href={hrefFor(`${ROUTES.products}/${family.slug}`)}>{family.shortName}</a></li>
          <li aria-current="page">{flavour.name}</li>
        </ol>
      </nav>

      <PageHeader
        eyebrow="Product detail"
        title={product.displayName}
        description={product.shortDescription}
      />

      <Section
        id="product-overview"
        eyebrow="Product overview"
        title="Format and flavour"
        description="Concept presentation with confirmed packaging specifications only."
      >
        <div className="product-detail">
          <div className="product-detail__visual">
            <ProductVisual packagingId={product.packagingId} label={product.displayName} large />
          </div>

          <div className="product-detail__info">
            <dl className="spec-list">
              <div className="spec-item">
                <dt>Flavour identity</dt>
                <dd>
                  {flavour.name}
                  <span className="spec-item__note">{flavour.description}</span>
                </dd>
              </div>
              <div className="spec-item">
                <dt>Packaging format</dt>
                <dd>
                  {product.format}
                  <span className="spec-item__note">{product.intendedConvenience}</span>
                </dd>
              </div>
              <div className="spec-item">
                <dt>{product.sizeId ? 'Available size' : 'Pack quantity'}</dt>
                <dd>{quantity}</dd>
              </div>
              <div className="spec-item">
                <dt>Net content</dt>
                <dd>
                  {product.netContent.label}
                  {product.unitType === 'volume' && <span className="spec-item__note">Volume specification.</span>}
                </dd>
              </div>
            </dl>

            <div className="product-detail__status">
              <p><strong>Concept status:</strong> {product.visualDisclosure}</p>
              <p><strong>Formulation:</strong> {product.formulationNotice}</p>
            </div>

            <div className="product-detail__variants">
              <h3 className="product-detail__subtitle">Switch variant</h3>
              <ProductVariantSelector product={product} onSelect={selectVariant} />
            </div>

            <Button href={hrefFor(ROUTES.contact)}>Make a product enquiry</Button>
          </div>
        </div>
      </Section>

      <Section
        id="related-products"
        eyebrow="Continue exploring"
        title="Related products"
        description="Other concepts from the same packaging family or other formats in the same flavour."
        tinted
      >
        <div className="product-grid product-grid--related">
          {relatedProducts.map((related) => (
            <ProductCard key={related.id} product={related} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">Business and product enquiries</p>
            <h2 className="cta-panel__title">Discuss HONIESH with us</h2>
            <p className="cta-panel__description">
              Enquiry forms are clearly marked as frontend-only until a contact method is connected. No submission claim is made.
            </p>
          </div>
          <Button href={hrefFor(ROUTES.contact)} variant="secondary">Go to contact</Button>
        </div>
      </Section>
    </>
  );
}
