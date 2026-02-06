import { Link } from "react-router-dom";
import type { BlogPost } from "../../hooks/blogLoader";
import "./PostNavigation.css";

interface PostNavigationProps {
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  if (!prevPost && !nextPost) return null;

  return (
    <nav className="post-navigation">
      <div className="post-navigation__container">
        {prevPost ? (
          <Link
            to={`/blog/${prevPost.slug}`}
            className="post-navigation__link post-navigation__link--prev"
          >
            <span className="post-navigation__label">
              <span className="post-navigation__arrow">←</span>
              Previous
            </span>
            <span className="post-navigation__title">{prevPost.title}</span>
          </Link>
        ) : (
          <div className="post-navigation__placeholder" />
        )}

        {nextPost ? (
          <Link
            to={`/blog/${nextPost.slug}`}
            className="post-navigation__link post-navigation__link--next"
          >
            <span className="post-navigation__label">
              Next
              <span className="post-navigation__arrow">→</span>
            </span>
            <span className="post-navigation__title">{nextPost.title}</span>
          </Link>
        ) : (
          <div className="post-navigation__placeholder" />
        )}
      </div>
    </nav>
  );
}
