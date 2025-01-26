import React, { useState, useEffect } from "react";
import { useUpdateQuote } from "../../hooks/useQoutes";
import Swal from "sweetalert2";

const UpdateQuoteModal = ({ isOpen, onClose, quote }) => {
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);
  const { mutate: updateQuote, isLoading } = useUpdateQuote();

  useEffect(() => {
    if (quote) {
      setContent(quote.content);
      setIsActive(quote.isActive);
    }
  }, [quote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateQuote(
      {
        id: quote.id,
        data: { content, isActive },
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Berhasil!",
            text: "Quote berhasil diperbarui",
            icon: "success",
            confirmButtonColor: "#3B82F6",
          });
          onClose();
        },
        onError: (error) => {
          Swal.fire({
            title: "Gagal!",
            text:
              error?.response?.data?.message ||
              "Terjadi kesalahan saat memperbarui quote",
            icon: "error",
            confirmButtonColor: "#EF4444",
          });
        },
      }
    );
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
              Edit Quote
            </h3>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mt-2">
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Masukkan quote..."
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Quote Aktif
                </label>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="submit"
                  disabled={isLoading || !content.trim()}
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

export default UpdateQuoteModal;
