import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useUpdateUserMutation } from "../../hooks/useUpdateUserMutation";
import { useGetUserByIdQuery } from "../../hooks/useGetUserQuery";
import Swal from "sweetalert2";

const ROLE_IDS = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  TEACHER: 3,
  PARENT: 4,
  STUDENT: 5,
};

const UpdateUserModal = ({ isOpen, onClose, userId, refetch }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roleId: "",
  });

  const { data: userData, isLoading: isLoadingUser } =
    useGetUserByIdQuery(userId);
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUserMutation();

  useEffect(() => {
    if (userData?.data) {
      setFormData({
        name: userData.data.name,
        email: userData.data.email,
        roleId: userData.data.roles[0]?.roleId,
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = {
      name: formData.name,
      roleId: parseInt(formData.roleId),
    };

    updateUser(
      { id: userId, data: updateData },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Berhasil!",
            text: "Data pengguna berhasil diperbarui",
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
              "Terjadi kesalahan saat memperbarui data",
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
          Perbarui Pengguna
        </h2>

        {isLoadingUser ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
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
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Peran
              </label>
              <select
                name="roleId"
                value={formData.roleId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isUpdating}
              >
                <option value="">Pilih Peran</option>
                <option value={ROLE_IDS.SUPER_ADMIN}>Super Admin</option>
                <option value={ROLE_IDS.ADMIN}>Admin</option>
                <option value={ROLE_IDS.TEACHER}>Guru</option>
                <option value={ROLE_IDS.PARENT}>Orang Tua</option>
                <option value={ROLE_IDS.STUDENT}>Siswa</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={isUpdating}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
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
        )}
      </div>
    </div>
  );
};

export default UpdateUserModal;
