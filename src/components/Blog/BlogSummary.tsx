import { Link } from "react-router-dom";
import { getRecentPosts } from "../../hooks/blogLoader";
import { BlogCard } from "./BlogCard";
import "./BlogSummary.css";

export function BlogSummary() {
  const recentPosts = getRecentPosts(3);

  return (
    <section className="blog-summary" id="blog">
      <div className="blog-summary__container">
        <div className="blog-summary__header">
          <div className="blog-summary__title-section">
            <span className="blog-summary__icon">✍️</span>
            <h2 className="blog-summary__title">Latest Thoughts</h2>
          </div>
          <Link to="/blog" className="blog-summary__view-all">
            View All Posts
            <span className="blog-summary__view-all-arrow">→</span>
          </Link>
        </div>

        <div className="blog-summary__grid">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} compact />
            ))
          ) : (
            <div className="blog-summary__empty">
              <div className="blog-summary__empty-icon">📝</div>
              <p className="blog-summary__empty-text">
                Posts coming soon! Check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
