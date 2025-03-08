import React, { useState } from "react";
import { Pencil, Trash2, Loader2, Search } from "lucide-react";
import Swal from "sweetalert2";
import {
  usePoints,
  useDeletePoint,
  useCreatePoint,
  useUpdatePoint,
} from "../../hooks/usePoint";
import { Modal } from "../Modal/TeacherModal";
import PointForm from "./PointForm";

const StudentPointSection = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const limit = 10;

  const { data, isLoading, isError, error } = usePoints({ page, limit });
  const { mutate: deletePoint, isLoading: isDeleting } = useDeletePoint();
  const { mutate: createPoint } = useCreatePoint();
  const { mutate: updatePoint } = useUpdatePoint();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePoint(id, {
          onSuccess: () => {
            Swal.fire({
              title: "Berhasil!",
              text: "Data point berhasil dihapus",
              icon: "success",
              confirmButtonColor: "#22C55E",
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "Gagal!",
              text: error?.response?.data?.message || "Gagal menghapus data",
              icon: "error",
              confirmButtonColor: "#EF4444",
            });
          },
        });
      }
    });
  };

  const filteredData = data?.data
    ? data.data.filter((item) => {
        const searchValue = searchTerm.toLowerCase();
        return (
          item.studentName?.toLowerCase().includes(searchValue) ||
          item.id?.toString().toLowerCase().includes(searchValue)
        );
      })
    : [];

  const handleCreate = (formData) => {
    const payload = {
      ...formData,
      points: Number(formData.points),
    };

    createPoint(payload, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
        Swal.fire({
          title: "Berhasil!",
          text: "Data point berhasil ditambahkan",
          icon: "success",
          confirmButtonColor: "#3B82F6",
        });
      },
      onError: (error) => {
        Swal.fire({
          title: "Gagal!",
          text: error?.response?.data?.message || "Terjadi kesalahan",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      },
    });
  };

  const handleUpdate = (formData) => {
    const updateData = {
      name: formData.name,
      className: formData.className,
      points: Number(formData.points),
      description: formData.description,
    };

    updatePoint(
      { id: selectedPoint.id, data: updateData },
      {
        onSuccess: () => {
          setIsUpdateModalOpen(false);
          setSelectedPoint(null);
          Swal.fire({
            title: "Berhasil!",
            text: "Data point berhasil diupdate",
            icon: "success",
            confirmButtonColor: "#3B82F6",
          });
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

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <p className="text-red-600 font-medium">Error loading data</p>
          <p className="text-red-500 text-sm mt-1">
            {error?.message || "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h1 className="text-xl font-bold text-gray-800">Student Points</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama siswa..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex-shrink-0 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Tambah Point
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-4 sm:-mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Student
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Points
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((point, index) => (
                <tr key={point.id}>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {point.studentName || point.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {point.className}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {point.points}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-sm text-gray-900 hidden sm:table-cell">
                    <div className="max-w-xs truncate">{point.description}</div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const editData = {
                            ...point,
                            name: point.studentName || point.name,
                          };
                          setSelectedPoint(editData);
                          setIsUpdateModalOpen(true);
                        }}
                        disabled={isDeleting}
                        className="text-blue-600 hover:text-blue-900 p-1"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(point.id)}
                        disabled={isDeleting}
                        className="text-red-600 hover:text-red-900 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex justify-between w-full sm:w-auto gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={filteredData.length < limit}
            className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="text-sm text-gray-700">
          Halaman <span className="font-medium">{page}</span>
        </div>
      </div>

      <Modal
        show={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Tambah Point"
      >
        <PointForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        show={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        title="Update Point"
      >
        <PointForm
          initialData={selectedPoint}
          onSubmit={handleUpdate}
          onCancel={() => setIsUpdateModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default StudentPointSection;
