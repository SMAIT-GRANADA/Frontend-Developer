import React from "react";
import { useGetPointsQuery } from "../../hooks/useGetPointsQuery";
import { Loader2 } from "lucide-react";

const StudentPoints = () => {
  const { data, isLoading, isError, error } = useGetPointsQuery();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-gray-600">Mengambil data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <p className="text-red-600 font-medium">Gagal mengambil data</p>
          <p className="text-red-500 text-sm mt-1">
            {error?.response?.data?.message || "Silahkan coba lagi nanti"}
          </p>
        </div>
      </div>
    );
  }

  const points = data?.data || [];
  const totalPoints = points.reduce((acc, curr) => acc + curr.points, 0);

  return (
    <div className="w-full max-w-6xl mx-auto p-2 sm:p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">
          Point Perilaku
        </h1>
        <div className="mt-2">
          <p className="text-sm sm:text-base text-gray-600">
            Total Point: {totalPoints}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 sm:mx-0 rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Siswa
                  </th>
                  <th className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kelas
                  </th>
                  <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Point
                  </th>
                  <th className="hidden md:table-cell px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Keterangan
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {points.length > 0 ? (
                  points.map((point, index) => (
                    <tr key={point.id} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                        {point.studentName}
                        <div className="sm:hidden text-xs text-gray-500 mt-1">
                          {point.className}
                        </div>
                        <div className="md:hidden text-xs text-gray-500 mt-1">
                          {point.description}
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        {point.className}
                      </td>
                      <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        {point.points}
                      </td>
                      <td className="hidden md:table-cell px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        {point.description}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
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

      {points.length > 0 && (
        <div className="mt-4 sm:hidden">
          <div className="text-xs text-gray-500 italic"></div>
        </div>
      )}
    </div>
  );
};

export default StudentPoints;
