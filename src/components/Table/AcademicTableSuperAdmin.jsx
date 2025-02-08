import React, { useState } from "react";
import { useGetAcademicsQuery } from "../../hooks/useGetAcademicsQuery";
import { useDeleteAcademicMutation } from "../../hooks/useAcademicsDeleteMutation";
import { Loader2, Search, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const AcademicTableSuperAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, isError, error } = useGetAcademicsQuery();
  const { mutate: deleteAcademic, isPending: isDeleting } =
    useDeleteAcademicMutation();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAcademic(id, {
          onSuccess: () => {
            Swal.fire({
              title: "Berhasil!",
              text: "Data nilai siswa berhasil dihapus",
              icon: "success",
              confirmButtonColor: "#3B82F6",
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "Gagal!",
              text:
                error?.response?.data?.message ||
                "Terjadi kesalahan saat menghapus data",
              icon: "error",
              confirmButtonColor: "#EF4444",
            });
          },
        });
      }
    });
  };

  const filterData = (items) => {
    if (!searchTerm) return items;

    const searchStr = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.studentName.toLowerCase().includes(searchStr) ||
        item.className.toLowerCase().includes(searchStr) ||
        item.semester.toLowerCase().includes(searchStr) ||
        item.academicYear.toLowerCase().includes(searchStr) ||
        item.teacherName.toLowerCase().includes(searchStr)
    );
  };

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

  const displayData = data?.data ? filterData(data.data) : [];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold text-gray-800">Nilai Siswa</h1>
        <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nilai siswa..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#017035]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nama Siswa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Kelas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Semester
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Tahun Ajaran
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nilai
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Guru
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
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.studentName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.className}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.semester}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.academicYear}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {Object.entries(item.grades).map(([subject, grade]) => (
                    <div key={subject}>
                      {subject}: {grade}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.teacherName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicTableSuperAdmin;
