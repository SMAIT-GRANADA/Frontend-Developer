import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const GuestRoute = ({ children }) => {
  const token = Cookies.get("token");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (token) {
    return <Navigate to={from} replace />;
  }

  return children;
};

export default GuestRoute;
