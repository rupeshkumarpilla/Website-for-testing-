import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { PLACEHOLDER_TEXT } from '../config/site.js';
import { COMPANY_CONTENT } from '../config/content.js';
import { ROUTES, hrefFor } from '../config/routes.js';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About HONIESH"
        description={COMPANY_CONTENT.about}
      />

      <Section
        eyebrow="01 / Overview"
        title="Company overview"
        description={COMPANY_CONTENT.overview}
        variant="split"
      >
        <EmptyState title="Approved company description required" description={PLACEHOLDER_TEXT} />
      </Section>

      <Section
        eyebrow="02 / Focus"
        title="Capabilities"
        description={COMPANY_CONTENT.capabilities}
        variant="split"
        tinted
      >
        <EmptyState title="Capabilities information required" description={PLACEHOLDER_TEXT} />
      </Section>

      <Section title="Work with HONIESH">
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">Next step</p>
            <h3 className="cta-panel__title">Contact HONIESH</h3>
            <p className="cta-panel__description">{PLACEHOLDER_TEXT}</p>
          </div>
          <Button href={hrefFor(ROUTES.contact)}>Go to contact</Button>
        </div>
      </Section>
    </>
  );
}
