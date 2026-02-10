import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BlogHeader.css";

interface BlogHeaderProps {
  title?: string;
  onFontSizeChange?: (delta: number) => void;
}

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path
      d="M19 12H5M12 19l-7-7 7-7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="breadcrumb-chevron"
  >
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path
      d="M12 3v12M12 3l4 4M12 3L8 7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function BlogHeader({ title, onFontSizeChange }: BlogHeaderProps) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isMobileHidden, setIsMobileHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollProgress)));

      // Hide header on mobile after scrolling past 100px
      if (window.innerWidth <= 768) {
        setIsMobileHidden(scrollTop > 100);
      } else {
        setIsMobileHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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

  // Truncate title for breadcrumb if too long
  const truncatedTitle =
    title && title.length > 30 ? title.substring(0, 30) + "..." : title;

  return (
    <>
      <div className="reading-progress">
        <div
          className="reading-progress__bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav className={`blog-reading-header ${isMobileHidden ? "blog-reading-header--hidden" : ""}`} aria-label="Blog reading navigation">
        <div className="blog-reading-header__pill">
          {/* Breadcrumb Navigation */}
          <div className="blog-reading-header__breadcrumb">
            <Link to="/" className="blog-reading-header__crumb">
              <ArrowLeftIcon />
              <span>Portfolio</span>
            </Link>
            <ChevronIcon />
            <Link to="/blog" className="blog-reading-header__crumb">
              Blog
            </Link>
            {title && (
              <>
                <ChevronIcon />
                <span
                  className="blog-reading-header__crumb blog-reading-header__crumb--current"
                  title={title}
                >
                  {truncatedTitle}
                </span>
              </>
            )}
          </div>

          {/* Divider */}
          <span className="blog-reading-header__divider" />

          {/* Actions */}
          <div className="blog-reading-header__actions">
            {onFontSizeChange && (
              <>
                <button
                  className="blog-reading-header__action-btn"
                  onClick={() => onFontSizeChange(-1)}
                  title="Decrease font size"
                >
                  A-
                </button>
                <button
                  className="blog-reading-header__action-btn"
                  onClick={() => onFontSizeChange(1)}
                  title="Increase font size"
                >
                  A+
                </button>
              </>
            )}
            <button
              className="blog-reading-header__action-btn blog-reading-header__action-btn--share"
              onClick={handleShare}
              title={copied ? "Copied!" : "Share"}
            >
              {copied ? <CheckIcon /> : <ShareIcon />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

// Simple header for blog list page - floating glassmorphic style
export function BlogListHeader() {
  const [isMobileHidden, setIsMobileHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setIsMobileHidden(window.scrollY > 100);
      } else {
        setIsMobileHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <nav className={`blog-list-header ${isMobileHidden ? "blog-list-header--hidden" : ""}`} aria-label="Blog navigation">
      <div className="blog-list-header__pill">
        <Link to="/" className="blog-list-header__back">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="blog-list-header__icon"
          >
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Portfolio</span>
        </Link>
        <span className="blog-list-header__divider" />
        <span className="blog-list-header__label">Blog</span>
      </div>
    </nav>
  );
}
