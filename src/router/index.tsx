import { createBrowserRouter } from "react-router-dom";

import Layout from "@/Layout/layout";
import Home from "@/pages/Home";
import Upload from "@/pages/Upload";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "api/admin/upload",
            element: <Upload />,
          },
        ],
      },
    ],
  },

  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
