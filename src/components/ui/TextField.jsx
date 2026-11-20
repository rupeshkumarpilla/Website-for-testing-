export default function TextField({ id, label, type = 'text', ...props }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      <input className="field__input" id={id} name={id} type={type} {...props} />
    </div>
  );
}
