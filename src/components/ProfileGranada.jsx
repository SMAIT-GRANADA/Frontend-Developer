import React from "react";
import waveHome from "../assets/wave-home.svg";
import piala from "../assets/piala.svg";

const ProfileGranada = () => {
  return (
    <>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 lg:px-48  py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="relative w-64 h-64 flex-shrink-0">
              <div className="absolute -left-3 -top-3 w-8 h-8 border-t-2 border-l-2 border-yellow-400"></div>

              <div className="absolute inset-0 -m-3">
                <div className="absolute left-0 top-8 bottom-8 w-0.2 bg-gradient-to-b from-yellow-400 to-yellow-500">
                  <div
                    className="w-full h-full animate-dash-move-vertical"
                    style={{
                      background:
                        "repeating-linear-gradient(to bottom, transparent, transparent 8px, #fbbf24 8px, #fbbf24 8px)",
                    }}
                  ></div>
                </div>

                <div className="absolute right-0 top-8 bottom-8 w-0.5 bg-gradient-to-b from-yellow-400 to-yellow-500">
                  <div
                    className="w-full h-full animate-dash-move-vertical"
                    style={{
                      background:
                        "repeating-linear-gradient(to bottom, transparent, transparent 8px, #fbbf24 8px, #fbbf24 16px)",
                    }}
                  ></div>
                </div>
              </div>

              <div className="relative h-full w-full rounded-lg overflow-hidden">
                <img
                  src="https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/Foto%20kepala%20sekolah.jpg?updatedAt=1737222719360"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">Profile SMAIT Granada</h2>
              <p className="text-gray-700 mb-4">
                SMA Islam Terpadu (SMAIT) Granada Samarinda adalah institusi
                pendidikan yang menonjol di Jalan HM. Ardian KM 05, Kecamatan
                Samarinda Ulu, Kelurahan Bukit Pinang, Kota Samarinda,
                Kalimantan Timur. Sekolah ini berkomitmen untuk menciptakan
                lingkungan belajar yang bermutu dengan kualitas udara yang baik.
              </p>
              <p className="text-gray-700 mb-4">
                Dengan kurikulum yang terintegrasi dan berbagai program,
                termasuk program internasional, SMAIT Granada mempersiapkan
                siswa untuk masa depan yang cemerlang.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-16">
        <div className="absolute inset-0 z-0">
          <img
            src={waveHome}
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center gap-16">
            <div className="text-center">
              <img
                src={piala}
                alt="International"
                className="w-24 h-24 mx-auto mb-2"
              />
              <p className="font-semibold text-lg text-[#428938]">2000+</p>
              <p className="text-[#428938]">Internasional</p>
            </div>
            <div className="text-center">
              <img
                src={piala}
                alt="National"
                className="w-24 h-24 mx-auto mb-2"
              />
              <p className="font-semibold text-lg text-[#428938]">2000+</p>
              <p className="text-[#428938]">Nasional</p>
            </div>
            <div className="text-center">
              <img
                src={piala}
                alt="Regional"
                className="w-24 h-24 mx-auto mb-2"
              />
              <p className="font-semibold text-lg text-[#428938]">2000+</p>
              <p className="text-[#428938]">Regional</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileGranada;
