import PageHeader from '../components/layout/PageHeader.jsx';
import Section from '../components/layout/Section.jsx';
import LoginForm from '../components/LoginForm.jsx';

export default function LoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Account access"
        title="Login"
        description="Account access is a placeholder in this frontend-only build."
      />
      <Section eyebrow="Account access" title="Login form" variant="split">
        <LoginForm />
      </Section>
    </>
  );
}
