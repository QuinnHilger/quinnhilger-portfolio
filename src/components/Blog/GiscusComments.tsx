import { useEffect, useRef } from "react";
import "./GiscusComments.css";

interface GiscusCommentsProps {
  term: string; // Usually the blog post slug or title
}

export function GiscusComments({ term }: GiscusCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing Giscus iframe
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    // Configure Giscus - User will need to update these values
    script.setAttribute("data-repo", "QuinnHilger/quinnhilger-portfolio");
    script.setAttribute("data-repo-id", "R_kgDORGN90A");
    script.setAttribute("data-category", "Blog Comments");
    script.setAttribute("data-category-id", "DIC_kwDORGN90M4C1_L4");
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", term);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "dark");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");

    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [term]);

  return (
    <section className="giscus-comments">
      <h2 className="giscus-comments__title">💬 Comments</h2>
      <p className="giscus-comments__subtitle">
        Share your thoughts! Comments are powered by GitHub Discussions.
      </p>
      <div ref={containerRef} className="giscus-comments__container" />
    </section>
  );
}
