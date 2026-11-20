import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Button from '../components/ui/Button.jsx';
import EditorialVisual from '../components/editorial/EditorialVisual.jsx';
import EditorialDisclosure from '../components/editorial/EditorialDisclosure.jsx';
import { CONTENT_GAPS } from '../config/informationArchitecture.js';
import { CATALOGUE_SUMMARY } from '../data/products.js';
import { FLAVOURS } from '../data/flavours.js';
import { PACKAGING_FAMILIES } from '../data/packaging.js';
import { ROUTES, hrefFor } from '../config/routes.js';

const COMPANY_GAP = CONTENT_GAPS.find((gap) => gap.id === 'company-story');
const PRODUCT_GAP = CONTENT_GAPS.find((gap) => gap.id === 'product-imagery');
const FORMULATION_GAP = CONTENT_GAPS.find((gap) => gap.id === 'formulation-details');

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="The HONIESH story, without invented history."
        description="This page explains what HONIESH can substantiate today: a structured collection of five flavour concepts and three packaging families. The narrative sections are intentionally marked as pending until you supply approved company information."
        visual={<EditorialVisual visualId="honeycomb" label="Our Story editorial cover" large />}
      >
        <div className="page-header__actions">
          <Button href={hrefFor(ROUTES.products)}>Explore Our Honey</Button>
        </div>
      </PageHeader>

      <Section
        id="brand-identity"
        eyebrow="01 / Brand identity"
        title="What HONIESH is today"
        description="A honey brand concept presented through a clear catalogue, careful language and transparent editorial notes."
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
        id="brand-origins"
        eyebrow="02 / Brand origins"
        title="Where the story began"
        description="Placeholder for the approved origin story."
        variant="split"
        tinted
      >
        <EditorialDisclosure title="Information required from HONIESH">
          <p>Brand origins: when and why the brand was created.</p>
          <p>Founder story: who founded HONIESH and the approved wording to use.</p>
          <p>Approved company background: any history that may be published.</p>
        </EditorialDisclosure>
      </Section>

      <Section
        id="mission"
        eyebrow="03 / Mission"
        title="Why HONIESH exists"
        description="Placeholder for an approved mission statement."
        variant="split"
      >
        <EditorialDisclosure title="Information required from HONIESH">
          <p>An approved one-paragraph mission statement.</p>
          <p>Any public-purpose language that has been reviewed and confirmed.</p>
        </EditorialDisclosure>
      </Section>

      <Section
        id="values"
        eyebrow="04 / Values"
        title="What HONIESH stands for"
        description="Placeholder for approved values."
        variant="split"
        tinted
      >
        <EditorialDisclosure title="Information required from HONIESH">
          <p>Three to five approved brand values with short explanations.</p>
          <p>Any claims about sourcing, production or service that can be evidenced.</p>
        </EditorialDisclosure>
      </Section>

      <Section
        id="product-philosophy"
        eyebrow="05 / Product philosophy"
        title="How we think about the collection"
        description="A confirmed structural philosophy based on the product information already available."
        variant="split"
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
              Glass jars, honey sticks and portion packs are presented as distinct formats with different
              convenience contexts, not as ranked claims about safety or quality.
            </p>
          </div>
          <div>
            <h3>Reviewable language</h3>
            <p>
              Journal articles cite general references while avoiding medical, nutrition and unverified product claims.
              Product-specific wording can be added after review.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="future-vision"
        eyebrow="06 / Future vision"
        title="Where HONIESH goes next"
        description="Placeholder for approved future-vision language."
        variant="split"
        tinted
      >
        <EditorialDisclosure title="Information required from HONIESH">
          <p>Approved short-term and long-term brand direction.</p>
          <p>Any expansion plans, channels or partnerships that may be publicly stated.</p>
        </EditorialDisclosure>
      </Section>

      <Section id="content-required" eyebrow="07 / Content still required" title="What I need from you">
        <div className="pending-list">
          <div className="pending-list__group">
            <h3>Company story</h3>
            <ul>{(COMPANY_GAP?.items ?? []).map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
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
              The catalogue and journal remain useful while the company narrative is completed.
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
