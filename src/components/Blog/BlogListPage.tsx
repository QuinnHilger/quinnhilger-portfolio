import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getAllBlogPosts,
  getFeaturedPosts,
  getAllTags,
} from "../../hooks/blogLoader";
import { SubPageHeader } from "../SubPageHeader";
import { BlogCard } from "./BlogCard";
import "./BlogListPage.css";

export function BlogListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag");

  const allPosts = getAllBlogPosts();
  const allTags = getAllTags();

  const filteredPosts = useMemo(() => {
    if (!activeTag) return allPosts;
    return allPosts.filter((post) => post.tags.includes(activeTag));
  }, [allPosts, activeTag]);

  const featuredPosts = useMemo(() => {
    if (activeTag) return []; // Don't show featured section when filtering
    return getFeaturedPosts();
  }, [activeTag]);

  const regularPosts = useMemo(() => {
    if (activeTag) return filteredPosts;
    return filteredPosts.filter((post) => !post.featured);
  }, [filteredPosts, activeTag]);

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      setSearchParams({});
    } else {
      setSearchParams({ tag });
    }
  };

  const clearFilter = () => {
    setSearchParams({});
  };

  return (
    <div className="blog-list-page">
      <SubPageHeader />

      <div className="blog-list-page__container">
        <div className="blog-list-page__hero">
          <h1 className="blog-list-page__title">My Thoughts</h1>
          <p className="blog-list-page__subtitle">
            A personal archive of thoughts, rendered into words.
          </p>
        </div>

        {/* Tag Filter */}
        <div className="blog-list-page__filter">
          <div className="blog-list-page__filter-label">Filter by tag:</div>
          <div className="blog-list-page__tags">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`blog-list-page__tag ${activeTag === tag ? "blog-list-page__tag--active" : ""}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          {activeTag && (
            <button
              className="blog-list-page__clear-filter"
              onClick={clearFilter}
            >
              ✕ Clear filter
            </button>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="blog-list-page__empty">
            <div className="blog-list-page__empty-icon">🔍</div>
            <p className="blog-list-page__empty-text">
              {activeTag
                ? `No posts found with tag "${activeTag}"`
                : "No posts yet. Check back soon!"}
            </p>
            {activeTag && (
              <button
                className="blog-list-page__empty-btn"
                onClick={clearFilter}
              >
                View all posts
              </button>
            )}
          </div>
        ) : (
          <>
            {featuredPosts.length > 0 && (
              <section className="blog-list-page__section">
                <div className="blog-list-page__section-header">
                  <h2 className="blog-list-page__section-title">✨ Featured</h2>
                  <div className="blog-list-page__section-line" />
                </div>
                <div className="blog-list-page__featured-grid">
                  {featuredPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )}

            {regularPosts.length > 0 && (
              <section className="blog-list-page__section">
                <div className="blog-list-page__section-header">
                  <h2 className="blog-list-page__section-title">
                    {activeTag ? `Posts tagged "${activeTag}"` : "All Posts"}
                  </h2>
                  <div className="blog-list-page__section-line" />
                </div>
                <div className="blog-list-page__grid">
                  {regularPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
