import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { SITE, PLACEHOLDER_TEXT } from '../config/site.js';
import { COMPANY_CONTENT } from '../config/content.js';
import { ROUTES, hrefFor } from '../config/routes.js';
import heroMotif from '../assets/hero-motif.svg';

export default function HomePage() {
  return (
    <>
      <PageHeader
        eyebrow="Company website"
        title={SITE.name}
        description={COMPANY_CONTENT.overview}
        visual={<img className="hero-motif" src={heroMotif} alt="" />}
      >
        <div className="page-header__actions">
          <Button href={hrefFor(ROUTES.about)}>About HONIESH</Button>
          <Button href={hrefFor(ROUTES.contact)} variant="secondary">Contact</Button>
        </div>
      </PageHeader>

      <Section
        eyebrow="01 / Company"
        title="About HONIESH"
        description={COMPANY_CONTENT.about}
        variant="split"
      >
        <EmptyState
          title="Company information pending"
          description={PLACEHOLDER_TEXT}
          action={<Button href={hrefFor(ROUTES.about)} variant="text">Learn more</Button>}
        />
      </Section>

      <Section
        eyebrow="02 / Focus"
        title="Capabilities"
        description={COMPANY_CONTENT.capabilities}
        variant="split"
        tinted
      >
        <div className="card-grid card-grid--two">
          <Card
            title="What we do"
            description={PLACEHOLDER_TEXT}
            footer={<Button href={hrefFor(ROUTES.contact)} variant="text">Ask us</Button>}
          />
        </div>
      </Section>

      <Section eyebrow="03 / Contact" title="Get in touch">
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">Next step</p>
            <h3 className="cta-panel__title">Contact HONIESH</h3>
            <p className="cta-panel__description">{PLACEHOLDER_TEXT}</p>
          </div>
          <Button href={hrefFor(ROUTES.contact)}>Contact</Button>
        </div>
      </Section>
    </>
  );
}
