import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPostBySlug, getAdjacentPosts } from "../../hooks/blogLoader";
import { BlogHeader } from "./BlogHeader";
import { VersionToggle, type VersionType } from "./VersionToggle";
import { TableOfContents, extractTocItems } from "./TableOfContents";
import { DiffView } from "./DiffView";
import { CodeBlock } from "./CodeBlock";
import { PostNavigation } from "./PostNavigation";
import { GiscusComments } from "./GiscusComments";
import "./BlogReadingPage.css";

export function BlogReadingPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = useMemo(() => getBlogPostBySlug(slug || ""), [slug]);
  const { prev, next } = useMemo(() => getAdjacentPosts(slug || ""), [slug]);

  const [version, setVersion] = useState<VersionType>("polished");
  const [showDiff, setShowDiff] = useState(false);
  const [fontSize, setFontSize] = useState(1.1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleVersionChange = (newVersion: VersionType) => {
    if (newVersion !== version) {
      setIsTransitioning(true);
      setTimeout(() => {
        setVersion(newVersion);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleFontSizeChange = (delta: number) => {
    setFontSize((prev) => Math.min(1.5, Math.max(0.9, prev + delta * 0.1)));
  };

  if (!post) {
    return (
      <div className="blog-reading-page">
        <BlogHeader title="Not Found" />
        <div className="blog-reading-page__not-found">
          <div className="blog-reading-page__not-found-icon">📭</div>
          <p className="blog-reading-page__not-found-text">Post not found</p>
          <Link to="/blog" className="blog-reading-page__not-found-btn">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const currentContent =
    version === "raw" ? post.rawContent : post.polishedContent;
  const formattedDate = new Date(post.publishedDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  // Generate heading IDs for markdown
  const generateId = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <div className="blog-reading-page">
      <BlogHeader title={post.title} onFontSizeChange={handleFontSizeChange} />

      <div className="blog-reading-page__container">
        <main className="blog-reading-page__main">
          {/* Cover Image */}
          <div className="blog-reading-page__cover">
            {post.coverImage ? (
              <img
                src={`${import.meta.env.BASE_URL}${post.coverImage.startsWith("/") ? post.coverImage.slice(1) : post.coverImage}`}
                alt={post.title}
                className="blog-reading-page__cover-img"
              />
            ) : (
              <div className="blog-reading-page__cover-placeholder">📝</div>
            )}
          </div>

          {/* Header */}
          <header className="blog-reading-page__header">
            <h1 className="blog-reading-page__title">{post.title}</h1>
            <div className="blog-reading-page__meta">
              <span className="blog-reading-page__meta-item">
                📅 {formattedDate}
              </span>
              <span className="blog-reading-page__meta-item">
                ⏱️ {post.readingTime} min read
              </span>
            </div>
            <div className="blog-reading-page__tags">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="blog-reading-page__tag"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </header>

          {/* Version Toggle */}
          <div className="blog-reading-page__toggle-section">
            <VersionToggle
              version={version}
              onVersionChange={handleVersionChange}
              showDiff={showDiff}
              onDiffToggle={() => setShowDiff(!showDiff)}
            />
          </div>

          {/* Table of Contents - Mobile Only */}
          {extractTocItems(currentContent).length > 0 && (
            <div className="blog-reading-page__mobile-toc">
              <TableOfContents content={currentContent} />
            </div>
          )}

          {/* Content */}
          <article
            className={`blog-reading-page__content-wrapper ${
              isTransitioning
                ? "blog-reading-page__content-wrapper--transitioning"
                : ""
            }`}
          >
            {showDiff ? (
              <DiffView
                rawContent={post.rawContent}
                polishedContent={post.polishedContent}
              />
            ) : (
              <div
                className="blog-reading-page__content"
                style={{ fontSize: `${fontSize}rem` }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children, ...props }) => {
                      const id = generateId(String(children));
                      return (
                        <h2 id={id} {...props}>
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children, ...props }) => {
                      const id = generateId(String(children));
                      return (
                        <h3 id={id} {...props}>
                          {children}
                        </h3>
                      );
                    },
                    code({ className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      const isInline = !match;
                      const codeString = String(children).replace(/\n$/, "");

                      return isInline ? (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      ) : (
                        <CodeBlock language={match[1]}>{codeString}</CodeBlock>
                      );
                    },
                    img: (props) => {
                      const { src, alt, ...rest } = props;
                      if (!src) return null;
                      const isExternal = src.startsWith("http");
                      const normalizedSrc = isExternal
                        ? src
                        : `${import.meta.env.BASE_URL}${src.startsWith("/") ? src.slice(1) : src}`;

                      return <img src={normalizedSrc} alt={alt} {...rest} />;
                    },
                  }}
                >
                  {currentContent}
                </ReactMarkdown>
              </div>
            )}
          </article>

          {/* Previous/Next Navigation */}
          <PostNavigation prevPost={prev} nextPost={next} />

          {/* Comments */}
          <GiscusComments term={post.slug} />
        </main>

        {/* Sidebar with TOC - Desktop Only */}
        <aside className="blog-reading-page__sidebar">
          <TableOfContents content={currentContent} />
        </aside>
      </div>
    </div>
  );
}
