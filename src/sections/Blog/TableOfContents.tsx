import { useEffect, useState, useMemo } from "react";
import "./TableOfContents.css";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

/** Extract headings from markdown content */
export function extractTocItems(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const extracted: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    extracted.push({ id, text, level });
  }

  return extracted;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // Extract headings from markdown content using useMemo to avoid cascading renders
  const items = useMemo(() => extractTocItems(content), [content]);

  // Track active heading on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66% 0px" },
    );

    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="table-of-contents">
      <h3 className="table-of-contents__title">Contents</h3>
      <ul className="table-of-contents__list">
        {items.map(({ id, text, level }) => (
          <li key={id} className="table-of-contents__item">
            <a
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`table-of-contents__link ${
                level === 3 ? "table-of-contents__link--h3" : ""
              } ${activeId === id ? "table-of-contents__link--active" : ""}`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
