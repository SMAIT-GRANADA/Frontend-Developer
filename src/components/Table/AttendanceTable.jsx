import React, { useState, useRef, useEffect } from "react";
import { Pencil, Loader2, Search, Download } from "lucide-react";
import UpdateAttendanceModal from "../Modal/UpdateAttendanceModal";
import Swal from "sweetalert2";
import {
  useExportAttendanceMutation,
  useGetAllAttendanceQuery,
} from "../../hooks/useAttendaceHistory";
import * as XLSX from "xlsx";

const AttendanceTable = () => {
  const [page, setPage] = useState(1);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFound, setSearchFound] = useState(true);
  const limit = 10;
  const tableRef = useRef(null);

  const { data, isLoading, isError, error, refetch } =
    useGetAllAttendanceQuery();
  const { mutate: exportToCSV, isPending: isExporting } =
    useExportAttendanceMutation();

  const handleUpdate = (id) => {
    setSelectedAttendanceId(id);
    setIsUpdateModalOpen(true);
  };

  const exportToExcel = (attendanceData) => {
    const excelData = attendanceData.map((item) => ({
      ID: item.id,
      Tanggal: new Date(item.checkInTime).toLocaleDateString("id-ID"),
      Nama: item.user.name,
      Email: item.user.email,
      Role: item.user.roles[0]?.role?.name || "-",
      Status: item.status,
      "Jam Masuk": formatDateTime(item.checkInTime),
      "Lokasi Masuk": `${item.checkInLatitude || "-"}, ${
        item.checkInLongitude || "-"
      }`,
      "Jam Keluar": item.checkOutTime ? formatDateTime(item.checkOutTime) : "-",
      "Lokasi Keluar": item.checkOutTime
        ? `${item.checkOutLatitude || "-"}, ${item.checkOutLongitude || "-"}`
        : "-",
      Notes: item.notes || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    XLSX.writeFile(workbook, "attendance_data.xlsx");
  };

  const handleExport = () => {
    if (!data?.data || data.data.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Tidak ada data untuk diexport",
        confirmButtonColor: "#EF4444",
      });
      return;
    }

    exportToCSV(undefined, {
      onSuccess: (csvData) => {
        const csvBlob = new Blob([csvData], { type: "text/csv" });
        const csvUrl = window.URL.createObjectURL(csvBlob);
        const csvLink = document.createElement("a");
        csvLink.href = csvUrl;
        csvLink.download = "attendance.csv";
        document.body.appendChild(csvLink);
        csvLink.click();

        window.URL.revokeObjectURL(csvUrl);
        document.body.removeChild(csvLink);

        exportToExcel(data.data);

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data absensi berhasil diexport ke CSV dan Excel",
          confirmButtonColor: "#3B82F6",
        });
      },
      onError: (error) => {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Gagal mengexport data absensi",
          confirmButtonColor: "#EF4444",
        });
      },
    });
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString("id-ID", {
      day: "2-digit",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const filterData = (items) => {
    if (!searchTerm) return items;

    const searchStr = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.user.name.toLowerCase().includes(searchStr) ||
        item.user.email.toLowerCase().includes(searchStr) ||
        item.status.toLowerCase().includes(searchStr) ||
        item.user.roles[0]?.role?.name.toLowerCase().includes(searchStr)
    );
  };

  const displayData = data?.data ? filterData(data.data) : [];

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <p className="text-red-600 font-medium">Error loading data</p>
          <p className="text-red-500 text-sm mt-1">
            {error?.message || "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <h1 className="text-xl font-bold text-gray-800">Data Absensi</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSearchFound(true);
                  if (page !== 1) setPage(1);
                }}
                placeholder="Cari absensi..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-shrink-0 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition flex items-center gap-2"
            >
              <Download size={20} />
              Export to Excel
            </button>
          </div>
        </div>

        <div className="block lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow p-4 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {item.user.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.user.email}</p>
                  </div>
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-500">Status</span>
                    <p className="mt-1">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === "hadir"
                            ? "bg-green-100 text-green-700"
                            : item.status === "telat"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "alpha"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Role</span>
                    <p className="text-sm capitalize">
                      {item.user.roles[0]?.role?.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Check In</span>
                    <p className="text-sm">
                      {formatDateTime(item.checkInTime)}
                    </p>
                  </div>
                  {item.checkOutTime && (
                    <div>
                      <span className="text-xs text-gray-500">Check Out</span>
                      <p className="text-sm">
                        {formatDateTime(item.checkOutTime)}
                      </p>
                    </div>
                  )}
                  {item.notes && (
                    <div>
                      <span className="text-xs text-gray-500">Notes</span>
                      <p className="text-sm">{item.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="overflow-x-auto rounded-t-lg">
            <table
              className="min-w-full divide-y divide-gray-200"
              ref={tableRef}
            >
              <thead className="bg-[#017035]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Check In
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {item.user.roles[0]?.role?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === "hadir"
                            ? "bg-green-100 text-green-800"
                            : item.status === "telat"
                            ? "bg-yellow-100 text-yellow-800"
                            : item.status === "alpha"
                            ? "bg-red-100 text-red-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(item.checkInTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.checkOutTime
                        ? formatDateTime(item.checkOutTime)
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.notes || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleUpdate(item.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex justify-between w-full sm:w-auto gap-4">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((old) => old + 1)}
              disabled={!data?.data || data.data.length < limit}
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="text-sm text-gray-700">
            Halaman <span className="font-medium">{page}</span>
            {!searchFound && searchTerm && (
              <span className="ml-2 text-gray-500">
                Mencari di halaman berikutnya...
              </span>
            )}
          </div>
        </div>
      </div>

      <UpdateAttendanceModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedAttendanceId(null);
        }}
        attendanceId={selectedAttendanceId}
        refetch={refetch}
      />
    </>
  );
};

export default AttendanceTable;
