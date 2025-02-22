import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Users, Clock, AlertTriangle, XCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import TeacherAttendanceCamera from "./TeacherAttendanceCamera";
import {
  useTeacherTodayAttendance,
  useTeacherAttendanceHistory,
} from "../../hooks/useTeacherAttendance";
import Swal from "sweetalert2";

const ATTENDANCE_START_HOUR = 8; // 8 AM
const ATTENDANCE_LATE_HOUR = 9; // 9 AM
const ATTENDANCE_LATE_MINUTE = 30;

const AttendanceSection = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const {
    data: todayAttendance,
    isLoading: todayLoading,
    refetch: refetchToday,
  } = useTeacherTodayAttendance();

  const { data: historyData, isLoading: historyLoading } =
    useTeacherAttendanceHistory();

  const checkAttendanceTime = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < ATTENDANCE_START_HOUR) {
      Swal.fire({
        title: "Belum Waktunya Absen",
        text: "Absensi hanya dapat dilakukan mulai pukul 8 pagi",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return false;
    }
    return true;
  };

  const handleOpenCamera = (checkoutMode = false) => {
    if (!checkoutMode && !checkAttendanceTime()) {
      return;
    }
    setIsCheckout(checkoutMode);
    setShowCamera(true);
  };

  const handleAttendanceSuccess = () => {
    refetchToday();
    setShowCamera(false);

    const message = isCheckout
      ? "Check-out berhasil dicatat. Terima kasih atas kerja keras Anda hari ini!"
      : "Check-in berhasil dicatat. Selamat menjalankan tugas!";

    Swal.fire({
      title: "Sukses!",
      text: message,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMMM yyyy HH:mm:ss");
  };

  const attendanceData = historyData?.data || [];
  const stats = {
    total: attendanceData.length,
    hadir: attendanceData.filter((item) => item.status === "hadir").length,
    telat: attendanceData.filter((item) => item.status === "telat").length,
    izin: attendanceData.filter((item) => item.status === "izin").length,
    alpha: attendanceData.filter((item) => item.status === "alpha").length,
  };

  const pieData = [
    { name: "Hadir Tepat Waktu", value: stats.hadir },
    { name: "Terlambat", value: stats.telat },
    { name: "Izin", value: stats.izin },
    { name: "Alpha", value: stats.alpha },
  ];

  const COLORS = ["#22c55e", "#f43f5e", "#3b82f6", "#eab308"];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Manajemen Kehadiran</h1>
            <p className="text-gray-600 mt-1">
              Pantau dan kelola kehadiran Anda di sekolah
            </p>
          </div>
          <div className="space-x-4">
            {todayAttendance?.data?.checkInTime &&
            !todayAttendance?.data?.checkOutTime ? (
              <button
                onClick={() => handleOpenCamera(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Check Out
              </button>
            ) : !todayAttendance?.data?.checkInTime ? (
              <button
                onClick={() => handleOpenCamera(false)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Check In
              </button>
            ) : null}
          </div>
        </div>

        {/* Today's Attendance Status */}
        {todayLoading ? (
          <div className="text-center text-gray-600 py-8">
            Loading attendance data...
          </div>
        ) : todayAttendance?.data ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">
              Status Kehadiran Hari Ini
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-500 text-sm mb-1">Check-in Time</p>
                <p className="text-gray-900 font-medium">
                  {formatDate(todayAttendance.data.checkInTime)}
                </p>
              </div>

              {todayAttendance.data.checkOutTime && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-500 text-sm mb-1">Check-out Time</p>
                  <p className="text-gray-900 font-medium">
                    {formatDate(todayAttendance.data.checkOutTime)}
                  </p>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-500 text-sm mb-1">Status</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    todayAttendance.data.status === "hadir"
                      ? "bg-emerald-100 text-emerald-800"
                      : todayAttendance.data.status === "telat"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {todayAttendance.data.status === "hadir"
                    ? "Hadir Tepat Waktu"
                    : todayAttendance.data.status === "telat"
                    ? "Terlambat"
                    : todayAttendance.data.status}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 rounded-full">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Kehadiran</p>
                <p className="text-2xl font-semibold">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tepat Waktu</p>
                <p className="text-2xl font-semibold">{stats.hadir}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Terlambat</p>
                <p className="text-2xl font-semibold">{stats.telat}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <XCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Alpha</p>
                <p className="text-2xl font-semibold">{stats.alpha}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-lg font-semibold mb-4">Statistik Kehadiran</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <TeacherAttendanceCamera
              onSuccess={handleAttendanceSuccess}
              onClose={() => setShowCamera(false)}
              isCheckout={isCheckout}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceSection;
