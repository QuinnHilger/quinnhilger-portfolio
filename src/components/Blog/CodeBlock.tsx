import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./CodeBlock.css";

interface CodeBlockProps {
  language: string;
  children: string;
}

export function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="code-block">
      <div className="code-block__header">
        <span className="code-block__language">{language}</span>
        <button
          className={`code-block__copy-btn ${copied ? "code-block__copy-btn--copied" : ""}`}
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <span className="code-block__copy-icon">✓</span>
              Copied!
            </>
          ) : (
            <>
              <span className="code-block__copy-icon">📋</span>
              Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          borderRadius: "0 0 8px 8px",
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
