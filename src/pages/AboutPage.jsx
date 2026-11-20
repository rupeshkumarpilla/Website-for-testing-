import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Button from '../components/ui/Button.jsx';
import EditorialVisual from '../components/editorial/EditorialVisual.jsx';
import EditorialDisclosure from '../components/editorial/EditorialDisclosure.jsx';
import { BRAND_IDENTITY } from '../config/content.js';
import { CONTENT_GAPS } from '../config/informationArchitecture.js';
import { CATALOGUE_SUMMARY } from '../data/products.js';
import { FLAVOURS } from '../data/flavours.js';
import { PACKAGING_FAMILIES, PACKAGING_IDENTITY } from '../data/packaging.js';
import { ROUTES, hrefFor } from '../config/routes.js';

const PRODUCT_GAP = CONTENT_GAPS.find((gap) => gap.id === 'product-imagery');
const FORMULATION_GAP = CONTENT_GAPS.find((gap) => gap.id === 'formulation-details');

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title={BRAND_IDENTITY.tagline}
        description={`${BRAND_IDENTITY.brandEssence} This page uses the approved HONIESH identity and avoids invented brand history.`}
        visual={<EditorialVisual visualId="honeycomb" label="Our Story editorial cover" large />}
      >
        <div className="page-header__actions">
          <Button href={hrefFor(ROUTES.products)}>Explore Our Honey</Button>
        </div>
      </PageHeader>

      <Section
        id="brand-identity"
        eyebrow="01 / Brand identity"
        title="A contemporary honey brand"
        description={BRAND_IDENTITY.positioning}
        variant="split"
      >
        <div className="story-facts">
          <div className="story-fact">
            <span className="story-fact__value">{FLAVOURS.length}</span>
            <span className="story-fact__label">Flavour concepts</span>
          </div>
          <div className="story-fact">
            <span className="story-fact__value">{PACKAGING_FAMILIES.length}</span>
            <span className="story-fact__label">Packaging families</span>
          </div>
          <div className="story-fact">
            <span className="story-fact__value">{CATALOGUE_SUMMARY.totalConfigurations}</span>
            <span className="story-fact__label">Product configurations</span>
          </div>
        </div>
      </Section>

      <Section
        id="mission"
        eyebrow="02 / Mission"
        title="Why HONIESH exists"
        description={BRAND_IDENTITY.mission}
        variant="split"
        tinted
      />

      <Section
        id="vision"
        eyebrow="03 / Vision"
        title="Where HONIESH is going"
        description={BRAND_IDENTITY.vision}
        variant="split"
      />

      <Section
        id="values"
        eyebrow="04 / Values"
        title="What HONIESH stands for"
        description="The approved values shape how the collection and its communication are presented."
        variant="split"
        tinted
      >
        <div className="pending-list">
          <div className="pending-list__group">
            <h3>Approved values</h3>
            <ul>{BRAND_IDENTITY.values.map((value) => <li key={value}>{value}</li>)}</ul>
          </div>
        </div>
      </Section>

      <Section
        id="personality"
        eyebrow="05 / Personality"
        title="How HONIESH should feel"
        description="A clear, warm and modern character expressed through restrained, considered communication."
        variant="split"
      >
        <div className="pending-list">
          <div className="pending-list__group">
            <h3>Brand personality</h3>
            <ul>{BRAND_IDENTITY.personality.map((trait) => <li key={trait}>{trait}</li>)}</ul>
          </div>
        </div>
      </Section>

      <Section
        id="product-philosophy"
        eyebrow="06 / Product philosophy"
        title="How we think about the collection"
        description="Confirmed specifications, careful format language and transparent editorial notes."
        variant="split"
        tinted
      >
        <div className="story-columns">
          <div>
            <h3>Clarity before claims</h3>
            <p>
              The catalogue shows confirmed sizes, pack quantities and format information. Formulation details,
              product photography and flavour-specific claims remain visibly pending.
            </p>
          </div>
          <div>
            <h3>Format as a choice</h3>
            <p>
              Glass jars, honey sticks and hygienic portion packs are presented as distinct formats with different
              convenience contexts, not as ranked claims about safety or quality.
            </p>
          </div>
          <div>
            <h3>Considered presentation</h3>
            <p>
              {PACKAGING_IDENTITY.batchCertification} {PACKAGING_IDENTITY.finalPackagingNotice}
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="story-boundaries"
        eyebrow="07 / Story boundaries"
        title="Honest storytelling, not invented history"
        description="Brand narrative is based on approved identity and product information."
      >
        <EditorialDisclosure title="What this page will not claim">
          <p>Founder identity, founding date, brand history and sourcing locations are not published without approved evidence.</p>
          <p>No medical, nutrition, certification or test-result claim is added without review and substantiation.</p>
        </EditorialDisclosure>
      </Section>

      <Section id="content-required" eyebrow="08 / Still unpublished" title="What remains pending" tinted>
        <div className="pending-list">
          <div className="pending-list__group">
            <h3>Product imagery</h3>
            <ul>{(PRODUCT_GAP?.items ?? []).map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="pending-list__group">
            <h3>Formulation and publication</h3>
            <ul>{(FORMULATION_GAP?.items ?? []).map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </Section>

      <Section title="Continue exploring">
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">Next step</p>
            <h3 className="cta-panel__title">See the collection and context</h3>
            <p className="cta-panel__description">
              The catalogue and journal remain useful while final imagery and formulation details are confirmed.
            </p>
          </div>
          <div className="cta-panel__actions">
            <Button href={hrefFor(ROUTES.products)}>Our Honey</Button>
            <Button href={hrefFor(ROUTES.journal)} variant="secondary">Honey Journal</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
