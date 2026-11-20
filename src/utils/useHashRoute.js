import { useEffect, useState } from 'react';
import { ROUTES } from '../config/routes.js';

function readPath() {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash || hash === '/') return ROUTES.home;
  return hash.startsWith('/') ? hash : `/${hash}`;
}

export function useHashRoute() {
  const [path, setPath] = useState(readPath);

  useEffect(() => {
    const onChange = () => setPath(readPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return path;
}
