import lineRegistration from "../assets/lineregistration.svg";

const RegistrationPaths = () => {
  const paths = [
    {
      title: "Jalur Prestasi",
      requirements: [
        "Membayar Biaya Pendaftaran",
        "Pas Foto terbaru 3x4 (1 Lembar)",
        "Mengisi Formulir",
        "Fotocopy sertifikat Prestasi 2 Tahun terakhir Min. Tingkat Kota",
      ],
      badgeText: "Jalur Prestasi",
    },
    {
      title: "Jalur Reguler",
      requirements: [
        "Membayar Biaya Pendaftaran",
        "Pas Foto terbaru 3x4 (1 Lembar)",
        "Mengisi Formulir",
      ],
      badgeText: "Jalur Reguler",
    },
    {
      title: "Jalur Undangan",
      requirements: [
        "Pas Foto terbaru 3x4 (1 Lembar)",
        "Mengisi Formulir",
        "Membawa Undangan dari Panitia PSB SMA IT Granada",
      ],
      badgeText: "Jalur Undangan",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-start text-xl font-medium mb-12">
        <strong>Kami memiliki 3 jalur pendaftaran</strong>, syarat dan ketentuan
        :
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {paths.map((path, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] relative pb-20"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 text-center">
                {path.title}
              </h3>
              <img src={lineRegistration} alt="line" className="w-full" />
            </div>
            <ul className="space-y-4">
              {path.requirements.map((req, reqIndex) => (
                <li key={reqIndex} className="flex items-start">
                  <span className="text-black text-lg mr-3">•</span>
                  <span className="text-gray-600">{req}</span>
                </li>
              ))}
            </ul>
            <div className="absolute bottom-8 left-0 w-full flex justify-center">
              <span className="inline-block bg-[#4C9F38] text-white px-8 py-2 rounded-full text-sm font-medium">
                {path.badgeText}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#F3F9F1] rounded-xl p-8 text-center">
        <p className="text-gray-700 mb-3">
          Biaya pendaftaran sebesar Rp. 250.000,-
        </p>
        <p className="text-gray-700 mb-3">Pembayaran dapat ditransfer ke:</p>
        <p className="font-semibold text-gray-800">A.n. PPDB SMA IT Granada</p>
        <p className="font-semibold text-gray-800">No. Rek: 7230879065</p>
        <p className="font-semibold text-gray-800">
          Bank Syariah Indonesia (BSI)
        </p>
      </div>
    </div>
  );
};

export default RegistrationPaths;
