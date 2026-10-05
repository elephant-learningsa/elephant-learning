import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export default function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const accessToken =
    localStorage.getItem("access") ||
    sessionStorage.getItem("access");

  const storedUser =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  if (!accessToken || !storedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
