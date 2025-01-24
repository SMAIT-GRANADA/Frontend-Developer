import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const accessToken = Cookies.get("accessToken");
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      Cookies.remove("accessToken");
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const userRoles = decoded.roles || [];

    if (!allowedRoles.some((role) => userRoles.includes(role))) {
      if (userRoles.includes("superadmin")) {
        return <Navigate to="/superadmin" replace />;
      } else if (userRoles.includes("admin")) {
        return <Navigate to="/admin" replace />;
      } else if (userRoles.includes("guru")) {
        return <Navigate to="/teacher" replace />;
      } else if (userRoles.includes("ortu")) {
        return <Navigate to="/parent" replace />;
      } else if (userRoles.includes("siswa")) {
        return <Navigate to="/student" replace />;
      }
    }

    return children;
  } catch (error) {
    Cookies.remove("accessToken");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
