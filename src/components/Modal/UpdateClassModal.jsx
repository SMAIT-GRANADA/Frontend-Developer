import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useUpdateClassMutation } from "../../hooks/useUpdateClassMutation";
import Swal from "sweetalert2";

const UpdateClassModal = ({
  isOpen,
  onClose,
  studentId,
  currentClassName,
  refetch,
}) => {
  const [className, setClassName] = useState(currentClassName || "");
  const { mutate: updateClass, isPending: isUpdating } =
    useUpdateClassMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateClass(
      {
        studentId,
        className,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Berhasil!",
            text: "Kelas siswa berhasil diperbarui",
            icon: "success",
            confirmButtonColor: "#3B82F6",
          });
          onClose();
          refetch();
        },
        onError: (error) => {
          Swal.fire({
            title: "Gagal!",
            text:
              error?.response?.data?.message ||
              "Terjadi kesalahan saat memperbarui kelas",
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

        <h2 className="text-xl font-bold text-gray-900 mb-6">Perbarui Kelas</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kelas
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isUpdating}
              placeholder="Contoh: X IPA 1"
            />
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

export default UpdateClassModal;
