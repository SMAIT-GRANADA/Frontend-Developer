import React, { useState, useEffect } from "react";
import { Camera, Loader } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

const AttendanceSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todayStatus, setTodayStatus] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    fetchTodayStatus();
    fetchAttendanceHistory();
  }, []);

  const fetchTodayStatus = async () => {
    try {
      const response = await axios.get("/api/attendance/today");
      setTodayStatus(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengambil status absensi",
        text: error.response?.data?.message || "Terjadi kesalahan",
      });
    }
  };

  const fetchAttendanceHistory = async () => {
    try {
      const response = await axios.get("/api/attendance/history");
      setAttendanceHistory(response.data);
    } catch (error) {
      console.error("Error fetching attendance history:", error);
    }
  };

  const handleCheckIn = async () => {
    setIsLoading(true);
    try {
      await axios.post("/api/attendance/check-in", {
        photo: "photo_data", // Will be implemented with actual camera
        location: { lat: 0, lng: 0 }, // Will be implemented with geolocation
      });

      await fetchTodayStatus();
      Swal.fire({
        icon: "success",
        title: "Berhasil Check In",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Check In",
        text: error.response?.data?.message || "Terjadi kesalahan",
      });
    }
    setIsLoading(false);
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    try {
      await axios.post("/api/attendance/check-out", {
        photo: "photo_data", // Will be implemented with actual camera
        location: { lat: 0, lng: 0 }, // Will be implemented with geolocation
      });

      await fetchTodayStatus();
      Swal.fire({
        icon: "success",
        title: "Berhasil Check Out",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Check Out",
        text: error.response?.data?.message || "Terjadi kesalahan",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Absensi Guru</h2>

        {/* Status Card */}
        <div className="bg-emerald-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-2">Status Hari Ini</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">
                Status:{" "}
                <span className="font-medium">
                  {todayStatus?.status || "Belum Absen"}
                </span>
              </p>
              {todayStatus?.checkInTime && (
                <p className="text-gray-600">
                  Jam Masuk:{" "}
                  <span className="font-medium">
                    {new Date(todayStatus.checkInTime).toLocaleTimeString()}
                  </span>
                </p>
              )}
              {todayStatus?.checkOutTime && (
                <p className="text-gray-600">
                  Jam Pulang:{" "}
                  <span className="font-medium">
                    {new Date(todayStatus.checkOutTime).toLocaleTimeString()}
                  </span>
                </p>
              )}
            </div>

            <div className="space-x-4">
              <button
                onClick={handleCheckIn}
                disabled={isLoading || todayStatus?.checkInTime}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  "Check In"
                )}
              </button>

              <button
                onClick={handleCheckOut}
                disabled={
                  isLoading ||
                  !todayStatus?.checkInTime ||
                  todayStatus?.checkOutTime
                }
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:bg-gray-400"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  "Check Out"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Tanggal</th>
                <th className="px-4 py-2 text-left">Check In</th>
                <th className="px-4 py-2 text-left">Check Out</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* {attendanceHistory.map((record) => (
                <tr key={record.id} className="border-t">
                  <td className="px-4 py-2">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {record.checkInTime
                      ? new Date(record.checkInTime).toLocaleTimeString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2">
                    {record.checkOutTime
                      ? new Date(record.checkOutTime).toLocaleTimeString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2">{record.status}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSection;
