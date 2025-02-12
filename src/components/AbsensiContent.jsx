import { useState } from "react";
import AttendanceCamera from "./AttendanceCamera";
import { useTodayAttendance } from "../hooks/useCheckIn";

const AbsensiContent = () => {
  const [showCamera, setShowCamera] = useState(false);
  const { data: attendance, isLoading, refetch } = useTodayAttendance();

  const handleAttendanceSuccess = () => {
    refetch();
    setShowCamera(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto py-20 border border-gray-200 shadow-sm rounded-lg px-8">
      <h1 className="text-2xl font-bold mb-2">Absensi</h1>
      <h2 className="text-emerald-600 text-xl mb-4">Hi, Rafly</h2>
      <p className="text-gray-600 mb-8 border-b border-gray-200 pb-4">
        Halaman ini membantu kamu dalam memantau laporan absensi kamu selama
        Sekolah!
      </p>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Semester
            </label>
            <input
              type="text"
              value="Kelas X (Ganjil)"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowCamera(true)}
          className={`${
            attendance?.isCheckedIn ? "hidden" : "block"
          } bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg transition-colors`}
        >
          Check In
        </button>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-lg border p-6 min-h-[400px]">
        {isLoading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : attendance?.isCheckedIn ? (
          <div className="text-center text-emerald-600 font-medium">
            {attendance.message ||
              "You are currently checked in. Check-in will reset at 00:01 tomorrow."}
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
    </div>
  );
};

export default AbsensiContent;
