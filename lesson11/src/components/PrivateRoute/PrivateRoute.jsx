import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useStore";

export default function PrivateRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}
