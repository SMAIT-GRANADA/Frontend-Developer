import React, { useState, useEffect } from "react";
import { X, Loader2, Plus } from "lucide-react";
import {
  useGetAcademicByIdQuery,
  useUpdateAcademicMutation,
} from "../../hooks/useStudents";
import Swal from "sweetalert2";

const UpdateNilaiModal = ({ isOpen, onClose, academicId }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [newScore, setNewScore] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSubject, setNewSubject] = useState("");

  const {
    data,
    isLoading: isLoadingData,
    isError,
    error,
  } = useGetAcademicByIdQuery(academicId);
  const { mutate: updateAcademic, isPending } = useUpdateAcademicMutation();

  useEffect(() => {
    if (data?.data?.grades) {
      setSelectedSubject(Object.keys(data.data.grades)[0] || "");
      setNewScore(
        data.data.grades[Object.keys(data.data.grades)[0]]?.toString() || ""
      );
      setIsAddingNew(false);
      setNewSubject("");
    }
  }, [data]);

  useEffect(() => {
    if (data?.data?.grades && selectedSubject) {
      setNewScore(data.data.grades[selectedSubject]?.toString() || "");
    }
  }, [selectedSubject, data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = isAddingNew ? newSubject : selectedSubject;
    if (!subject) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Pilih mata pelajaran atau masukkan mata pelajaran baru",
        confirmButtonColor: "#EF4444",
      });
      return;
    }

    const grades = {
      [subject]: Number(newScore),
    };

    updateAcademic(
      { id: academicId, data: { grades } },
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
  const subjects = Object.keys(academic?.grades || {});

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Update Nilai</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
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

        <div className="flex items-center gap-4 mb-4">
          <button
            type="button"
            onClick={() => setIsAddingNew(false)}
            className={`px-3 py-1 rounded-md ${
              !isAddingNew
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Edit Nilai
          </button>
          <button
            type="button"
            onClick={() => {
              setIsAddingNew(true);
              setSelectedSubject("");
              setNewScore("");
            }}
            className={`px-3 py-1 rounded-md ${
              isAddingNew
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Tambah Nilai Baru
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isAddingNew ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pilih Mata Pelajaran
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Pilih mata pelajaran
                </option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject} (Nilai saat ini: {academic?.grades[subject]})
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Mata Pelajaran Baru
              </label>
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Masukkan nama mata pelajaran"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isAddingNew ? "Nilai" : "Nilai Baru"}
            </label>
            <input
              type="number"
              value={newScore}
              onChange={(e) => setNewScore(e.target.value)}
              required
              min="0"
              max="100"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending || (!selectedSubject && !newSubject)}
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
