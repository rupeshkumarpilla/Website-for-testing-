export default function Card({ title, description, footer, children, className = '' }) {
  return (
    <article className={`card ${className}`.trim()}>
      <div className="card__body">
        {title && <h3 className="card__title">{title}</h3>}
        {description && <p className="card__description">{description}</p>}
        {children}
      </div>
      {footer && <div className="card__footer">{footer}</div>}
    </article>
  );
}
