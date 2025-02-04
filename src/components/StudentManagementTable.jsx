import React, { useState } from "react";
import { useGetStudentsQuery } from "../hooks/useGetStudentsQuery";
import { Pencil, Loader2, Search } from "lucide-react";
import AddStudentModal from "./Modal/AddStudentModal";
import UpdateStudentModal from "./Modal/UpdateClassModal";

const StudentManagementTable = () => {
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const { data, isLoading, isError, error, refetch } = useGetStudentsQuery(
    page,
    limit
  );

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setIsUpdateModalOpen(true);
  };

  const filteredData = data?.data?.filter((item) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchStr) ||
      item.className.toLowerCase().includes(searchStr)
    );
  });

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
          <h1 className="text-xl font-bold text-gray-800">Manajemen Siswa</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari siswa..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex-shrink-0 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition"
              >
                Tambah Data
              </button>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredData?.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow p-4 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    #{(page - 1) * limit + index + 1}
                  </span>
                  <button
                    onClick={() => handleUpdate(item)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-gray-500">Nama</span>
                    <p className="text-sm font-medium">{item.name}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Kelas</span>
                    <p className="text-sm font-medium">{item.className}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-xs text-gray-500">Status</span>
                      <p className="mt-1">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                            item.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.isActive ? "Aktif" : "Tidak Aktif"}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Orang Tua</span>
                      <p className="text-sm font-medium mt-1">
                        {item.parent?.name || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div>
                      <span>Dibuat:</span>
                      <p>
                        {new Date(item.createdAt).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <div>
                      <span>Diperbarui:</span>
                      <p>
                        {item.updatedAt
                          ? new Date(item.updatedAt).toLocaleDateString("id-ID")
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#017035]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Kelas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Orang Tua
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Dibuat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Diperbarui
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData?.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.className}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.isActive ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.parent?.name || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.updatedAt
                        ? new Date(item.updatedAt).toLocaleDateString("id-ID")
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleUpdate(item)}
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

        {/* Pagination */}
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
              disabled={filteredData?.length < limit}
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="text-sm text-gray-700">
            Halaman <span className="font-medium">{page}</span>
          </div>
        </div>
      </div>

      <UpdateStudentModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
        refetch={refetch}
      />

      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        refetch={refetch}
      />
    </>
  );
};

export default StudentManagementTable;
