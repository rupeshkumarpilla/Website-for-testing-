export default function TextArea({ id, label, ...props }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      <textarea className="field__input field__textarea" id={id} name={id} {...props} />
    </div>
  );
}
