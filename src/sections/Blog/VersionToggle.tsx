import "./VersionToggle.css";

export type VersionType = "raw" | "polished";

interface VersionToggleProps {
  version: VersionType;
  onVersionChange: (version: VersionType) => void;
  showDiff: boolean;
  onDiffToggle: () => void;
}

export function VersionToggle({
  version,
  onVersionChange,
  showDiff,
  onDiffToggle,
}: VersionToggleProps) {
  return (
    <div className="version-toggle">
      <div className="version-toggle__pill">
        <div
          className={`version-toggle__slider ${
            version === "raw" ? "version-toggle__slider--raw" : ""
          }`}
        />
        <button
          className={`version-toggle__option ${
            version === "polished" ? "version-toggle__option--active" : ""
          }`}
          onClick={() => onVersionChange("polished")}
        >
          ✨ Polished
        </button>
        <button
          className={`version-toggle__option ${
            version === "raw" ? "version-toggle__option--active" : ""
          }`}
          onClick={() => onVersionChange("raw")}
        >
          ✏️ Raw
        </button>
      </div>

      <button
        className={`version-toggle__diff-btn ${showDiff ? "version-toggle__diff-btn--active" : ""}`}
        onClick={onDiffToggle}
      >
        🔍 {showDiff ? "Hide" : "Show"} Diff
      </button>

      <div className="version-toggle__info">
        <button className="version-toggle__info-btn">?</button>
        <div className="version-toggle__tooltip">
          <h4>✏️ Raw Version</h4>
          <p>My original, unedited writing—typos, casual tone, and all.</p>
          <div className="version-toggle__tooltip-divider" />
          <h4>✨ Polished Version</h4>
          <p>AI-enhanced for clarity, grammar, and professional tone.</p>
          <div className="version-toggle__tooltip-divider" />
          <h4>🔍 Diff View</h4>
          <p>See exactly what the AI changed, highlighted inline.</p>
        </div>
      </div>
    </div>
  );
}
