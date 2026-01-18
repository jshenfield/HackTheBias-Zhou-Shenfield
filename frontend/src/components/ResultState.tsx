import ResultPanel from "./ResultPanel";

type Step =
  | "idle"
  | "checking-noise"
  | "noise-failed"
  | "processing-bias"
  | "done";

export default function ResultState({
  step,
  result,
}: {
  step: Step;
  result: any;
}) {
  if (step === "idle") {
    return <EmptyState />;
  }

  if (
    step === "checking-noise" ||
    step === "processing-bias"
  ) {
    return <LoadingState />;
  }

  if (step === "noise-failed") {
    return <NoiseFailedState />;
  }

  if (step === "done" && result) {
    return <ResultPanel result={result} />;
  }

  return null;
}

/* ---------------- States ---------------- */

function EmptyState() {
  return (
    <div className="h-full flex items-center justify-center text-neutral-400 text-sm">
      Process a resume to see bias removed version of the resume
    </div>
  );
}

function LoadingState() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-3">
      <div className="h-8 w-8 rounded-full border-2 border-neutral-300 border-t-neutral-900 animate-spin" />
      <p className="text-sm text-neutral-500">
        Processing resume…
      </p>
    </div>
  );
}

function NoiseFailedState() {
  return (
    <div className="h-full flex items-center justify-center text-red-600 text-sm font-medium">
      This document is not a resume.
    </div>
  );
}
