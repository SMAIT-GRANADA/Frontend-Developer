import React, { useState, useRef } from "react";
import { useCreateNewsMutation } from "../../hooks/useCreateNewsMutation";

export default function NewsForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media: null,
  });
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const createNewsMutation = useCreateNewsMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewsMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ title: "", description: "", media: null });
        setFileName("");
      },
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, media: file });
      setFileName(file.name);
    }
  };

  const handleFileButton = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
        Buat Berita Baru
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Media
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              type="button"
              onClick={handleFileButton}
              className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              Choose File
            </button>
            <span className="text-sm text-gray-500">
              {fileName || "No file chosen"}
            </span>
          </div>
          <input
            ref={fileInputRef}
            id="media"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <button
          type="submit"
          disabled={createNewsMutation.isPending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50"
        >
          {createNewsMutation.isPending ? "Posting..." : "Post News"}
        </button>
      </form>
    </div>
  );
}
