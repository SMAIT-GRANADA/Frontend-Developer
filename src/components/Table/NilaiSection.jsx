import React, { useState } from "react";
import { useGetStudentsQuery } from "../../hooks/useStudents";
import { Pencil, Eye, Loader2, Search, Upload } from "lucide-react";
import UploadNilaiModal from "../Modal/UploadNilaiModal";
import ViewNilaiModal from "../Modal/ViewNilaiModal";
import UpdateNilaiModal from "../Modal/UpdateNilaiModal";

const NilaiSection = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedAcademicId, setSelectedAcademicId] = useState(null);
  const limit = 10;

  const { data, isLoading, isError } = useGetStudentsQuery(page, limit);

  const filterData = (items) => {
    if (!searchTerm || !items) return items;
    const searchStr = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchStr) ||
        item.nisn.toLowerCase().includes(searchStr) ||
        item.className.toLowerCase().includes(searchStr)
    );
  };

  const handleUploadClick = (student) => {
    setSelectedStudent(student);
    setIsUploadModalOpen(true);
  };

  const handleViewClick = (id) => {
    setSelectedAcademicId(id);
    setIsViewModalOpen(true);
  };

  const handleUpdateClick = (id) => {
    setSelectedAcademicId(id);
    setIsUpdateModalOpen(true);
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
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <h1 className="text-xl font-bold text-gray-800">Data Nilai Siswa</h1>
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
        </div>

        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#017035]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  NISN
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
                    {item.nisn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUploadClick(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Upload className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleUpdateClick(item.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleViewClick(item.id)}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              disabled={!data?.meta?.hasNextPage}
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="text-sm text-gray-700">
            Halaman <span className="font-medium">{page}</span> dari{" "}
            <span className="font-medium">{data?.meta?.totalPages || 1}</span>
          </div>
        </div>
      </div>

      <UploadNilaiModal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />

      <ViewNilaiModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedAcademicId(null);
        }}
        academicId={selectedAcademicId}
      />

      <UpdateNilaiModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedAcademicId(null);
        }}
        academicId={selectedAcademicId}
      />
    </>
  );
};

export default NilaiSection;
