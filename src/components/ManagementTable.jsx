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
  const [searchFound, setSearchFound] = useState(true);
  const limit = 10;

  const { data, isLoading, isError, error, refetch } = useGetUsersQuery(
    page,
    limit
  );
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUserMutation();

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

  const handleNextPage = () => {
    if (!searchTerm || !data?.data.length) {
      return;
    }

    const currentPageData = filterData(data?.data);
    if (currentPageData.length === 0) {
      setPage((prev) => prev + 1);
      setSearchFound(false);
    }
  };

  const filterData = (items) => {
    if (!searchTerm) return items;

    const searchStr = searchTerm.toLowerCase();
    return items.filter(
      (item) =>
        item.username.toLowerCase().includes(searchStr) ||
        item.name.toLowerCase().includes(searchStr) ||
        item.email.toLowerCase().includes(searchStr) ||
        item.roles[0]?.role?.name.toLowerCase().includes(searchStr)
    );
  };

  const displayData = data?.data ? filterData(data.data) : [];

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
      <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            Manajemen Pengguna
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSearchFound(true);
                  if (page !== 1) setPage(1);
                }}
                placeholder="Cari pengguna..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex-shrink-0 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Tambah Data
            </button>
          </div>
        </div>

        <div className="block lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayData.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow p-4 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-600">
                    #{(page - 1) * limit + index + 1}
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
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-xs text-gray-500">Username</span>
                      <p className="text-sm font-medium">{item.username}</p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Nama</span>
                      <p className="text-sm font-medium">{item.name}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Email</span>
                    <p className="text-sm font-medium break-all">
                      {item.email}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
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
                      <p className="text-sm font-medium capitalize mt-1">
                        {item.roles[0]?.role?.name || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div>
                      <span>Dibuat:</span>
                      <p>
                        {new Date(item.createdAt).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <div>
                      <span>Diperbarui:</span>
                      <p>
                        {new Date(item.updatedAt).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dibuat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diperbarui
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Peran
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.isActive ? "Aktif" : "Tidak Aktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.updatedAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {item.roles[0]?.role?.name || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(item.id)}
                          disabled={isDeleting}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={isDeleting}
                          className="text-red-600 hover:text-red-900"
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
              onClick={() => setPage((old) => Math.max(old - 1, 1))}
              disabled={page === 1}
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (searchTerm && displayData.length === 0) {
                  handleNextPage();
                } else {
                  setPage((old) => old + 1);
                }
              }}
              disabled={!searchTerm && data?.data.length < limit}
              className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="text-sm text-gray-700">
            Halaman <span className="font-medium">{page}</span>
            {!searchFound && searchTerm && (
              <span className="ml-2 text-gray-500">
                Mencari di halaman berikutnya...
              </span>
            )}
          </div>
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
