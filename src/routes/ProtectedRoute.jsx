
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Authentication check complete hone tak loading dikhao.
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
          <p className="mt-4 text-sm text-gray-600">
            Please wait...
          </p>
        </div>
      </div>
    );
  }

  // Login nahi hai toh login page par bhejo.
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to={adminOnly ? "/admin/login" : "/login"}
        state={{ from: location }}
        replace
      />
    );
  }

  // Admin-only page ke liye role check.
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Children ya nested route render karo.
  return children ? children : <Outlet />;
}

export default ProtectedRoute;
