import { useMemo } from "react";
import { diffWords } from "diff";
import "./DiffView.css";

interface DiffViewProps {
  rawContent: string;
  polishedContent: string;
}

export function DiffView({ rawContent, polishedContent }: DiffViewProps) {
  const diffResult = useMemo(() => {
    return diffWords(rawContent, polishedContent);
  }, [rawContent, polishedContent]);

  return (
    <div className="diff-view">
      <div className="diff-view__legend">
        <div className="diff-view__legend-item">
          <span className="diff-view__legend-color diff-view__legend-color--removed" />
          <span>Removed from raw</span>
        </div>
        <div className="diff-view__legend-item">
          <span className="diff-view__legend-color diff-view__legend-color--added" />
          <span>Added in polished</span>
        </div>
      </div>

      <div className="diff-view__content">
        {diffResult.map((part, index) => {
          if (part.added) {
            return (
              <span key={index} className="diff-view__added">
                {part.value}
              </span>
            );
          }
          if (part.removed) {
            return (
              <span key={index} className="diff-view__removed">
                {part.value}
              </span>
            );
          }
          return <span key={index}>{part.value}</span>;
        })}
      </div>
    </div>
  );
}
