// MatchErrorBoundary.tsx
import React from "react";

type Props = { children: React.ReactNode };

type State = { hasError: boolean };

class MatchErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    // optional: log to Sentry, console, etc.
    console.error("MatchedContent render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong while generating the compatibility report.
          Please try again after re‑entering the details.
        </div>
      );
    }
    return this.props.children;
  }
}

export default MatchErrorBoundary;
