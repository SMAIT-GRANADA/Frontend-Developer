import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { SlSocialYoutube } from "react-icons/sl";
import LogoSekolah from "../assets/logo-sekolah.svg";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPSBOpen, setIsPSBOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="bg-[#006838] shadow-lg fixed w-full top-0 z-50">
      <div className="w-full mx-auto">
        <div className="flex flex-col">
          <div className="w-full border-b border-green-700">
            <div className="overflow-hidden">
              <style>
                {`
                  @keyframes marquee {
                    0% { transform: translate3d(100%, 0, 0); }
                    100% { transform: translate3d(-180%, 0, 0); }
                  }
                  .marquee-wrapper {
                    width: 100%;
                    overflow: hidden;
                  }
                  .marquee-content {
                    display: inline-block;
                    white-space: nowrap;
                    animation: marquee 18s linear infinite;
                    padding: 0.5rem 0;
                    width: max-content;
                  }
                  .marquee-content span {
                    padding: 0 100%;
                  }
                `}
              </style>
              <div className="marquee-wrapper">
                <div
                  className="marquee-content"
                  style={{
                    animationPlayState: isHovered ? "paused" : "running",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="text-white text-sm">
                    Selamat datang di website SMAIT GRANADA, Sholeh, Berilmu Dan
                    Memimpin
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center py-4 lg:px-8 md:px-6 px-4">
            <div className="flex items-center">
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

            <div className="hidden lg:flex items-center space-x-8">
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
                        to="/berita"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Berita
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

            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="https://www.instagram.com/smaitgranada/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-300"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://web.facebook.com/smaitgranada.samarinda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-300"
              >
                <FiFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@smaitgranadasamarinda4801/featured"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-300"
              >
                <SlSocialYoutube className="h-5 w-5" />
              </a>
              <div className="hidden lg:block">
                <Link
                  to="/login"
                  className="bg-yellow-300 text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-yellow-400 transition-colors"
                >
                  Login
                </Link>
              </div>
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
          </div>

          <div
            className={`fixed top-0 right-0 h-full w-64 bg-[#006838] transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } lg:hidden`}
            style={{ zIndex: 1000 }}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
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
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-4 p-4">
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
                    to="/berita"
                    className="block text-white hover:text-yellow-300"
                  >
                    Berita
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
                  href="https://www.instagram.com/smaitgranada/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a
                  href="https://web.facebook.com/smaitgranada.samarinda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300"
                >
                  <FiFacebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@smaitgranadasamarinda4801/featured"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-300"
                >
                  <SlSocialYoutube className="h-5 w-5" />
                </a>
              </div>
              <Link
                to="/login"
                className="bg-yellow-300 text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-yellow-400 transition-colors text-center"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
