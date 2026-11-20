import { useEffect, useState } from 'react';
import { ROUTES } from '../config/routes.js';

function readPath() {
  const rawPath = window.location.hash.replace(/^#/, '').split('?')[0];
  if (!rawPath || rawPath === '/') return ROUTES.home;
  const normalizedPath = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;
  return normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
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
