import React, { useState } from "react";
import { Pencil, Trash2, Loader2, Search } from "lucide-react";
import Swal from "sweetalert2";
import { useQuotes, useDeleteQuote } from "../../hooks/useQoutes";
import CreateQuoteModal from "../Modal/CreateQouteModal";
import UpdateQuoteModal from "../Modal/UpdateQouteModal";

const QuotesTable = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const limit = 10;

  const { data, isLoading, isError, error } = useQuotes(page, limit);
  const { mutate: deleteQuote, isLoading: isDeleting } = useDeleteQuote();

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
        deleteQuote(id, {
          onSuccess: () => {
            Swal.fire({
              title: "Berhasil!",
              text: "Data quote berhasil dihapus",
              icon: "success",
              confirmButtonColor: "#3B82F6",
            });
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

  const handleUpdate = (quote) => {
    setSelectedQuote(quote);
    setIsUpdateModalOpen(true);
  };

  const filteredData = data?.data.filter((item) =>
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="w-full max-w-6xl mx-auto p-2 sm:p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">
            Manajemen Quotes
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
                placeholder="Cari quotes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full sm:w-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Tambah Quotes
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 text-left font-semibold text-gray-700">
                  No
                </th>
                <th className="py-2 px-3 text-left font-semibold text-gray-700">
                  Quote
                </th>
                <th className="py-2 px-3 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="py-2 px-3 text-left font-semibold text-gray-700">
                  Dibuat Oleh
                </th>
                <th className="py-2 px-3 text-left font-semibold text-gray-700">
                  Tanggal
                </th>
                <th className="py-2 px-3 text-left font-semibold text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((quote, index) => (
                <tr key={quote.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-700">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="py-2 px-3 text-gray-700">{quote.content}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        quote.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {quote.isActive ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-gray-700">
                    {quote.superAdmin.user.name}
                  </td>
                  <td className="py-2 px-3 text-gray-700">
                    {new Date(quote.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="py-2 px-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(quote)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50 disabled:opacity-50"
                        disabled={isDeleting}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(quote.id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 disabled:opacity-50"
                        disabled={isDeleting}
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">Halaman {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={filteredData?.length < limit}
          >
            Next
          </button>
        </div>
      </div>

      <CreateQuoteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <UpdateQuoteModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedQuote(null);
        }}
        quote={selectedQuote}
      />
    </>
  );
};

export default QuotesTable;
