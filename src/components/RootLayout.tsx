import { Outlet } from "react-router-dom";
import { ScrollToTop } from "./ScrollToTop";

/**
 * Root layout wrapper that provides scroll-to-top on navigation
 */
export function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
