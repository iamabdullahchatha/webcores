import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallbackMessage?: string;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[AdminErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const msg = this.props.fallbackMessage ?? "Admin panel error — this section failed to load.";

    return (
      <div className="rounded-2xl border border-border/40 bg-muted/10 px-6 py-10 text-center">
        <p className="text-sm font-medium text-foreground">{msg}</p>
        {import.meta.env.DEV && this.state.error?.message && (
          <pre className="mt-4 max-h-40 overflow-auto rounded-md bg-muted p-3 text-left font-mono text-xs text-destructive">
            {this.state.error.message}
          </pre>
        )}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="rounded-xl bg-primary text-primary-foreground px-5 py-2 text-sm font-semibold"
          >
            Retry
          </button>
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl border border-border/60 bg-background px-5 py-2 text-sm font-semibold text-foreground hover:bg-muted/30 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
}

export { AdminErrorBoundary };
