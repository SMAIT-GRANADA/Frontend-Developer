import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import VisiMisi from "../pages/VisiMisi";
import News from "../pages/News";
import NotFoundPage from "../pages/NotFoundPage";
import PsbPage from "../pages/PsbPage";
import LoginPage from "../pages/LoginPage";
import StudentDashboardPage from "../pages/StudentDashboardPage";
import ProtectedRoute from "../middlewares/ProtectedRoute";
import SuperAdminDashboard from "../pages/SuperAdminDashboard";
import OtpVerificatinPage from "../pages/OtpVerificatinPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
// import AdminDashboard from "../pages/AdminDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";
import ParentDashboard from "../pages/ParentDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/berita" element={<News />} />
      <Route path="/visi-misi" element={<VisiMisi />} />
      <Route path="/pendaftaran" element={<PsbPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["siswa"]}>
            <StudentDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/otp" element={<OtpVerificatinPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      {/* <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={["guru"]}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/parent"
        element={
          <ProtectedRoute allowedRoles={["ortu"]}>
            <ParentDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
