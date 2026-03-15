import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const logged = localStorage.getItem("logged");

  if (logged === "false" || !logged) {
    return <Navigate to="/error" replace />;
  }

  return <Outlet />;
}