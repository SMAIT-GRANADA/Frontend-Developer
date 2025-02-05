import React from "react";
import { X, Loader2 } from "lucide-react";
import { useGetAcademicByIdQuery } from "../../hooks/useStudents";
import Swal from "sweetalert2";

const ViewNilaiModal = ({ isOpen, onClose, academicId }) => {
  const { data, isLoading, isError, error } =
    useGetAcademicByIdQuery(academicId);

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (isError) {
    if (error?.response?.status === 404) {
      Swal.fire({
        icon: "error",
        title: "Data Tidak Ditemukan",
        text: "Data nilai untuk siswa ini belum tersedia",
        confirmButtonColor: "#EF4444",
      });
      onClose();
      return null;
    }
    return null;
  }

  const academic = data?.data;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto py-6">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Detail Nilai</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nama Siswa</p>
              <p className="font-medium">{academic?.studentName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kelas</p>
              <p className="font-medium">{academic?.className}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Semester</p>
              <p className="font-medium">{academic?.semester}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tahun Ajaran</p>
              <p className="font-medium">{academic?.academicYear}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-3">Nilai</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left text-sm font-medium text-gray-500 pb-3">
                      Mata Pelajaran
                    </th>
                    <th className="text-right text-sm font-medium text-gray-500 pb-3">
                      Nilai
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(academic?.grades || {}).map(
                    ([subject, score]) => (
                      <tr key={subject}>
                        <td className="py-3 text-sm">{subject}</td>
                        <td className="py-3 text-sm text-right font-medium">
                          {score}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Guru</p>
              <p className="font-medium">{academic?.teacherName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tanggal Input</p>
              <p className="font-medium">
                {new Date(academic?.createdAt).toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNilaiModal;
