type Step =
  | "idle"
  | "checking-noise"
  | "noise-failed"
  | "processing-bias"
  | "done";

const steps = [
  { key: "checking-noise", label: "Noise Detection" },
  { key: "processing-bias", label: "Bias Processing" },
];

export default function ProgressPipeline({
  step,
}: {
  step: Step;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((s, idx) => {
          const isActive =
            step === s.key ||
            (idx === 1 && step === "done");

          const isComplete =
            (idx === 0 &&
              ["processing-bias", "done"].includes(step)) ||
            (idx === 1 && step === "done");

          const isFailed =
            step === "noise-failed" && idx === 0;

          return (
            <div
              key={s.key}
              className="flex-1 flex flex-col items-center"
            >
              {/* Circle */}
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${
                    isFailed
                      ? "bg-red-500 text-white"
                      : isComplete
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-neutral-900 text-white animate-pulse"
                      : "bg-neutral-200 text-neutral-600"
                  }`}
              >
                {isComplete ? "✓" : idx + 1}
              </div>

              {/* Label */}
              <span className="mt-2 text-xs text-neutral-600">
                {s.label}
              </span>

              {/* Connector */}
              {idx === 0 && (
                <div className="absolute left-1/2 top-4 w-full h-0.5 bg-neutral-200 -z-10" />
              )}
            </div>
          );
        })}
      </div>

      {/* Status text */}
      <div className="mt-4 text-center text-sm">
        {step === "idle" && (
          <span className="text-neutral-500">
            Upload a resume to begin
          </span>
        )}
        {step === "checking-noise" && (
          <span className="text-neutral-700">
            Checking if the document is a resume…
          </span>
        )}
        {step === "noise-failed" && (
          <span className="text-red-600 font-medium">
            This document is not a resume.
          </span>
        )}
        {step === "processing-bias" && (
          <span className="text-neutral-700">
            Removing bias from resume content…
          </span>
        )}
        {step === "done" && (
          <span className="text-green-600 font-medium">
            Processing complete
          </span>
        )}
      </div>
    </div>
  );
}
