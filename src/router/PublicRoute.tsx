// src/components/PublicRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";

export default function PublicRoute() {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />;
}
