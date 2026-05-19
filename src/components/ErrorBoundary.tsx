import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "page" | "section";
  fallbackMessage?: string;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const msg = this.props.fallbackMessage ?? "Something went wrong.";

    if (this.props.variant === "section") {
      return (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-5 py-6 text-center">
          <p className="text-sm text-muted-foreground">{msg}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-3 text-xs text-primary underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-lg font-semibold">{msg}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold"
        >
          Refresh Page
        </button>
      </div>
    );
  }
}

export { ErrorBoundary };
