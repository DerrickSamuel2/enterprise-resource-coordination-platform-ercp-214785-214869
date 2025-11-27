import React from 'react';

// PUBLIC_INTERFACE
// ErrorBoundary catches runtime errors and presents a friendly message.
export default class ErrorBoundary extends React.Component {
  /** This is a public class that provides an error boundary. */
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // We could log to an external service here if needed
    // console.error('ErrorBoundary caught', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h1>Something went wrong.</h1>
          <p>An unexpected error occurred in the application UI.</p>
          <details style={{ whiteSpace: 'pre-wrap', color: '#888' }}>
            {String(this.state.error)}
          </details>
          <button onClick={() => window.location.reload()} className="theme-toggle" style={{ position: 'static', marginTop: 16 }}>
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
