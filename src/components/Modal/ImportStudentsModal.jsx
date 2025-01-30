import React, { useState } from "react";
import { X, Loader2, Upload } from "lucide-react";
import { useCreateBulkStudentsMutation } from "../../hooks/useCreateBulkStudentsMutation";
import Papa from "papaparse";
import Swal from "sweetalert2";

const ImportStudentsModal = ({ isOpen, onClose, refetch }) => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { mutate: createBulkStudents, isPending: isUploading } =
    useCreateBulkStudentsMutation();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      Swal.fire({
        title: "Error!",
        text: "Mohon pilih file CSV yang valid",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        Papa.parse(event.target.result, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const students = results.data.map((row) => ({
              name: row.name?.trim(),
              className: row.className?.trim(),
              parentId: row.parentId ? parseInt(row.parentId) : null,
            }));

            createBulkStudents(students, {
              onSuccess: () => {
                Swal.fire({
                  title: "Berhasil!",
                  text: "Data siswa berhasil diimport",
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
                    "Terjadi kesalahan saat mengimport data",
                  icon: "error",
                  confirmButtonColor: "#EF4444",
                });
              },
              onSettled: () => {
                setIsProcessing(false);
                setFile(null);
              },
            });
          },
          error: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Gagal memproses file CSV",
              icon: "error",
              confirmButtonColor: "#EF4444",
            });
            setIsProcessing(false);
          },
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Terjadi kesalahan saat memproses file",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
        setIsProcessing(false);
      }
    };

    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          disabled={isProcessing || isUploading}
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Import Data Siswa
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File CSV
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload file</span>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".csv"
                      className="sr-only"
                      onChange={handleFileChange}
                      disabled={isProcessing || isUploading}
                    />
                  </label>
                  <p className="pl-1">atau drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  CSV dengan format: name, className, parentId
                </p>
              </div>
            </div>
          </div>

          {file && (
            <p className="text-sm text-gray-600">File terpilih: {file.name}</p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing || isUploading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!file || isProcessing || isUploading}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 min-w-[100px]"
            >
              {isProcessing || isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Mengimport...</span>
                </>
              ) : (
                "Import"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportStudentsModal;
