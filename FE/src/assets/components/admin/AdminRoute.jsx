import { Navigate, Outlet } from "react-router-dom";
import useUser from "../../script/useUser";

function AdminRoute() {
  const user = useUser();
   if (!user.role) {
    return <p>Loading...</p>;
  }
  if (user.role !== "ADMIN") {
    return <Navigate to="/error" replace />;
  }
  return <Outlet />;
}
export default AdminRoute