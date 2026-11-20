import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import ProductFilters from '../components/product/ProductFilters.jsx';
import ProductComparison from '../components/product/ProductComparison.jsx';
import ProductVisual from '../components/product/ProductVisual.jsx';
import { FLAVOURS } from '../data/flavours.js';
import { PACKAGING_FAMILIES } from '../data/packaging.js';
import { CATALOGUE_SUMMARY, PRODUCT_CONFIGURATIONS, getCatalogueFilters } from '../data/products.js';
import { ROUTES, hrefFor } from '../config/routes.js';

export default function ProductsPage({ packagingId = null }) {
  const options = useMemo(() => getCatalogueFilters(), []);
  const [flavour, setFlavour] = useState('all');
  const [packaging, setPackaging] = useState(packagingId ?? 'all');
  const [size, setSize] = useState('all');

  useEffect(() => {
    const nextPackaging = packagingId ?? 'all';
    setPackaging(nextPackaging);
    if (nextPackaging !== 'all' && nextPackaging !== 'glass-jars') setSize('all');
  }, [packagingId]);

  const filteredProducts = useMemo(() => PRODUCT_CONFIGURATIONS.filter((product) => {
    if (flavour !== 'all' && product.flavourId !== flavour) return false;
    if (packaging !== 'all' && product.packagingId !== packaging) return false;
    if (size !== 'all' && (product.packagingId !== 'glass-jars' || product.sizeId !== size)) return false;
    return true;
  }), [flavour, packaging, size]);

  const setCategoryUrl = (nextPackaging) => {
    const nextHash = nextPackaging === 'all'
      ? hrefFor(ROUTES.products)
      : hrefFor(`${ROUTES.products}/${nextPackaging}`);
    if (window.location.hash !== nextHash) window.location.hash = nextHash;
  };

  const handleChange = (name, value) => {
    if (name === 'flavour') setFlavour(value);
    if (name === 'size') setSize(value);
    if (name === 'packaging') {
      setPackaging(value);
      setSize('all');
      setCategoryUrl(value);
    }
  };

  const resetFilters = () => {
    setFlavour('all');
    setPackaging('all');
    setSize('all');
    setCategoryUrl('all');
  };

  const categoryItems = [
    { id: 'all', label: 'All products' },
    ...PACKAGING_FAMILIES.map((family) => ({ id: family.id, label: family.shortName })),
  ];

  return (
    <>
      <PageHeader
        eyebrow="Our Honey"
        title="HONIESH product collection"
        description={`Explore ${CATALOGUE_SUMMARY.totalConfigurations} flavour and packaging configurations across glass jars, honey sticks and portion packs. Packaging shown is illustrative while final product photography is pending.`}
        visual={<ProductVisual packagingId="glass-jars" label="HONIESH glass jar collection" large />}
      />

      <Section
        id="catalogue"
        eyebrow="Product catalogue"
        title="Find the right format"
        description="Filter by flavour, packaging family and glass jar size. Filters work together and the product count updates as you refine your selection."
      >
        <nav className="category-nav" aria-label="Product categories">
          {categoryItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`category-chip${packaging === item.id ? ' is-active' : ''}`}
              aria-pressed={packaging === item.id}
              onClick={() => handleChange('packaging', item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="product-layout">
          <ProductFilters
            values={{ flavour, packaging, size }}
            options={options}
            resultCount={filteredProducts.length}
            totalCount={CATALOGUE_SUMMARY.totalConfigurations}
            onChange={handleChange}
            onReset={resetFilters}
          />

          <div className="product-results">
            <div className="product-results__toolbar">
              <p className="product-results__count" aria-live="polite">
                Showing <strong>{filteredProducts.length}</strong> of {CATALOGUE_SUMMARY.totalConfigurations} configurations
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No configurations match"
                description="Reset the filters to see the full HONIESH product collection."
                action={<Button onClick={resetFilters}>Reset filters</Button>}
              />
            )}
          </div>
        </div>
      </Section>

      <Section
        id="flavours"
        eyebrow="Five flavour concepts"
        title="Explore by flavour"
        description="Each concept can be viewed across the available packaging families. Formulation details remain unconfirmed and are marked for review."
        tinted
      >
        <div className="flavour-nav">
          {FLAVOURS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="flavour-chip"
              style={{ '--product-accent': item.accentColor, '--product-accent-soft': item.accentSoft }}
              aria-pressed={flavour === item.id}
              onClick={() => {
                setFlavour(item.id);
                document.getElementById('catalogue')?.scrollIntoView({ block: 'start' });
              }}
            >
              <span className="flavour-chip__dot" aria-hidden="true" />
              {item.name}
            </button>
          ))}
        </div>
      </Section>

      <Section
        id="comparison"
        eyebrow="Packaging comparison"
        title="Choose the format that fits"
        description="The three packaging families serve different contexts. The comparison below uses only confirmed specifications."
      >
        <ProductComparison />
      </Section>

      <Section id="enquiry" variant="stack">
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">Product enquiry</p>
            <h2 className="cta-panel__title">Need help choosing a format?</h2>
            <p className="cta-panel__description">
              Tell us which flavour, packaging family or pack size you are considering. Enquiries are handled only after a contact method is connected.
            </p>
          </div>
          <Button href={hrefFor(ROUTES.contact)}>Contact HONIESH</Button>
        </div>
      </Section>
    </>
  );
}
