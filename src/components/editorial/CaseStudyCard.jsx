import { PACKAGING_BY_ID } from '../../data/packaging.js';
import { ROUTES, hrefFor } from '../../config/routes.js';
import EditorialDisclosure from './EditorialDisclosure.jsx';

export default function CaseStudyCard({ caseStudy }) {
  const formats = caseStudy.relatedPackagingIds
    .map((id) => PACKAGING_BY_ID[id])
    .filter(Boolean);

  return (
    <article className="case-study-card">
      <p className="case-study-card__eyebrow">Illustrative framework</p>
      <h3 className="case-study-card__title">{caseStudy.title}</h3>
      <p className="case-study-card__summary">{caseStudy.summary}</p>
      <ol className="case-study-card__framework">
        {caseStudy.framework.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div className="case-study-card__formats">
        {formats.map((format) => (
          <a key={format.id} href={hrefFor(`${ROUTES.products}/${format.slug}`)}>
            {format.shortName}
          </a>
        ))}
      </div>
      <EditorialDisclosure title="Disclosure">
        <p>{caseStudy.disclosure}</p>
        <p>No client, quotation, statistic or outcome is presented.</p>
      </EditorialDisclosure>
    </article>
  );
}
