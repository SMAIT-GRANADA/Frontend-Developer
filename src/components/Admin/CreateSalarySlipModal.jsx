import React, { useState } from "react";
import {
  useCreateSalarySlip,
  useTeachers,
} from "../../hooks/UseAdminSallarySlips";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";

export const CreateSalarySlipModal = ({ isOpen, onClose }) => {
  const [period, setPeriod] = useState("");
  const [file, setFile] = useState(null);
  const [teacherId, setTeacherId] = useState("");
  const { mutate: createSlip, isLoading } = useCreateSalarySlip();
  const {
    data: teachersData,
    isLoading: loadingTeachers,
    isError: teachersError,
  } = useTeachers();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !teacherId || !period) {
      Swal.fire({
        title: "Peringatan!",
        text: "Semua field harus diisi",
        icon: "warning",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    const formData = new FormData();
    formData.append("teacherId", teacherId);
    formData.append("period", period);
    formData.append("file", file);

    createSlip(formData, {
      onSuccess: () => {
        Swal.fire({
          title: "Berhasil!",
          text: "Slip gaji berhasil ditambahkan",
          icon: "success",
          confirmButtonColor: "#3B82F6",
        });
        onClose();
        setPeriod("");
        setFile(null);
        setTeacherId("");
      },
      onError: (error) => {
        Swal.fire({
          title: "Gagal!",
          text:
            error?.response?.data?.message ||
            "Terjadi kesalahan saat menambahkan slip gaji",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 shadow-xl transition-all sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              Tambah Slip Gaji Baru
            </h3>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-left">
                    Guru
                  </label>
                  {loadingTeachers ? (
                    <div className="flex items-center justify-center py-2">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                      <span className="ml-2 text-sm text-gray-500">
                        Memuat data guru...
                      </span>
                    </div>
                  ) : teachersError ? (
                    <div className="text-sm text-red-500 text-left mt-1">
                      Gagal memuat data guru. Silakan coba lagi.
                    </div>
                  ) : (
                    <select
                      value={teacherId}
                      onChange={(e) => setTeacherId(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="">Pilih Guru</option>
                      {teachersData?.data?.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name} - {teacher.email}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-left">
                    Periode (YYYY-MM)
                  </label>
                  <input
                    type="text"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    placeholder="2024-01"
                    pattern="\d{4}-\d{2}"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 text-left">
                    File Slip Gaji
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required
                  />
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    loadingTeachers ||
                    !period.trim() ||
                    !teacherId ||
                    !file
                  }
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 sm:col-start-2"
                >
                  {isLoading ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
