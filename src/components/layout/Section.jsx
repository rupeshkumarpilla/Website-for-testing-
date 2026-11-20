export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
  variant = 'stack',
  tinted = false,
}) {
  const classes = ['section', `section--${variant}`];

  if (tinted) classes.push('section--tinted');
  if (className) classes.push(className);

  return (
    <section id={id} className={classes.join(' ')}>
      <div className="container section__container">
        {(eyebrow || title || description) && (
          <div className="section__heading">
            {eyebrow && <p className="section__eyebrow">{eyebrow}</p>}
            {title && <h2 className="section__title">{title}</h2>}
            {description && <p className="section__description">{description}</p>}
          </div>
        )}
        <div className="section__content">{children}</div>
      </div>
    </section>
  );
}
