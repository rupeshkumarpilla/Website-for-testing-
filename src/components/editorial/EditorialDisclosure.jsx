export default function EditorialDisclosure({ title, children, className = '' }) {
  return (
    <aside className={`editorial-disclosure ${className}`.trim()}>
      <p className="editorial-disclosure__title">{title}</p>
      <div className="editorial-disclosure__body">{children}</div>
    </aside>
  );
}
