export default function StatusNotice({ tone = 'info', children }) {
  if (!children) return null;
  const role = tone === 'error' ? 'alert' : 'status';
  return <div className={`notice notice--${tone}`} role={role}>{children}</div>;
}
