import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Button from '../components/ui/Button.jsx';
import EditorialDisclosure from '../components/editorial/EditorialDisclosure.jsx';
import ProductVisual from '../components/product/ProductVisual.jsx';
import {
  PACKAGING_FAMILIES,
  PACKAGING_IDENTITY,
  PACKAGING_SUMMARY,
} from '../data/packaging.js';
import { PRODUCT_CONFIGURATIONS } from '../data/products.js';
import { ROUTES, hrefFor } from '../config/routes.js';

function familySpecs(family) {
  if (family.sizes.length > 0) {
    return family.sizes.map((size) => size.label).join(', ');
  }
  return `${family.unitCount} × ${family.unitWeightGrams} g`;
}

export default function PackagingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Packaging"
        title="Three formats, each with a clear purpose."
        description="Compare the confirmed HONIESH packaging families. Visuals are concept presentations while final packaging photography is pending."
        visual={<ProductVisual packagingId="honey-sticks" label="HONIESH packaging concepts" large />}
      />

      <Section
        id="packaging-overview"
        eyebrow="Format overview"
        title={`${PACKAGING_SUMMARY.totalFamilies} packaging families`}
        description="Use the confirmed specifications below to understand the difference between shared and individual formats."
      >
        <div className="packaging-overview-grid">
          {PACKAGING_FAMILIES.map((family) => {
            const firstProduct = PRODUCT_CONFIGURATIONS.find((product) => product.packagingId === family.id);
            return (
              <article key={family.id} className="packaging-overview-card">
                <div className="packaging-overview-card__visual">
                  {firstProduct && (
                    <ProductVisual
                      packagingId={family.id}
                      product={firstProduct}
                      label={family.name}
                    />
                  )}
                </div>
                <div className="packaging-overview-card__body">
                  <h3>{family.name}</h3>
                  <p>{family.format}</p>
                  <dl className="spec-list">
                    <div className="spec-item">
                      <dt>{family.sizeLabel}</dt>
                      <dd>{familySpecs(family)}</dd>
                    </div>
                    {family.netContent && (
                      <div className="spec-item">
                        <dt>Net content</dt>
                        <dd>{family.netContent.label}</dd>
                      </div>
                    )}
                  </dl>
                  <p>{family.intendedConvenience}</p>
                  <a
                    className="button button--secondary"
                    href={hrefFor(`${ROUTES.products}/${family.slug}`)}
                  >
                    View {family.shortName} products
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        id="packaging-boundaries"
        eyebrow="Publication boundaries"
        title="What these specifications do and do not say"
        description="HONIESH keeps concept visuals and certification references separate from verified public claims."
        tinted
      >
        <EditorialDisclosure title="Concept visuals">
          <p>{PACKAGING_SUMMARY.finalPackagingNotice}</p>
        </EditorialDisclosure>
        <EditorialDisclosure title="Batch certification">
          <p>{PACKAGING_IDENTITY.batchCertification}</p>
        </EditorialDisclosure>
        <EditorialDisclosure title="Volume rule">
          <p>{PACKAGING_SUMMARY.volumeRule}</p>
        </EditorialDisclosure>
      </Section>

      <Section title="Continue exploring">
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">Next step</p>
            <h3 className="cta-panel__title">Browse the collection</h3>
            <p className="cta-panel__description">
              Explore HONIESH configurations by packaging family, flavour and glass jar size.
            </p>
          </div>
          <Button href={hrefFor(ROUTES.products)}>Our Honey</Button>
        </div>
      </Section>
    </>
  );
}
