import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useUpdateStudentMutation } from "../../hooks/useUpdateClassMutation";
import { useGetParentsQuery } from "../../hooks/useGetParentQuery";
import Swal from "sweetalert2";

const UpdateStudentModal = ({ isOpen, onClose, student, refetch }) => {
  const [formData, setFormData] = useState({
    name: "",
    className: "",
    parentId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: updateStudent, isPending: isUpdating } =
    useUpdateStudentMutation();
  const { data: parentsData, isLoading: isLoadingParents } =
    useGetParentsQuery();

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        className: student.className || "",
        parentId: student.parentId || "",
      });
    }
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudent(
      {
        studentId: student.id,
        ...formData,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Berhasil!",
            text: "Data siswa berhasil diperbarui",
            icon: "success",
            confirmButtonColor: "#3B82F6",
          });
          refetch();
          onClose();
        },
        onError: (error) => {
          Swal.fire({
            title: "Gagal!",
            text: error?.response?.data?.message || "Terjadi kesalahan",
            icon: "error",
            confirmButtonColor: "#EF4444",
          });
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          disabled={isUpdating}
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Update Data Siswa
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Siswa
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isUpdating}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kelas
            </label>
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isUpdating}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Orang Tua
            </label>
            <select
              name="parentId"
              value={formData.parentId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isUpdating || isLoadingParents}
            >
              <option value="">Pilih Orang Tua (Opsional)</option>
              {parentsData?.data?.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 min-w-[100px]"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                "Simpan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStudentModal;
