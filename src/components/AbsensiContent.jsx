import { useState } from "react";
import AttendanceCamera from "./AttendanceCamera";
import { useTodayAttendance } from "../hooks/useCheckIn";
import { format } from "date-fns";
import { useGetUserByIdQuery } from "../hooks/useGetUserQuery";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const AbsensiContent = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const { data: attendance, isLoading, refetch } = useTodayAttendance();

  const token = Cookies.get("accessToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.id;

  const { data: userData } = useGetUserByIdQuery(userId);

  const handleAttendanceSuccess = () => {
    refetch();
    setShowCamera(false);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMMM yyyy HH:mm:ss");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto py-20 border border-gray-200 shadow-sm rounded-lg px-8">
      <h1 className="text-2xl font-bold mb-2">Absensi</h1>
      <h2 className="text-emerald-600 text-xl mb-4">
        Hi, {userData?.data?.name || "Siswa"}
      </h2>
      <p className="text-gray-600 mb-8 border-b border-gray-200 pb-4">
        Halaman ini membantu kamu dalam memantau laporan absensi kamu selama
        Sekolah!
      </p>

      <div className="flex justify-end">
        <button
          onClick={() => setShowCamera(true)}
          className={`${
            attendance?.data ? "hidden" : "block"
          } bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg transition-colors`}
        >
          Check In
        </button>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-lg border p-6">
        {isLoading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : attendance?.data ? (
          <div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
              <p className="text-emerald-700 font-medium">
                {attendance.message}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all">
                <p className="text-gray-500 text-sm mb-2">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                  {attendance.data.status}
                </span>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all">
                <p className="text-gray-500 text-sm mb-2">Check-in Time</p>
                <p className="text-gray-900 font-medium">
                  {formatDate(attendance.data.checkInTime)}
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all">
                <p className="text-gray-500 text-sm mb-2">Photo</p>
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Lihat Foto
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <AttendanceCamera
              onSuccess={handleAttendanceSuccess}
              onClose={() => setShowCamera(false)}
            />
          </div>
        </div>
      )}

      {showPhotoModal && attendance?.data?.checkInPhotoUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          onClick={() => setShowPhotoModal(false)}
        >
          <div
            className="bg-white rounded-lg p-4 max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <img
              src={attendance.data.checkInPhotoUrl}
              alt="Check-in photo"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AbsensiContent;
