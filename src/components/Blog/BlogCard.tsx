import { Link } from "react-router-dom";
import type { BlogPost } from "../../hooks/blogLoader";
import "./BlogCard.css";

interface BlogCardProps {
  post: BlogPost;
  compact?: boolean;
}

export function BlogCard({ post, compact = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`blog-card ${compact ? "blog-card--compact" : ""}`}
    >
      <div className="blog-card__image-container">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="blog-card__image"
            loading="lazy"
          />
        ) : (
          <div className="blog-card__image-placeholder">📝</div>
        )}
        {post.featured && (
          <span className="blog-card__featured-badge">Featured</span>
        )}
      </div>

      <div className="blog-card__content">
        <div className="blog-card__meta">
          <span className="blog-card__date">📅 {formattedDate}</span>
          <span className="blog-card__reading-time">
            ⏱️ {post.readingTime} min read
          </span>
        </div>

        <h3 className="blog-card__title">{post.title}</h3>

        <p className="blog-card__summary">{post.summary}</p>

        <div className="blog-card__tags">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="blog-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
