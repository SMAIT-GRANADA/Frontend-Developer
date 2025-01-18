import { useState, useEffect } from "react";
import AttendanceCamera from "./AttendanceCamera";

const AbsensiContent = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    const loadAttendanceState = () => {
      const savedAttendance = localStorage.getItem("attendanceStatus");
      if (savedAttendance) {
        const { status, timestamp } = JSON.parse(savedAttendance);
        const currentDate = new Date();
        const savedDate = new Date(timestamp);

        const isSameDay =
          currentDate.getDate() === savedDate.getDate() &&
          currentDate.getMonth() === savedDate.getMonth() &&
          currentDate.getFullYear() === savedDate.getFullYear();

        if (isSameDay) {
          setIsCheckedIn(status);
        } else {
          localStorage.removeItem("attendanceStatus");
          setIsCheckedIn(false);
        }
      }
    };

    loadAttendanceState();

    const midnightCheck = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 1) {
        loadAttendanceState();
      }
    }, 60000);

    return () => clearInterval(midnightCheck);
  }, []);

  const handleAttendanceSuccess = () => {
    const attendanceData = {
      status: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("attendanceStatus", JSON.stringify(attendanceData));
    setIsCheckedIn(true);
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
            isCheckedIn ? "hidden" : "block"
          } bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg transition-colors`}
        >
          Check In
        </button>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-lg border p-6 min-h-[400px]">
        {isCheckedIn && (
          <div className="text-center text-emerald-600 font-medium">
            You are currently checked in. Check-in will reset at 00:01 tomorrow.
          </div>
        )}
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
