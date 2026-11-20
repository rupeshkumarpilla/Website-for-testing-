import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Application error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary">
          <div className="container">
            <h1>Something went wrong</h1>
            <p>The page could not be displayed. Please reload the site.</p>
            <button
              type="button"
              className="button button--primary"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
