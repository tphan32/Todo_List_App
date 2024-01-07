import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NewTask from "./pages/NewTask";
import Layout from "./components/Layout";
import ViewTask from "./pages/ViewTask";
import UpdateTask from "./pages/UpdateTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "new", element: <NewTask /> },
      { path: "view/:id", element: <ViewTask /> },
      { path: "update/:id", element: <UpdateTask /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
