import { useGetAcademicsQuery } from "../../hooks/useGetAcademicStudentQuery";
import { Loader2 } from "lucide-react";

const StudentGrades = () => {
  const { data, isLoading, isError, error } = useGetAcademicsQuery();

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <p className="text-gray-600">Mengambil data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <p className="text-red-600 font-medium">Gagal mengambil data</p>
          <p className="text-red-500 text-sm mt-1">
            {error?.response?.data?.message || "Silahkan coba lagi nanti"}
          </p>
        </div>
      </div>
    );
  }

  const academics = data?.data || [];

  if (academics.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <p className="text-yellow-600 font-medium">Tidak ada data nilai</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {academics.map((student) => {
        const subjects = Object.entries(student.grades).map(
          ([subject, grade]) => ({
            subject: subject
              .replace(/([A-Z])/g, " $1")
              .toLowerCase()
              .replace(/^./, (str) => str.toUpperCase()),
            grade,
          })
        );

        return (
          <div
            key={student.id}
            className="w-full max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-lg"
          >
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-800">
                Nilai Akademik
              </h1>
              <div className="mt-2">
                <p className="text-gray-600">Nama: {student.studentName}</p>
                <p className="text-gray-600">Kelas: {student.className}</p>
                <p className="text-gray-600">
                  Tahun Ajaran: {student.academicYear}
                </p>
                <p className="text-gray-600">Semester: {student.semester}</p>
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
                      Nilai
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subjects.map((item, index) => (
                    <tr key={item.subject} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.grade}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StudentGrades;
