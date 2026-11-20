import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Button from '../components/ui/Button.jsx';
import EditorialVisual from '../components/editorial/EditorialVisual.jsx';
import UseCaseCard from '../components/editorial/UseCaseCard.jsx';
import EditorialDisclosure from '../components/editorial/EditorialDisclosure.jsx';
import { USE_CASES, EDITORIAL_SUMMARY } from '../data/editorial.js';
import { CONTENT_GAPS } from '../config/informationArchitecture.js';
import { ROUTES, hrefFor } from '../config/routes.js';

const USE_CASE_GAP = CONTENT_GAPS.find((gap) => gap.id === 'real-case-studies');

export default function UseCasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Use Cases"
        title="Possible contexts, stated carefully."
        description="Seven proposed application areas for HONIESH formats. Each one is framed as a use context to discuss, not as a confirmed customer, partnership or placement."
        visual={<EditorialVisual visualId="packaging" label="Use Cases cover" large />}
      >
        <div className="page-header__actions">
          <Button href={hrefFor(ROUTES.contact)}>Discuss a use case</Button>
        </div>
      </PageHeader>

      <Section
        eyebrow="Proposed applications"
        title={`${EDITORIAL_SUMMARY.useCaseCount} use contexts`}
        description="Every card links to the packaging families that could be relevant to the context."
      >
        <div className="editorial-card-grid editorial-card-grid--use-cases">
          {USE_CASES.map((useCase) => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Format suitability" title="How to read the formats" tinted>
        <div className="suitability-grid">
          <div>
            <h3>Glass jar</h3>
            <p>Presented for shared kitchen and table contexts where multiple people serve themselves.</p>
          </div>
          <div>
            <h3>Honey stick</h3>
            <p>Presented as an individual-format concept for convenience-focused contexts.</p>
          </div>
          <div>
            <h3>Hygienic portion pack</h3>
            <p>Presented as a split-open dispensing concept for individual portions.</p>
          </div>
        </div>
        <EditorialDisclosure title="Disclosure">
          <p>
            No format is described as safer, superior or certified. Suitability depends on information still
            requiring approval, including final packaging, handling instructions and product availability.
          </p>
        </EditorialDisclosure>
      </Section>

      <Section eyebrow="Evidence required" title="What would turn a proposal into a proof point" variant="stack">
        <EditorialDisclosure title="Information required before publishing real outcomes">
          <ul>{(USE_CASE_GAP?.items ?? []).map((item) => <li key={item}>{item}</li>)}</ul>
        </EditorialDisclosure>
      </Section>

      <Section title="Discuss a context">
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">Business enquiry</p>
            <h3 className="cta-panel__title">Tell us the setting you have in mind</h3>
            <p className="cta-panel__description">
              Use the contact page to ask about formats and contexts. The form is frontend-only until a real
              contact destination is connected.
            </p>
          </div>
          <div className="cta-panel__actions">
            <Button href={hrefFor(ROUTES.contact)}>Contact HONIESH</Button>
            <Button href={hrefFor(ROUTES.products)} variant="secondary">View formats</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
