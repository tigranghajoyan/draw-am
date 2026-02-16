import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
          <h1 className="text-4xl font-heading font-bold text-charcoal-darker uppercase tracking-wider">
            Something went wrong
          </h1>
          <p className="mt-4 text-charcoal leading-relaxed max-w-md">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-8 px-8 py-3 border-2 border-charcoal-darker text-charcoal-darker uppercase tracking-wider font-heading hover:bg-charcoal-darker hover:text-white transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
