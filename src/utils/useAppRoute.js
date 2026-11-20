import { useEffect, useState } from 'react';
import { resolveBrowserRoute } from '../config/browserRoute.js';

export function useAppRoute(initialRoute) {
  const [route, setRoute] = useState(initialRoute);

  useEffect(() => {
    const onRouteChange = () => setRoute(resolveBrowserRoute());
    window.addEventListener('popstate', onRouteChange);
    window.addEventListener('hashchange', onRouteChange);
    return () => {
      window.removeEventListener('popstate', onRouteChange);
      window.removeEventListener('hashchange', onRouteChange);
    };
  }, []);

  return route;
}
