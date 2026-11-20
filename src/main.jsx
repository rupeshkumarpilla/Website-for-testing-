import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { resolveBrowserRoute } from './config/browserRoute.js';
import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/app.css';
import './styles/products.css';
import './styles/editorial.css';

const container = document.getElementById('root');
const initialRoute = resolveBrowserRoute();
const app = (
  <React.StrictMode>
    <ErrorBoundary>
      <App initialRoute={initialRoute} />
    </ErrorBoundary>
  </React.StrictMode>
);

if (container.dataset.routeId && container.dataset.routeId === initialRoute.id) {
  hydrateRoot(container, app);
} else {
  container.innerHTML = '';
  createRoot(container).render(app);
}
