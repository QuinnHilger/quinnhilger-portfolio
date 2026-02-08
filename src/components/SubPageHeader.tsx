import { Link, useLocation } from "react-router-dom";
import "./SubPageHeader.css";

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path
      d="M19 12H5M12 19l-7-7 7-7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface NavTab {
  path: string;
  label: string;
}

const NAV_TABS: NavTab[] = [
  { path: "/blog", label: "Blog" },
  { path: "/projects", label: "Projects" },
];

export function SubPageHeader() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="subpage-header" aria-label="Sub-page navigation">
      <div className="subpage-header__pill">
        <Link to="/" className="subpage-header__back">
          <ArrowLeftIcon />
          <span>Portfolio</span>
        </Link>
        <span className="subpage-header__divider" />
        {NAV_TABS.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`subpage-header__tab ${currentPath === tab.path ? "subpage-header__tab--active" : ""}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
