type Step =
  | "idle"
  | "checking-noise"
  | "noise-failed"
  | "processing-bias"
  | "done";

export default function ProgressPipeline({ step }: { step: Step }) {
  const progressMap: Record<Step, number> = {
    idle: 0,
    "checking-noise": 25,
    "noise-failed": 25,
    "processing-bias": 75,
    done: 100,
  };

  const progress = progressMap[step];

  return (
    <div>
      <div className="flex justify-between text-xs text-neutral-500 mb-1">
        <span>Noise Detection</span>
        <span>Bias Removal</span>
      </div>

      <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
        <div
          className="h-full bg-neutral-900 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 text-xs text-neutral-600">
        {step === "idle" && "Waiting for resume input"}
        {step === "checking-noise" && "Checking if document is a resume"}
        {step === "noise-failed" && "Noise detected — process stopped"}
        {step === "processing-bias" && "Removing bias signals"}
        {step === "done" && "Processing complete"}
      </div>
    </div>
  );
}
