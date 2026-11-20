import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { PLACEHOLDER_TEXT } from '../config/site.js';
import { COMPANY_CONTENT } from '../config/content.js';
import { ROUTES, hrefFor } from '../config/routes.js';

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Contact HONIESH"
        description={COMPANY_CONTENT.overview}
      />

      <Section eyebrow="01 / Details" title="Contact details" variant="split">
        <div className="card-grid">
          <Card title="Email" description={COMPANY_CONTENT.contact.email || PLACEHOLDER_TEXT} />
          <Card title="Phone" description={COMPANY_CONTENT.contact.phone || PLACEHOLDER_TEXT} />
          <Card title="Address" description={COMPANY_CONTENT.contact.address || PLACEHOLDER_TEXT} />
        </div>
      </Section>

      <Section
        eyebrow="02 / Message"
        title="Send a message"
        description={PLACEHOLDER_TEXT}
        variant="split"
        tinted
      >
        <ContactForm />
      </Section>

      <Section title="Account access">
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">Existing users</p>
            <h3 className="cta-panel__title">Login</h3>
            <p className="cta-panel__description">{PLACEHOLDER_TEXT}</p>
          </div>
          <Button href={hrefFor(ROUTES.login)} variant="secondary">Open login</Button>
        </div>
      </Section>
    </>
  );
}
