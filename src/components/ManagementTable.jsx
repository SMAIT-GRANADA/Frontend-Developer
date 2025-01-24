import React, { useState } from "react";
import { useGetUsersQuery } from "../hooks/useGetUsersQuery";
import { useDeleteUserMutation } from "../hooks/useDeleteUserMutation";
import { Pencil, Trash2, Loader2, Search } from "lucide-react";
import AddUserModal from "./Modal/AddUserModal";
import UpdateUserModal from "./Modal/UpdateUserModal";
import Swal from "sweetalert2";

const ManagementTable = () => {
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const { data, isLoading, isError, error, refetch } = useGetUsersQuery(
    page,
    limit
  );
  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUserMutation();

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
        deleteUser(id, {
          onSuccess: () => {
            Swal.fire({
              title: "Berhasil!",
              text: "Data pengguna berhasil dihapus",
              icon: "success",
              confirmButtonColor: "#3B82F6",
            });
            refetch();
          },
          onError: (error) => {
            Swal.fire({
              title: "Gagal!",
              text:
                error?.response?.data?.message ||
                "Terjadi kesalahan saat menghapus data",
              icon: "error",
              confirmButtonColor: "#EF4444",
            });
          },
        });
      }
    });
  };

  const handleUpdate = (id) => {
    setSelectedUserId(id);
    setIsUpdateModalOpen(true);
  };

  const filteredData = data?.data.filter((item) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      item.username.toLowerCase().includes(searchStr) ||
      item.name.toLowerCase().includes(searchStr) ||
      item.email.toLowerCase().includes(searchStr) ||
      item.roles[0]?.role?.name.toLowerCase().includes(searchStr)
    );
  });

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
    <>
      <div className="w-full max-w-7xl mx-auto p-2 sm:p-4 md:p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            Manajemen Pengguna
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari pengguna..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Tambah Data
            </button>
          </div>
        </div>

        <div className="block md:hidden">
          {filteredData?.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm mb-4 p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-600">
                  {(page - 1) * limit + index + 1}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(item.id)}
                    disabled={isDeleting}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting}
                    className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-500">Username</span>
                  <p className="text-sm font-medium">{item.username}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Nama</span>
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Email</span>
                  <p className="text-sm font-medium break-all">{item.email}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Status</span>
                  <p className="mt-1">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Peran</span>
                  <p className="text-sm font-medium capitalize">
                    {item.roles[0]?.role?.name || "-"}
                  </p>
                </div>
                <div className="pt-2 flex justify-between text-xs text-gray-500">
                  <span>
                    Dibuat:{" "}
                    {new Date(item.createdAt).toLocaleDateString("id-ID")}
                  </span>
                  <span>
                    Diperbarui:{" "}
                    {new Date(item.updatedAt).toLocaleDateString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="w-full">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                    No
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                    Username
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                    Nama
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                    Dibuat Pada
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                    Diperbarui Pada
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                    Peran
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 border-b text-sm text-gray-700">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="py-3 px-4 border-b text-sm text-gray-700">
                      {item.username}
                    </td>
                    <td className="py-3 px-4 border-b text-sm text-gray-700">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 border-b text-sm text-gray-700">
                      {item.email}
                    </td>
                    <td className="py-3 px-4 border-b text-sm text-gray-700">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          item.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.isActive ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b text-sm text-gray-700">
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-3 px-4 border-b text-sm text-gray-700">
                      {new Date(item.updatedAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-3 px-4 border-b text-sm text-gray-700 capitalize">
                      {item.roles[0]?.role?.name || "-"}
                    </td>
                    <td className="py-3 px-4 border-b text-sm text-gray-700">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(item.id)}
                          disabled={isDeleting}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 disabled:opacity-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isDeleting}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 disabled:opacity-50"
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 sm:px-4 mt-4">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">Halaman {page}</span>
          <button
            onClick={() => setPage((old) => old + 1)}
            disabled={filteredData?.length < limit}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        refetch={refetch}
      />

      <UpdateUserModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedUserId(null);
        }}
        userId={selectedUserId}
        refetch={refetch}
      />
    </>
  );
};

export default ManagementTable;
