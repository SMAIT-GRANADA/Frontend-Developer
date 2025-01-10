import React from "react";
import { Link } from "react-router-dom";
import logoSekolah from "../assets/logo-sekolah.svg";
import instagramLogo from "../assets/mdi_instagram.svg";
import facebookLogo from "../assets/facebook.svg";
import youtubeLogo from "../assets/youtube.svg";
import emailLogo from "../assets/email.svg";
import waLogo from "../assets/wa.svg";

const Footer = () => {
  return (
    <footer className="bg-[#0E1D0C] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src={logoSekolah}
                alt="SMAIT GRANADA"
                className="w-12 h-12"
              />
              <div>
                <h3 className="font-bold">SMAIT GRANADA</h3>
                <p>SAMARINDA</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Media Sosial</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <img
                      src={instagramLogo}
                      alt="Instagram"
                      className="w-4 h-4"
                    />
                  </div>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <img
                      src={facebookLogo}
                      alt="Facebook"
                      className="w-4 h-4"
                    />
                  </div>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <img src={youtubeLogo} alt="YouTube" className="w-4 h-4" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Alamat</h4>
            <p className="text-sm">
              Jl. Ringroad No.3, Bukit Pinang,
              <br />
              Kec. Samarinda Ulu, Kota
              <br />
              Samarinda, Kalimantan Timur
              <br />
              75124
              <br />
              Indonesia
            </p>
          </div>

          <div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/visi-misi" className="hover:text-gray-300">
                  Profil
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-300">
                  Berita Granada
                </Link>
              </li>
              <li>
                <Link href="/info-psb" className="hover:text-gray-300">
                  PSB
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300">
                  E-quiz
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300">
                  Lokasi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hubungi Kami</h4>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:mail@smaitgranada.sch.id"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <span>
                  <img src={emailLogo} alt="Facebook" className="w-4 h-4" />
                </span>
                <span>mail@smaitgranada.sch.id</span>
              </a>
              <a
                href="tel:+628115044599"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <span>
                  <img src={waLogo} alt="Facebook" className="w-4 h-4" />
                </span>
                <span>+62 811-5044-599</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 py-4 border-t bg-white border-gray-700">
        <div className="container mx-auto px-4 text-center text-sm text-black">
          <p>Copyright © SMAIT GRANADA SAMARINDA - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
