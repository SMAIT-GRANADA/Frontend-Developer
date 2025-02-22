import React, { useState } from "react";
import { useUpdateAttendanceMutation } from "../../hooks/useAttendaceHistory";
import { X } from "lucide-react";
import Swal from "sweetalert2";

const UpdateAttendanceModal = ({ isOpen, onClose, attendanceId, refetch }) => {
  const [formData, setFormData] = useState({
    status: "",
    notes: "",
  });

  const { mutate: updateAttendance, isPending: isUpdating } =
    useUpdateAttendanceMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAttendance(
      { id: attendanceId, data: formData },
      {
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Status absensi berhasil diupdate",
            confirmButtonColor: "#3B82F6",
          });
          refetch();
          onClose();
        },
        onError: (error) => {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text:
              error?.response?.data?.message ||
              "Terjadi kesalahan saat mengupdate status",
            confirmButtonColor: "#EF4444",
          });
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Update Status Absensi
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Pilih Status</option>
              <option value="hadir">Hadir</option>
              <option value="telat">Telat</option>
              <option value="izin">Izin</option>
              <option value="alpha">Alpha</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Catatan
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Tambahkan catatan (opsional)"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isUpdating ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAttendanceModal;
