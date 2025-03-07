import React, { useState } from "react";
import { useGetAcademicsQuery } from "../../hooks/useAcademics";
import { PenSquare, Eye, Loader2, Search } from "lucide-react";
import ViewAcademicModal from "../Modal/ViewNilaiModal";
import UpdateAcademicModal from "../Modal/UpdateNilaiModal";

const AcademicTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAcademicId, setSelectedAcademicId] = useState(null);

  const { data, isLoading, isError } = useGetAcademicsQuery();

  const filterData = (items) => {
    if (!searchTerm || !items) return items;
    const searchStr = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.studentName.toLowerCase().includes(searchStr) ||
        item.className.toLowerCase().includes(searchStr) ||
        item.semester.toLowerCase().includes(searchStr) ||
        item.academicYear.toLowerCase().includes(searchStr)
    );
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
      <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">
            Data Nilai Akademik
          </h1>
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari data nilai..."
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
                      Nama Siswa
                    </th>
                    <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Kelas
                    </th>
                    <th className="hidden md:table-cell px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Semester
                    </th>
                    <th className="hidden md:table-cell px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Tahun Ajaran
                    </th>
                    <th className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Jumlah Mata Pelajaran
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
                          {index + 1}
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                          {item.studentName}
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {item.className}
                        </td>
                        <td className="hidden md:table-cell px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {item.semester}
                        </td>
                        <td className="hidden md:table-cell px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {item.academicYear}
                        </td>
                        <td className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {Object.keys(item.grades).length}
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateClick(item.id)}
                              className="text-green-600 hover:text-green-900 p-1"
                              aria-label="Edit"
                            >
                              <PenSquare className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleViewClick(item.id)}
                              className="text-yellow-600 hover:text-yellow-900 p-1"
                              aria-label="View"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
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

        {displayData.length > 0 && (
          <div className="mt-4 sm:hidden">
            <div className="text-xs text-gray-500 italic mb-2"></div>
          </div>
        )}
      </div>

      <ViewAcademicModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedAcademicId(null);
        }}
        academicId={selectedAcademicId}
      />

      <UpdateAcademicModal
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

export default AcademicTable;
