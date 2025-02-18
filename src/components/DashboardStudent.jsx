import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useAttendanceHistory } from "../hooks/useAttendaceHistory";
import { Users, Clock, AlertTriangle, XCircle } from "lucide-react";

const DashboardContent = () => {
  const { data: historyData, isLoading } = useAttendanceHistory();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const attendanceData = historyData?.data || [];

  const stats = {
    total: attendanceData.length,
    hadir: attendanceData.filter((item) => item.status === "hadir").length,
    telat: attendanceData.filter((item) => item.status === "telat").length,
    izin: attendanceData.filter((item) => item.status === "izin").length,
    alpha: attendanceData.filter((item) => item.status === "alpha").length,
  };

  const pieData = [
    { name: "Hadir", value: stats.hadir },
    { name: "Telat", value: stats.telat },
    { name: "Izin", value: stats.izin },
    { name: "Alpha", value: stats.alpha },
  ];

  const COLORS = ["#22c55e", "#f43f5e", "#3b82f6", "#eab308"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Kehadiran</p>
              <p className="text-2xl font-semibold">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Hadir</p>
              <p className="text-2xl font-semibold">{stats.hadir}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
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

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Izin</p>
              <p className="text-2xl font-semibold">{stats.izin}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
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

      <div className="bg-white p-6 rounded-lg shadow">
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
  );
};

export default DashboardContent;
