import { getEditorialVisual } from '../../data/editorialVisuals.js';

export default function EditorialVisual({ visualId, label, large = false, className = '' }) {
  const visual = getEditorialVisual(visualId);
  const classes = ['editorial-visual'];

  if (large) classes.push('editorial-visual--large');
  if (className) classes.push(className);

  const alt = label ? `${label}: ${visual.alt}` : visual.alt;

  return (
    <figure className={classes.join(' ')}>
      <div className="editorial-visual__frame">
        <img
          className="editorial-visual__image"
          src={visual.src}
          alt={alt}
          loading={large ? 'eager' : 'lazy'}
        />
        <span className="editorial-visual__badge">Editorial illustration</span>
      </div>
      <figcaption className="editorial-visual__caption">
        Locally drawn cover artwork. Replace with approved photography when supplied.
      </figcaption>
    </figure>
  );
}
