import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const StudentGrades = () => {
  const dummyGrades = [
    {
      id: 1,
      subject: "Matematika",
      assignment: 85,
      midterm: 78,
      finalExam: 88,
      finalGrade: 84,
      semester: "Ganjil",
      academicYear: "2023/2024",
    },
    {
      id: 2,
      subject: "Bahasa Indonesia",
      assignment: 90,
      midterm: 85,
      finalExam: 92,
      finalGrade: 89,
      semester: "Ganjil",
      academicYear: "2023/2024",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Nilai Akademik</h1>
        <div className="mt-2">
          <p className="text-gray-600">Nama: Ahmad</p>
          <p className="text-gray-600">Kelas: X IPA 1</p>
          <p className="text-gray-600">Tahun Ajaran: 2023/2024</p>
          <p className="text-gray-600">Semester: Ganjil</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mata Pelajaran
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tugas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                UTS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                UAS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nilai Akhir
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyGrades.map((grade, index) => (
              <tr key={grade.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {grade.subject}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grade.assignment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grade.midterm}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grade.finalExam}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {grade.finalGrade}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentGrades;
