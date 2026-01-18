type Mode = "partial" | "full";

interface Props {
  filterNoise: boolean;
  setFilterNoise: (v: boolean) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
}

export default function OptionsPanel({
  filterNoise,
  setFilterNoise,
  mode,
  setMode,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={filterNoise}
          onChange={() => setFilterNoise(!filterNoise)}
        />
        Filter non-resume noise
      </label>

      <div className="space-y-1">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === "partial"}
            onChange={() => setMode("partial")}
          />
          Remove name & Geo location 
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === "full"}
            onChange={() => setMode("full")}
          />
          Remove all bias (Ai Summary)
        </label>
      </div>
    </div>
  );
}
