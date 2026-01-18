type Mode = "partial" | "full";

interface Props {
  mode: Mode;
  setMode: (m: Mode) => void;
}

export default function OptionsPanel({
  mode,
  setMode,
}: Props) {
  return (
    <div className="space-y-4 text-sm">
      {/* Noise filtering (mandatory, informational) */}
      <div className="rounded-lg border bg-neutral-50 px-4 py-3 text-neutral-700">
        <div className="font-medium">
          Noise filtering
        </div>
        <p className="text-xs text-neutral-500 mt-1">
          Non-resume documents are automatically filtered
          before bias processing.
        </p>
      </div>

      {/* Mode selection */}
      <div className="space-y-2">
        <div className="font-medium">
          Bias removal mode
        </div>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === "partial"}
            onChange={() => setMode("partial")}
          />
          <span>
            Remove name & location bias
          </span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === "full"}
            onChange={() => setMode("full")}
          />
          <span>
            Remove all bias (AI-generated summary)
          </span>
        </label>
      </div>
    </div>
  );
}
