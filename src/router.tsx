import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { BlogListPage } from "./components/Blog/BlogListPage";
import { BlogReadingPage } from "./components/Blog/BlogReadingPage";
import { ProjectsPage } from "./components/ProjectsPage";
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
