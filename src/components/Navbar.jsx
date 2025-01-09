import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Facebook, Instagram, Youtube } from "lucide-react";
import LogoSekolah from "../assets/logo-sekolah.svg";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPSBOpen, setIsPSBOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#006838] shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col">
          <div className="text-center py-2">
            <span className="text-white text-sm">Selamat datang kami</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center py-2">
            <div className="flex items-center mb-4 lg:mb-0">
              <Link to="/" className="flex items-center">
                <img
                  src={LogoSekolah}
                  alt="SMAIT GRANADA Logo"
                  className="h-16 w-16 md:h-20 md:w-20"
                />
                <div className="ml-3">
                  <h1 className="text-white font-bold text-xl md:text-2xl">
                    SMAIT GRANADA
                  </h1>
                  <h2 className="text-white text-sm md:text-base">SAMARINDA</h2>
                </div>
              </Link>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-yellow-300"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>

            <div className="hidden lg:flex flex-col md:flex-row items-center gap-8">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-white hover:text-yellow-300">
                  Beranda
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center text-white hover:text-yellow-300"
                  >
                    Profil
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white">
                      <div className="py-1">
                        <Link
                          to="/visi-misi"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Visi & Misi
                        </Link>
                        <Link
                          to="/struktur"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Struktur Organisasi
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsPSBOpen(!isPSBOpen)}
                    className="flex items-center text-white hover:text-yellow-300"
                  >
                    PSB
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  {isPSBOpen && (
                    <div className="absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white">
                      <div className="py-1">
                        <Link
                          to="/pendaftaran"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Pendaftaran
                        </Link>
                        <Link
                          to="/info-psb"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Informasi PSB
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <a
                  href="https://www.e-ujian.com/69950015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300"
                >
                  E-quiz
                </a>
                <a
                  href="https://alumnigranada.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300"
                >
                  Alumni
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <Link
                  to="/login"
                  className="bg-yellow-300 text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-yellow-400 transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden py-4">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-white hover:text-yellow-300">
                  Beranda
                </Link>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center text-white hover:text-yellow-300"
                >
                  Profil
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isProfileOpen && (
                  <div className="pl-4 space-y-2">
                    <Link
                      to="/visi-misi"
                      className="block text-white hover:text-yellow-300"
                    >
                      Visi & Misi
                    </Link>
                    <Link
                      to="/struktur"
                      className="block text-white hover:text-yellow-300"
                    >
                      Struktur Organisasi
                    </Link>
                  </div>
                )}
                <button
                  onClick={() => setIsPSBOpen(!isPSBOpen)}
                  className="flex items-center text-white hover:text-yellow-300"
                >
                  PSB
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isPSBOpen && (
                  <div className="pl-4 space-y-2">
                    <Link
                      to="/pendaftaran"
                      className="block text-white hover:text-yellow-300"
                    >
                      Pendaftaran
                    </Link>
                    <Link
                      to="/info-psb"
                      className="block text-white hover:text-yellow-300"
                    >
                      Informasi PSB
                    </Link>
                  </div>
                )}
                <a
                  href="https://www.e-ujian.com/69950015"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300"
                >
                  E-quiz
                </a>
                <a
                  href="https://alumnigranada.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300"
                >
                  Alumni
                </a>
                <div className="flex items-center space-x-4 pt-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-yellow-300"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-yellow-300"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-yellow-300"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                  <Link
                    to="/login"
                    className="bg-yellow-300 text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-yellow-400 transition-colors"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
