import React from "react";
import { Link } from "react-router-dom";
import logoSekolah from "../assets/logo-sekolah.svg";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { SlSocialYoutube } from "react-icons/sl";
import emailLogo from "../assets/email.svg";
import waLogo from "../assets/wa.svg";

const Footer = () => {
  return (
    <footer className="bg-[#0E1D0C] text-white">
      <div className="container mx-auto px-4 lg:px-48  py-10">
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
                <a
                  href="https://www.instagram.com/smaitgranada/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-yellow-300">
                    <FaInstagram className="h-4 w-4" />
                  </div>
                </a>
                <a
                  href="https://web.facebook.com/smaitgranada.samarinda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-yellow-300">
                    <FiFacebook className="h-4 w-4" />
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/@smaitgranadasamarinda4801/featured"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-yellow-300">
                    <SlSocialYoutube className="h-4 w-4" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Alamat</h4>
            <p className="text-sm">
              Jl. HM Ardan KM 03, Kel. Bukit Pinang
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

          <div className=" md:ml-16">
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-yellow-300">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/visi-misi" className="hover:text-yellow-300">
                  Profil
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-yellow-300">
                  Berita Granada
                </Link>
              </li>
              <li>
                <Link to="/pendaftaran" className="hover:text-yellow-300">
                  PSB
                </Link>
              </li>
              <li>
                <a
                  href="https://alumnigranada.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300"
                >
                  E-quiz
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Lokasi
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Hubungi Kami</h4>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:mail@smaitgranada.sch.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-yellow-300"
              >
                <span>
                  <img src={emailLogo} alt="Facebook" className="w-4 h-4" />
                </span>
                <span>mail@smaitgranada.sch.id</span>
              </a>
              <a
                href="tel:+628115044599"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-yellow-300"
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
