import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { usePostAcademicMutation } from "../../hooks/useStudents";
import Swal from "sweetalert2";

const UploadNilaiModal = ({ isOpen, onClose, student }) => {
  const [formData, setFormData] = useState({
    semester: "",
    academicYear: "",
    grades: [],
  });

  const { mutate: postAcademic, isPending } = usePostAcademicMutation();

  const addGrade = () => {
    setFormData((prev) => ({
      ...prev,
      grades: [...prev.grades, { subject: "", score: "" }],
    }));
  };

  const removeGrade = (index) => {
    setFormData((prev) => ({
      ...prev,
      grades: prev.grades.filter((_, i) => i !== index),
    }));
  };

  const handleGradeChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      grades: prev.grades.map((grade, i) =>
        i === index ? { ...grade, [field]: value } : grade
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const gradesObject = formData.grades.reduce((acc, { subject, score }) => {
      acc[subject] = Number(score);
      return acc;
    }, {});

    const payload = {
      studentId: student.id,
      semester: formData.semester,
      academicYear: formData.academicYear,
      grades: gradesObject,
    };

    postAcademic(payload, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Nilai berhasil diupload",
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
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto py-6">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Upload Nilai</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Siswa: <span className="font-medium">{student?.name}</span>
          </p>
          <p className="text-sm text-gray-600">
            NISN: <span className="font-medium">{student?.nisn}</span>
          </p>
          <p className="text-sm text-gray-600">
            Kelas: <span className="font-medium">{student?.className}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Semester
              </label>
              <select
                value={formData.semester}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, semester: e.target.value }))
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih Semester</option>
                <option value="Ganjil">Ganjil</option>
                <option value="Genap">Genap</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tahun Ajaran
              </label>
              <select
                value={formData.academicYear}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    academicYear: e.target.value,
                  }))
                }
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih Tahun</option>
                <option value="2024/2025">2024/2025</option>
                <option value="2025/2026">2025/2026</option>
              </select>
            </div>
          </div>

          <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4">
            {formData.grades.map((grade, index) => (
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
              disabled={isPending || formData.grades.length === 0}
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

export default UploadNilaiModal;
