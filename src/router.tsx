
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { BlogListPage } from "./sections/Blog/BlogListPage";
import { BlogReadingPage } from "./sections/Blog/BlogReadingPage";
import { ProjectsPage } from "./sections/Projects/ProjectsPage";
import { RootLayout } from "./components/RootLayout";

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
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
        {
          path: "/projects",
          element: <ProjectsPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
