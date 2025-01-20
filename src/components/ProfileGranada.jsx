import React from "react";
import waveHome from "../assets/wave-home.svg";
import piala from "../assets/piala.svg";

const ProfileGranada = () => {
  return (
    <div className="bg-white">
      <div className="relative pb-10">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={waveHome}
            alt="background"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="relative pt-16">
          <div className="container mx-auto px-4 lg:px-48 py-10 relative">
            <div className="flex flex-col lg:flex-row gap-x-12 items-start">
              <div className="w-[351px] h-auto flex-shrink-0">
                <div className="h-full w-full rounded-lg overflow-hidden">
                  <img
                    src="https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/Foto%20kepala%20sekolah.webp?updatedAt=1737392727322"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-sm"
                  />
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">
                  Profile SMAIT Granada
                </h2>
                <p className="text-gray-700 text-xl mb-2 text-justify">
                  SMA Islam Terpadu (SMAIT) Granada Samarinda adalah lembaga
                  pendidikan menengah atas yang berlokasi di Jalan HM. Ardhan KM
                  03, Kecamatan Samarinda Ulu, Kelurahan Bukit Pinang, Kota
                  Samarinda, Kalimantan Timur. Sekolah ini berada di dataran
                  tinggi yang dikelilingi oleh hutan lebat, menciptakan
                  lingkungan belajar yang tenang dengan kualitas udara yang
                  baik.
                </p>
                <p className="text-gray-700 text-xl mb-2 text-justify">
                  Sistem Pendidikan Islam terpadu yang diterapkan sekolah Islam
                  Granada terinspirasi oleh, kesuksesan pendidikan pada masa
                  kejayaan, Islam. Para ilmuan muslim telah menguasai Sains dan
                  Teknologi pada masanya, dan mengungguli peradaban Persia dan
                  Romawi. Mereka menghafal al-Qur’an, mempunyai tsaqofah Islam
                  yang tinggi, Aqidah yang kuat, dan akhlaq yang mulia. Mereka
                  terjun di Tengah masyarakat tanpa melupakan posisi dirinya
                  sebagai hamba Allah dan mengemban tanggung jawab untuk
                  menegakkan dan membela agamanya.
                </p>
                <p className="text-gray-700 text-xl mb-2 text-justify">
                  SMAIT Granada memiliki tiga gedung utama yang digunakan untuk
                  berbagai keperluan, termasuk kantor, perpustakaan,
                  laboratorium komputer, laboratorium IPA, koperasi, ruang
                  Bimbingan Konseling (BK), asrama, ruang UKS, dan mushola.
                </p>
                <p className="text-gray-700 text-xl mb-2 text-justify">
                  Pembelajaran berbasis kontekstual disesuaikan dengan tantangan
                  zaman, termasuk program Granada Overseas Program (GoPro) dan
                  Granada Educational Tour (GET) yang memberikan pengalaman
                  belajar di dalam dan luar negeri.
                </p>
                <p className="text-gray-700 text-xl mb-2 text-justify">
                  Kegiatan ekstrakurikuler di SMAIT Granada dirancang untuk
                  mengembangkan minat dan bakat siswa, serta menanamkan disiplin
                  melalui program Pramuka SIT dan Badan Eksekutif Siswa Terpadu
                  (BEST) Granada, yang melatih keterampilan kepemimpinan dan
                  kerja sama tim.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative ">
          <div className="container mx-auto px-4 lg:px-48 py-14 relative z-10">
            <div className="relative">
              <div className="absolute top-20 right-0 left-0 bottom-0">
                <div className="w-full h-[124px] bg-[#F9DE4B] rounded-xl"></div>
              </div>
            </div>
            <div className="flex justify-around relative z-10">
              <div className="text-center">
                <img
                  src={piala}
                  alt="International"
                  className="w-28 h-28 mx-auto mb-2"
                />
                <p className="text-[#428938] text-2xl font-bold">1843+</p>
                <p className="text-[#428938] font-semibold text-lg">
                  Internasional
                </p>
              </div>
              <div className="text-center">
                <img
                  src={piala}
                  alt="National"
                  className="w-28 h-28 mx-auto mb-2"
                />
                <p className="text-[#428938] text-2xl font-bold">2000+</p>
                <p className="font-semibold text-lg text-[#428938]">Nasional</p>
              </div>
              <div className="text-center">
                <img
                  src={piala}
                  alt="Regional"
                  className="w-28 h-28 mx-auto mb-2"
                />
                <p className="text-[#428938] text-2xl font-bold">4520+</p>
                <p className="font-semibold text-lg text-[#428938]">Regional</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileGranada;
