import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      Cookies.remove("token");
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  } catch (error) {
    Cookies.remove("token");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
