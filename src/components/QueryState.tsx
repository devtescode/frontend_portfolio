import type { ReactNode } from "react";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/apiClient";

interface QueryStateProps {
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
  isEmpty?: boolean;
  onRetry?: () => void;
  loadingLabel?: string;
  loadingContent?: ReactNode;
  emptyTitle?: string;
  emptyMessage?: string;
  emptyAction?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * One wrapper for the three states every data-driven view needs. Keeps
 * consumers from silently rendering "No projects yet" when the API failed.
 */
export const QueryState = ({
  isLoading,
  isError,
  error,
  isEmpty,
  onRetry,
  loadingLabel = "Loading…",
  loadingContent,
  emptyTitle = "Nothing here yet",
  emptyMessage = "There is no data to display right now.",
  emptyAction,
  className = "",
  children,
}: QueryStateProps) => {
  if (isLoading) {
    if (loadingContent) return <>{loadingContent}</>;

    return (
      <div className={`flex flex-col items-center justify-center gap-4 py-20 ${className}`}>
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">{loadingLabel}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`glass-card mx-auto max-w-lg rounded-2xl p-8 text-center ${className}`}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-7 w-7 text-destructive" />
        </div>
        <h3 className="mb-2 text-xl font-bold font-display">Something went wrong</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          {getErrorMessage(error, "We couldn't load this content. Please try again.")}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={`glass-card mx-auto max-w-lg rounded-2xl p-10 text-center ${className}`}>
        <h3 className="mb-2 text-xl font-bold font-display">{emptyTitle}</h3>
        <p className="mb-6 text-muted-foreground">{emptyMessage}</p>
        {emptyAction}
      </div>
    );
  }

  return <>{children}</>;
};

export default QueryState;
