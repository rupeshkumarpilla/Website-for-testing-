import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Button from '../components/ui/Button.jsx';
import EditorialVisual from '../components/editorial/EditorialVisual.jsx';
import EditorialDisclosure from '../components/editorial/EditorialDisclosure.jsx';
import CaseStudyCard from '../components/editorial/CaseStudyCard.jsx';
import { CASE_STUDIES, EDITORIAL_SUMMARY } from '../data/editorial.js';
import { CONTENT_GAPS } from '../config/informationArchitecture.js';
import { ROUTES, hrefFor } from '../config/routes.js';

const CASE_GAP = CONTENT_GAPS.find((gap) => gap.id === 'real-case-studies');

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies"
        title="A framework, not invented results."
        description="No customer case studies are claimed. This page presents five illustrative frameworks showing how verified client contexts, permissions and outcomes can be added later."
        visual={<EditorialVisual visualId="portions" label="Case Studies cover" large />}
      />

      <Section
        eyebrow="Illustrative frameworks"
        title={`${EDITORIAL_SUMMARY.caseStudyCount} ready-to-complete structures`}
        description="Each card links to relevant HONIESH formats and states clearly that no client, quotation, statistic or result is present."
      >
        <div className="editorial-card-grid editorial-card-grid--case-studies">
          {CASE_STUDIES.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </Section>

      <Section eyebrow="How to publish a real case study" title="Future case-study template" tinted>
        <div className="case-template">
          <div><span>01</span><h3>Context</h3><p>Describe the verified setting and the customer’s permission to publish.</p></div>
          <div><span>02</span><h3>Choice</h3><p>Explain which confirmed HONIESH format was considered or used.</p></div>
          <div><span>03</span><h3>Evidence</h3><p>Add only approved quotations, statistics and outcomes with sources.</p></div>
          <div><span>04</span><h3>Review</h3><p>Secure approval for wording, imagery and any business claims.</p></div>
        </div>
        <EditorialDisclosure title="Required inputs">
          <ul>{(CASE_GAP?.items ?? []).map((item) => <li key={item}>{item}</li>)}</ul>
        </EditorialDisclosure>
      </Section>

      <Section eyebrow="Related reading" title="Use cases and journal context">
        <div className="case-links">
          <a href={hrefFor(ROUTES.useCases)}>
            <span>Use Cases</span>
            <strong>Proposed application contexts</strong>
          </a>
          <a href={hrefFor(ROUTES.journal)}>
            <span>Honey Journal</span>
            <strong>Sourced educational articles</strong>
          </a>
        </div>
      </Section>

      <Section title="Start a conversation">
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">Business and product enquiries</p>
            <h3 className="cta-panel__title">Tell us what you would like to verify</h3>
            <p className="cta-panel__description">
              Enquiries are accepted only after a real contact destination is connected. No submission claim is made.
            </p>
          </div>
          <Button href={hrefFor(ROUTES.contact)}>Contact HONIESH</Button>
        </div>
      </Section>
    </>
  );
}
