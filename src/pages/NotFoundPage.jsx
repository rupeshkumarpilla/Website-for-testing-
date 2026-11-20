import PageHeader from '../components/layout/PageHeader.jsx';
import Button from '../components/ui/Button.jsx';
import { ROUTES, hrefFor } from '../config/routes.js';

export default function NotFoundPage() {
  return (
    <PageHeader
      eyebrow="404"
      title="Page not found"
      description="The page you requested does not exist."
    >
      <div className="page-header__actions">
        <Button href={hrefFor(ROUTES.home)}>Back to HONIESH home</Button>
      </div>
    </PageHeader>
  );
}
