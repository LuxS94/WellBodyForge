import { Navigate, Outlet } from "react-router-dom";

 function ProtectedRoute() {
  const logged = localStorage.getItem("logged");

  if (logged === "false" || !logged) {
    return <Navigate to="/error" replace />;
  }

  return <Outlet />;
}
export default ProtectedRoute