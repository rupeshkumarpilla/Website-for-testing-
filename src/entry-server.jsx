import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

export function renderRoute(route) {
  return renderToString(
    <React.StrictMode>
      <ErrorBoundary>
        <App initialRoute={route} />
      </ErrorBoundary>
    </React.StrictMode>,
  );
}
