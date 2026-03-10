import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component that scrolls to top on route change.
 * Uses useLayoutEffect to fire synchronously before paint,
 * preventing a flash of the old scroll position.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
