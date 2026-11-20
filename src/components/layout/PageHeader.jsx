export default function PageHeader({ eyebrow, title, description, children, visual, className = '' }) {
  const classes = ['page-header'];

  if (visual) classes.push('page-header--split');
  if (className) classes.push(className);

  return (
    <header className={classes.join(' ')}>
      <div className="container page-header__container">
        <div className="page-header__content">
          {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
          <h1 className="page-header__title">{title}</h1>
          {description && <p className="page-header__description">{description}</p>}
          {children}
        </div>
        {visual && <div className="page-header__visual" aria-hidden="true">{visual}</div>}
      </div>
    </header>
  );
}
