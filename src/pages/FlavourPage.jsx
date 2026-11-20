import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Button from '../components/ui/Button.jsx';
import EditorialDisclosure from '../components/editorial/EditorialDisclosure.jsx';
import EditorialVisual from '../components/editorial/EditorialVisual.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import ProductVisual from '../components/product/ProductVisual.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import { FLAVOUR_BY_SLUG, FLAVOUR_SUMMARY } from '../data/flavours.js';
import { PACKAGING_BY_ID } from '../data/packaging.js';
import { getProductConfigurationsByFlavour } from '../data/products.js';
import { JOURNAL_ARTICLES } from '../data/editorial.js';
import { ROUTES, hrefFor } from '../config/routes.js';

export default function FlavourPage({ flavourSlug }) {
  const flavour = FLAVOUR_BY_SLUG[flavourSlug];
  if (!flavour) return <NotFoundPage />;

  const configurations = getProductConfigurationsByFlavour(flavour.id);
  const firstProduct = configurations[0];
  const familyIds = [...new Set(configurations.map((product) => product.packagingId))];
  const relatedArticles = JOURNAL_ARTICLES
    .filter((article) => article.relatedFlavourIds.includes(flavour.id))
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Flavour concept"
        title={flavour.name}
        description={flavour.description}
        visual={firstProduct
          ? <ProductVisual packagingId={firstProduct.packagingId} product={firstProduct} label={`${flavour.name} concept`} large />
          : <EditorialVisual visualId="honeycomb" label={`${flavour.name} concept`} large />}
      />

      <Section
        id="concept-status"
        eyebrow="Publication status"
        title="A concept direction, not a confirmed formulation"
        description={FLAVOUR_SUMMARY.publicationRule}
      >
        <EditorialDisclosure title="What is confirmed">
          <ul>
            <li>Flavour name: {flavour.name}</li>
            <li>Configurations shown: {configurations.length}</li>
            <li>Packaging families: {familyIds.length}</li>
            <li>Formulation status: unconfirmed</li>
          </ul>
        </EditorialDisclosure>
        <EditorialDisclosure title="Pending review">
          <ul>{flavour.pendingInformation.map((item) => <li key={item}>{item}</li>)}</ul>
        </EditorialDisclosure>
      </Section>

      <Section
        id="packaging-families"
        eyebrow="Available formats"
        title={`Explore ${flavour.name} by packaging`}
        description="The same flavour concept is presented across the HONIESH packaging families below."
        tinted
      >
        <div className="packaging-family-link-grid">
          {familyIds.map((familyId) => {
            const family = PACKAGING_BY_ID[familyId];
            if (!family) return null;
            return (
              <a
                key={family.id}
                className="packaging-family-link"
                href={hrefFor(`${ROUTES.products}/${family.slug}`)}
              >
                <span>{family.shortName}</span>
                <strong>{family.name}</strong>
              </a>
            );
          })}
        </div>
      </Section>

      <Section
        id="configurations"
        eyebrow="Configurations"
        title={`${flavour.name} across the collection`}
        description="Product detail views use the catalogue page so the site does not publish thin standalone pages for every configuration."
      >
        <div className="product-grid">
          {configurations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>

      {relatedArticles.length > 0 && (
        <Section
          id="related-reading"
          eyebrow="Related reading"
          title="Honey Journal context"
          description="General honey education linked to this flavour concept."
          tinted
        >
          <ul className="source-list">
            {relatedArticles.map((article) => (
              <li key={article.slug}>
                <a href={hrefFor(`${ROUTES.journal}/${article.slug}`)}>{article.title}</a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Continue exploring">
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">Next step</p>
            <h3 className="cta-panel__title">Compare HONIESH formats</h3>
            <p className="cta-panel__description">
              Review confirmed packaging specifications before making a product enquiry.
            </p>
          </div>
          <div className="cta-panel__actions">
            <Button href={hrefFor(ROUTES.packaging)} variant="secondary">Our packaging</Button>
            <Button href={hrefFor(ROUTES.products)}>Our Honey</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
