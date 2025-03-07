import React, { useState } from "react";
import { useGetStudentsQuery } from "../../hooks/useStudents";
import { Upload, Loader2, Search } from "lucide-react";
import UploadNilaiModal from "../Modal/UploadNilaiModal";

const NilaiSection = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
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
      <div className="w-full max-w-6xl mx-auto p-2 sm:p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">
            Upload Nilai Siswa
          </h1>
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
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

        <div className="overflow-x-auto -mx-2 sm:mx-0 rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#017035]">
                  <tr>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      NISN
                    </th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Kelas
                    </th>
                    <th className="hidden md:table-cell px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayData.length > 0 ? (
                    displayData.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {(page - 1) * limit + index + 1}
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                          {item.nisn}
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {item.name}
                        </td>
                        <td className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {item.className}
                        </td>
                        <td className="hidden md:table-cell px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
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
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                          <button
                            onClick={() => handleUploadClick(item)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            aria-label="Upload"
                          >
                            <Upload className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex justify-between w-full sm:w-auto gap-3">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((old) => old + 1)}
              disabled={!data?.meta?.hasNextPage}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="text-xs sm:text-sm text-gray-700 mt-3 sm:mt-0">
            Halaman <span className="font-medium">{page}</span> dari{" "}
            <span className="font-medium">{data?.meta?.totalPages || 1}</span>
          </div>
        </div>

        {displayData.length > 0 && (
          <div className="mt-3 sm:hidden">
            <div className="text-xs text-gray-500 italic"></div>
          </div>
        )}
      </div>

      <UploadNilaiModal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          setSelectedStudent(null);
        }}
        student={selectedStudent}
      />
    </>
  );
};

export default NilaiSection;
