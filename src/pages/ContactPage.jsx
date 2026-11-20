import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import ContactForm from '../components/ContactForm.jsx';
import EditorialDisclosure from '../components/editorial/EditorialDisclosure.jsx';
import { PLACEHOLDER_TEXT } from '../config/site.js';
import { COMPANY_CONTENT } from '../config/content.js';
import { CONTENT_GAPS, ENQUIRY_PATHS } from '../config/informationArchitecture.js';
import { ROUTES, hrefFor } from '../config/routes.js';

const CONTACT_GAP = CONTENT_GAPS.find((gap) => gap.id === 'contact-details');

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Contact HONIESH"
        description="Choose an enquiry path, review the product information you need, and use the form below. No submission is claimed until a real form provider or contact destination is connected."
      />

      <Section
        eyebrow="01 / Enquiry paths"
        title="What would you like to discuss?"
        description="These paths are clear frontend routes for future contact handling, not connected destinations."
      >
        <div className="card-grid">
          {ENQUIRY_PATHS.map((path) => (
            <Card key={path.id} title={path.label} description={path.description}>
              <p className="enquiry-status">Interface status: {path.interfaceStatus}</p>
            </Card>
          ))}
        </div>
        <EditorialDisclosure title="Frontend-only notice">
          <p>Do not treat this form as a working submission endpoint. A destination must be supplied and connected.</p>
        </EditorialDisclosure>
      </Section>

      <Section eyebrow="02 / Details" title="Contact details" variant="split" tinted>
        <div className="card-grid">
          <Card title="Email" description={COMPANY_CONTENT.contact.email || PLACEHOLDER_TEXT} />
          <Card title="Phone" description={COMPANY_CONTENT.contact.phone || PLACEHOLDER_TEXT} />
          <Card title="Address" description={COMPANY_CONTENT.contact.address || PLACEHOLDER_TEXT} />
        </div>
        <EditorialDisclosure title="Required from HONIESH">
          <ul>{(CONTACT_GAP?.items ?? []).map((item) => <li key={item}>{item}</li>)}</ul>
        </EditorialDisclosure>
      </Section>

      <Section
        eyebrow="03 / Message"
        title="Send a message"
        description="Frontend-only form. Completing it does not send a message or create a record."
        variant="split"
      >
        <ContactForm />
      </Section>

      <Section title="Explore before enquiring">
        <div className="cta-panel">
          <div>
            <p className="cta-panel__eyebrow">Product and editorial context</p>
            <h3 className="cta-panel__title">Review the collection first</h3>
            <p className="cta-panel__description">
              Product specifications, journal articles and use contexts can help you prepare a precise enquiry.
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
