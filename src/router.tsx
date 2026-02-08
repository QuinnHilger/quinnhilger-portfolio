import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { BlogListPage } from "./components/Blog/BlogListPage";
import { BlogReadingPage } from "./components/Blog/BlogReadingPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/blog",
      element: <BlogListPage />,
    },
    {
      path: "/blog/:slug",
      element: <BlogReadingPage />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
