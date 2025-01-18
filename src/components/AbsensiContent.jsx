const AbsensiContent = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto py-20">
      <h1 className="text-2xl font-bold mb-2">Absensi</h1>
      <h2 className="text-emerald-600 text-xl mb-4">Hi, Rafly</h2>
      <p className="text-gray-600 mb-8">
        Halaman ini membantu kamu dalam memantau laporan absensi kamu selama
        Sekolah!
      </p>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Semester
            </label>
            <input
              type="text"
              value="Kelas X (Ganjil)"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-lg transition-colors">
          Check In
        </button>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-sm p-6 min-h-[400px]"></div>
    </div>
  );
};

export default AbsensiContent;
