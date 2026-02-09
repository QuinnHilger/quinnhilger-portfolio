import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component that scrolls to top on route change
 * Should be placed inside a Router component
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
