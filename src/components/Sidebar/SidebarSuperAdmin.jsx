import React, { useState } from "react";
import {
  LayoutList,
  LogOut,
  Menu,
  X,
  UserCog,
  Quote,
  ChevronDown,
  Users,
  GraduationCap,
  Clock,
} from "lucide-react";
import avatar from "../../assets/logo-sekolah.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const SidebarSuperAdmin = ({ isOpen, setIsOpen, setActiveMenu }) => {
  const navigate = useNavigate();
  const [isManagementOpen, setIsManagementOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("accessToken", { path: "/" });
    Swal.fire({
      icon: "success",
      title: "Logout Berhasil",
      text: "Sampai jumpa kembali!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-4 top-28 z-50 p-2 bg-emerald-700 text-white rounded-lg md:hidden"
        >
          <Menu size={24} />
        </button>
      )}

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity md:hidden ${
          isOpen ? "opacity-100 z-30" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed md:sticky top-0 h-full min-h-screen pt-24 md:pt-0 md:top-28 w-64 bg-emerald-700 transition-transform duration-300 ease-in-out z-40 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 overflow-y-scroll overflow-x-hidden`}
      >
        <div className="flex-none p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-700 rounded-full overflow-hidden">
                <img
                  src={avatar}
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white">
                <div className="font-medium">SUPERADMIN</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-white hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 w-full overflow-x-hidden">
          <button
            onClick={() => {
              setActiveMenu("konten");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
          >
            <LayoutList size={24} />
            <span className="text-lg">Konten</span>
          </button>

          <div className="mt-4 w-full">
            <button
              onClick={() => setIsManagementOpen(!isManagementOpen)}
              className="w-full flex items-center justify-between gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              <div className="flex items-center gap-3">
                <UserCog size={24} />
                <span className="text-lg">Manajemen</span>
              </div>
              <ChevronDown
                size={20}
                className={`transform transition-transform ${
                  isManagementOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isManagementOpen && (
              <div className="ml-4 mt-2 space-y-2 w-[calc(100%-1rem)]">
                <button
                  onClick={() => {
                    setActiveMenu("manajemen-pengguna");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
                >
                  <UserCog size={20} />
                  <span className="text-base">Pengguna</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu("manajemen-siswa");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
                >
                  <Users size={20} />
                  <span className="text-base">Siswa</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setActiveMenu("quotes");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors mt-4"
          >
            <Quote size={24} />
            <span className="text-lg">Quotes</span>
          </button>

          <button
            onClick={() => {
              setActiveMenu("nilai-siswa");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors mt-4"
          >
            <GraduationCap size={24} />
            <span className="text-lg">Nilai Siswa</span>
          </button>

          <button
            onClick={() => {
              setActiveMenu("absensi");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors mt-4"
          >
            <Clock size={24} />
            <span className="text-lg">Absensi</span>
          </button>
        </nav>

        <div className="flex-none p-6 w-full">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
          >
            <LogOut size={24} />
            <span className="text-lg">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SidebarSuperAdmin;
