import { PACKAGING_BY_ID } from '../../data/packaging.js';
import { ROUTES, hrefFor } from '../../config/routes.js';
import EditorialDisclosure from './EditorialDisclosure.jsx';

export default function UseCaseCard({ useCase }) {
  const formats = useCase.suggestedPackagingIds
    .map((id) => PACKAGING_BY_ID[id])
    .filter(Boolean);

  return (
    <article className="use-case-card">
      <p className="use-case-card__eyebrow">Proposed use case</p>
      <h3 className="use-case-card__title">{useCase.title}</h3>
      <p className="use-case-card__description">{useCase.description}</p>
      <ul className="use-case-card__notes">
        {useCase.contextNotes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <div className="use-case-card__formats">
        {formats.map((format) => (
          <a key={format.id} href={hrefFor(`${ROUTES.products}/${format.slug}`)}>
            {format.shortName}
          </a>
        ))}
      </div>
      <EditorialDisclosure title="Status">
        <p>{useCase.isConfirmedPartnership ? 'Confirmed partnership.' : 'No confirmed partnership or customer result is claimed.'}</p>
      </EditorialDisclosure>
    </article>
  );
}
