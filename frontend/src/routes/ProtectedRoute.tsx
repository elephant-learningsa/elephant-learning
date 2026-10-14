import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

interface StoredUser {
  role?: string;
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

  // Require authentication
  if (!accessToken || !storedUser) {
    return <Navigate to="/login" replace />;
  }

  let user: StoredUser;

  try {
    user = JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    localStorage.removeItem("access");
    sessionStorage.removeItem("access");

    return <Navigate to="/login" replace />;
  }

  // Check the user's role
  if (allowedRoles && !allowedRoles.includes(user.role ?? "")) {
    switch (user.role) {
      case "SCHOOL":
        return <Navigate to="/school/dashboard" replace />;

      case "TEACHER":
        return <Navigate to="/teacher/dashboard" replace />;

      case "ADMIN":
        return <Navigate to="/admin/dashboard" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
}
