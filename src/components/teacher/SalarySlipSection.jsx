import React from "react";
import { useSalarySlips } from "../../hooks/UseSalarySlips";
import {
  Calendar,
  User,
  Upload,
  ExternalLink,
  RefreshCw,
  FileText,
} from "lucide-react";

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="text-center py-12 px-4 bg-white rounded-lg border border-gray-100">
    <div className="flex justify-center mb-4">
      <FileText className="w-16 h-16 text-gray-300" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      Slip Gaji Tidak Ditemukan
    </h3>
    <p className="text-gray-500 mb-6 max-w-md mx-auto">
      Slip gaji tidak tersedia saat ini. Slip gaji baru akan muncul di sini
      ketika diunggah Administration.
    </p>
  </div>
);

const SalarySlipSection = () => {
  const { salarySlips, loading, error, refetch } = useSalarySlips();

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Salary Slips</h2>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Salary Slips</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-800 font-medium mb-2">
            <span className="mr-2">⚠️</span>
            Error
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="inline-flex items-center px-4 py-2 bg-white border border-red-300 rounded-md text-red-600 hover:bg-red-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!salarySlips || salarySlips.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Salary Slips</h2>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Salary Slips</h2>
      <div className="grid gap-4">
        {salarySlips.map((slip) => (
          <div
            key={slip.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-800">
                {new Date(slip.period).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>Teacher: {slip.teacher.name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Upload className="w-4 h-4" />
                <span>Uploaded by: {slip.admin.name}</span>
              </div>
            </div>

            <a
              href={slip.slipImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Slip
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalarySlipSection;
