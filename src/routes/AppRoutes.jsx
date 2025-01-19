import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import VisiMisi from "../pages/VisiMisi";
import NotFoundPage from "../pages/NotFoundPage";
import PsbPage from "../pages/PsbPage";
import LoginPage from "../pages/LoginPage";
import StudentDashboardPage from "../pages/StudentDashboardPage";
import ProtectedRoute from "../middlewares/ProtectedRoute";
import GuestRoute from "../middlewares/GuestRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/visi-misi" element={<VisiMisi />} />
      <Route path="/pendaftaran" element={<PsbPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <StudentDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
