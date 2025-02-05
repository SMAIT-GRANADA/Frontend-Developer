import React, { useState, useEffect } from "react";
import { X, Plus, Trash2, Loader2 } from "lucide-react";
import {
  useGetAcademicByIdQuery,
  useUpdateAcademicMutation,
} from "../../hooks/useStudents";
import Swal from "sweetalert2";

const UpdateNilaiModal = ({ isOpen, onClose, academicId }) => {
  const [grades, setGrades] = useState([]);
  const {
    data,
    isLoading: isLoadingData,
    isError,
    error,
  } = useGetAcademicByIdQuery(academicId);
  const { mutate: updateAcademic, isPending } = useUpdateAcademicMutation();

  useEffect(() => {
    if (data?.data?.grades) {
      const gradesArray = Object.entries(data.data.grades).map(
        ([subject, score]) => ({
          subject,
          score: score.toString(),
        })
      );
      setGrades(gradesArray);
    }
  }, [data]);

  const addGrade = () => {
    setGrades((prev) => [...prev, { subject: "", score: "" }]);
  };

  const removeGrade = (index) => {
    setGrades((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGradeChange = (index, field, value) => {
    setGrades((prev) =>
      prev.map((grade, i) =>
        i === index ? { ...grade, [field]: value } : grade
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = data?.data?.grades || {};
    const updated = grades.reduce((acc, { subject, score }) => {
      if (subject.trim()) {
        acc[subject] = Number(score);
      }
      return acc;
    }, {});

    const gradesObject = { ...existing, ...updated };

    updateAcademic(
      { id: academicId, data: { grades: gradesObject } },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Nilai berhasil diupdate",
            showConfirmButton: false,
            timer: 1500,
          });
          onClose();
        },
        onError: (error) => {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: error?.response?.data?.message || "Terjadi kesalahan",
            confirmButtonColor: "#EF4444",
          });
        },
      }
    );
  };

  if (!isOpen) return null;

  if (isLoadingData) {
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Update Nilai</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Siswa: <span className="font-medium">{academic?.studentName}</span>
          </p>
          <p className="text-sm text-gray-600">
            Kelas: <span className="font-medium">{academic?.className}</span>
          </p>
          <p className="text-sm text-gray-600">
            Semester: <span className="font-medium">{academic?.semester}</span>
          </p>
          <p className="text-sm text-gray-600">
            Tahun Ajaran:{" "}
            <span className="font-medium">{academic?.academicYear}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4">
            {grades.map((grade, index) => (
              <div
                key={index}
                className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Mata Pelajaran
                  </label>
                  <input
                    type="text"
                    value={grade.subject}
                    onChange={(e) =>
                      handleGradeChange(index, "subject", e.target.value)
                    }
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nama mata pelajaran"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Nilai
                  </label>
                  <input
                    type="number"
                    value={grade.score}
                    onChange={(e) =>
                      handleGradeChange(index, "score", e.target.value)
                    }
                    required
                    min="0"
                    max="100"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeGrade(index)}
                  className="mt-7 p-2 text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addGrade}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 focus:outline-none mt-4"
          >
            <Plus size={20} />
            <span>Tambah Mata Pelajaran</span>
          </button>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending || grades.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isPending ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNilaiModal;
