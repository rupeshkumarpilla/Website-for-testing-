import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Button from '../components/ui/Button.jsx';
import EditorialVisual from '../components/editorial/EditorialVisual.jsx';
import FlavourConceptCard from '../components/editorial/FlavourConceptCard.jsx';
import PackagingFamilyCard from '../components/editorial/PackagingFamilyCard.jsx';
import ArticleCard from '../components/editorial/ArticleCard.jsx';
import UseCaseCard from '../components/editorial/UseCaseCard.jsx';
import CaseStudyCard from '../components/editorial/CaseStudyCard.jsx';
import { BRAND_IDENTITY } from '../config/content.js';
import { FLAVOURS } from '../data/flavours.js';
import { PACKAGING_FAMILIES, PACKAGING_IDENTITY } from '../data/packaging.js';
import { CATALOGUE_SUMMARY } from '../data/products.js';
import { JOURNAL_ARTICLES, USE_CASES, CASE_STUDIES } from '../data/editorial.js';
import { ROUTES, hrefFor } from '../config/routes.js';

export default function HomePage() {
  const featuredArticles = JOURNAL_ARTICLES.slice(0, 3);
  const featuredUseCases = USE_CASES.slice(0, 3);
  const featuredCaseStudies = CASE_STUDIES.slice(0, 2);

  return (
    <>
      <PageHeader
        eyebrow={`HONIESH · ${BRAND_IDENTITY.brandEssence}`}
        title={BRAND_IDENTITY.tagline}
        description={`${BRAND_IDENTITY.positioning} ${BRAND_IDENTITY.mission} Confirmed specifications stay visible while formulation, final imagery and genuine case-study evidence are clearly marked as pending.`}
        visual={<EditorialVisual visualId="honeycomb" label="HONIESH brand introduction" large />}
      >
        <div className="page-header__actions">
          <Button href={hrefFor(ROUTES.products)}>Explore the collection</Button>
          <Button href={hrefFor(ROUTES.about)} variant="secondary">Read our story</Button>
        </div>
      </PageHeader>

      <Section
        id="brand-statement"
        eyebrow="01 / Brand point of view"
        title="A honey brand built around clear choices"
        description={`${BRAND_IDENTITY.mission} The collection is organised around flavour, format and use context, with approved identity language and no invented company history.`}
        variant="split"
      >
        <div className="statement-grid">
          <div className="statement-card">
            <span className="statement-card__number">05</span>
            <h3>Flavour concepts</h3>
            <p>Five concept directions presented across the collection, each awaiting formulation confirmation.</p>
          </div>
          <div className="statement-card">
            <span className="statement-card__number">03</span>
            <h3>Packaging families</h3>
            <p>Glass jars, honey sticks and hygienic portion packs with confirmed specification-led structures.</p>
          </div>
          <div className="statement-card">
            <span className="statement-card__number">{CATALOGUE_SUMMARY.totalConfigurations}</span>
            <h3>Configurations</h3>
            <p>Each unique flavour, packaging and size combination has its own product detail view.</p>
          </div>
        </div>
      </Section>

      <Section
        id="flavours"
        eyebrow="02 / Five flavour concepts"
        title="A considered range of flavour ideas"
        description="Original, Ginger, Lemon, Cinnamon and Cardamom introduce concept directions only. No ingredient, nutrition, origin or flavour-performance claim is made before review."
        tinted
      >
        <div className="editorial-card-grid editorial-card-grid--flavours">
          {FLAVOURS.map((flavour) => (
            <FlavourConceptCard key={flavour.id} flavourId={flavour.id} />
          ))}
        </div>
      </Section>

      <Section
        id="formats"
        eyebrow="03 / Packaging families"
        title="Three formats for different contexts"
        description={`Compare the confirmed structure of each family: jar sizes, individual sticks and portion-controlled boxes. ${PACKAGING_IDENTITY.batchCertification}`}
      >
        <div className="editorial-card-grid editorial-card-grid--formats">
          {PACKAGING_FAMILIES.map((family) => (
            <PackagingFamilyCard key={family.id} packagingId={family.id} />
          ))}
        </div>
      </Section>

      <Section
        id="story"
        eyebrow="04 / Our story"
        title="Approved identity, honest boundaries"
        description="The HONIESH story page presents the approved brand position while clearly separating confirmed identity from evidence still pending."
        variant="split"
        tinted
      >
        <div className="story-preview">
          <EditorialVisual visualId="texture" label="HONIESH story preview" />
          <div className="story-preview__content">
            <p>
              Confirmed today: tagline, brand essence, mission, vision, values, personality, five flavour concepts and
              three packaging families. Still pending: final imagery, confirmed formulations, genuine customer case
              studies and a live contact destination.
            </p>
            <Button href={hrefFor(ROUTES.about)} variant="secondary">See the full story page</Button>
          </div>
        </div>
      </Section>

      <Section
        id="journal"
        eyebrow="05 / Honey Journal"
        title="Useful context, carefully sourced"
        description="Short educational and packaging articles that avoid medical, nutrition and unverified product claims."
      >
        <div className="editorial-card-grid editorial-card-grid--articles">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <div className="section__footer">
          <Button href={hrefFor(ROUTES.journal)} variant="secondary">Open Honey Journal</Button>
        </div>
      </Section>

      <Section
        id="use-cases"
        eyebrow="06 / Use cases"
        title="Where these formats may fit"
        description="Proposed contexts only. No customer placement, partnership or business result is claimed."
        tinted
      >
        <div className="editorial-card-grid editorial-card-grid--use-cases">
          {featuredUseCases.map((useCase) => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>
        <div className="section__footer">
          <Button href={hrefFor(ROUTES.useCases)} variant="secondary">View all use cases</Button>
        </div>
      </Section>

      <Section
        id="case-studies"
        eyebrow="07 / Case studies"
        title="Frameworks ready for real evidence"
        description="These are transparent illustration frameworks, not customer stories. They show how genuine case studies can be added later."
      >
        <div className="editorial-card-grid editorial-card-grid--case-studies">
          {featuredCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
        <div className="section__footer">
          <Button href={hrefFor(ROUTES.caseStudies)} variant="secondary">See the case-study framework</Button>
        </div>
      </Section>

      <Section id="discover" eyebrow="08 / Next step" title="Discover and enquire">
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">Product discovery</p>
            <h3 className="cta-panel__title">Choose a flavour, format or business context</h3>
            <p className="cta-panel__description">
              Explore the full catalogue, read the journal, then send a clearly marked frontend-only enquiry.
              A real contact destination must be connected before any submission claim is made.
            </p>
          </div>
          <div className="cta-panel__actions">
            <Button href={hrefFor(ROUTES.products)}>Browse products</Button>
            <Button href={hrefFor(ROUTES.contact)} variant="secondary">Contact HONIESH</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
