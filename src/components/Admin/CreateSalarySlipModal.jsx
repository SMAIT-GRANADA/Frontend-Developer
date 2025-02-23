import React, { useState, useMemo } from "react";
import {
  useCreateSalarySlip,
  useSalarySlips,
} from "../../hooks/UseAdminSallarySlips";
import { Search, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

export const CreateSalarySlipModal = ({ isOpen, onClose }) => {
  const [period, setPeriod] = useState("");
  const [file, setFile] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { mutate: createSlip, isLoading: isCreating } = useCreateSalarySlip();
  const { data: salarySlipsData, isLoading: isLoadingData } = useSalarySlips();

  const teachers = useMemo(() => {
    if (!salarySlipsData?.data) return [];

    const teacherMap = new Map();
    salarySlipsData.data.forEach((slip) => {
      if (slip.teacher && !teacherMap.has(slip.teacher.id)) {
        teacherMap.set(slip.teacher.id, {
          id: slip.teacherId,
          name: slip.teacher.name,
          email: slip.teacher.email,
        });
      }
    });

    return Array.from(teacherMap.values());
  }, [salarySlipsData]);

  // Filter teachers based on search query
  const filteredTeachers = useMemo(() => {
    if (!searchQuery.trim()) return teachers;

    return teachers.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teachers, searchQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !selectedTeacher || !period) {
      Swal.fire({
        title: "Peringatan!",
        text: "Semua field harus diisi",
        icon: "warning",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    const formData = new FormData();
    formData.append("teacherId", selectedTeacher.id);
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
        setSelectedTeacher(null);
        setSearchQuery("");
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
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 text-left">
                    Pilih Guru
                  </label>
                  <div className="relative mt-1">
                    <div
                      className="w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      onClick={() => setIsDropdownOpen(true)}
                    >
                      <div className="flex items-center">
                        {selectedTeacher ? (
                          <div className="flex-1 text-left">
                            <p className="text-sm text-gray-900">
                              {selectedTeacher.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {selectedTeacher.email}
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-500">Pilih guru</span>
                        )}
                      </div>
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="sticky top-0 z-10 bg-white px-3 py-2">
                          <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              placeholder="Cari guru..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>

                        {isLoadingData ? (
                          <div className="flex items-center justify-center py-4">
                            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                          </div>
                        ) : filteredTeachers.length > 0 ? (
                          filteredTeachers.map((teacher) => (
                            <div
                              key={teacher.id}
                              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                              onClick={() => {
                                setSelectedTeacher(teacher);
                                setIsDropdownOpen(false);
                                setSearchQuery("");
                              }}
                            >
                              <p className="text-sm font-medium text-gray-900">
                                {teacher.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {teacher.email}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-sm text-gray-500">
                            Tidak ada guru yang ditemukan
                          </div>
                        )}
                      </div>
                    )}
                  </div>
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
                    isCreating || !period.trim() || !selectedTeacher || !file
                  }
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 sm:col-start-2"
                >
                  {isCreating ? "Menyimpan..." : "Simpan"}
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
