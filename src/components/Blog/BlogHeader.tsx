import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BlogHeader.css";

interface BlogHeaderProps {
  title?: string;
  showTitle?: boolean;
  onFontSizeChange?: (delta: number) => void;
}

export function BlogHeader({
  title,
  showTitle = true,
  onFontSizeChange,
}: BlogHeaderProps) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="reading-progress">
        <div
          className="reading-progress__bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="blog-header">
        <div className="blog-header__container">
          <button className="blog-header__back" onClick={() => navigate(-1)}>
            <span className="blog-header__back-arrow">←</span>
            Back
          </button>

          {showTitle && title && (
            <h1 className="blog-header__title">{title}</h1>
          )}

          <div className="blog-header__actions">
            {onFontSizeChange && (
              <div className="blog-header__font-controls">
                <button
                  className="blog-header__font-btn"
                  onClick={() => onFontSizeChange(-1)}
                  title="Decrease font size"
                >
                  A-
                </button>
                <button
                  className="blog-header__font-btn"
                  onClick={() => onFontSizeChange(1)}
                  title="Increase font size"
                >
                  A+
                </button>
              </div>
            )}

            <button
              className="blog-header__action-btn"
              onClick={handleShare}
              title={copied ? "Copied!" : "Share"}
            >
              {copied ? "✓" : "↗"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

// Simple header for blog list page
export function BlogListHeader() {
  return (
    <header className="blog-header">
      <div className="blog-header__container">
        <Link to="/" className="blog-header__back">
          <span className="blog-header__back-arrow">←</span>
          Portfolio
        </Link>

        <h1 className="blog-header__title">Blog</h1>

        <div className="blog-header__actions">
          {/* Placeholder for symmetry */}
          <div style={{ width: 40 }} />
        </div>
      </div>
    </header>
  );
}
