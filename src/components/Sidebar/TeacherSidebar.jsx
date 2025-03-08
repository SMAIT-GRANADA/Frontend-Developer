import {
  Banknote,
  LogOut,
  Menu,
  X,
  ChartNoAxesCombined,
  Clock,
  GraduationCap,
  PenSquare,
  Eye,
  Upload,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import avatar from "../../assets/logo-sekolah.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useState } from "react";

const TeacherSidebar = ({ isOpen, setIsOpen, setActiveMenu }) => {
  const navigate = useNavigate();
  const [isNilaiOpen, setIsNilaiOpen] = useState(true);

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
        className={`fixed md:sticky top-0 h-full min-h-screen pt-24 md:pt-0 md:top-28 w-64 bg-emerald-800 transition-transform duration-300 ease-in-out z-40 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 overflow-y-auto`}
      >
        <div className="flex-none p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-700 overflow-hidden">
                <img
                  src={avatar}
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white">
                <div className="font-medium">Hai GURU</div>
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

        <nav className="flex-1 px-3 py-4">
          <div className="space-y-1">
            <button
              onClick={() => setIsNilaiOpen(!isNilaiOpen)}
              className="w-full flex items-center justify-between text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              <div className="flex items-center gap-3">
                <GraduationCap size={24} />
                <span className="text-lg">Nilai</span>
              </div>
              {isNilaiOpen ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {isNilaiOpen && (
              <div className="ml-4 space-y-1">
                <button
                  onClick={() => {
                    setActiveMenu("input-nilai");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
                >
                  <Upload size={20} />
                  <span className="text-sm">Input Nilai</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu("ubah-nilai");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
                >
                  <PenSquare size={20} />
                  <span className="text-sm">Ubah Nilai</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMenu("lihat-nilai");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
                >
                  <Eye size={20} />
                  <span className="text-sm">Lihat Nilai</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setActiveMenu("slipgaji");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors mt-4"
          >
            <Banknote size={24} />
            <span className="text-lg">Slip Gaji</span>
          </button>
          <button
            onClick={() => {
              setActiveMenu("points");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors mt-4"
          >
            <ChartNoAxesCombined size={24} />
            <span className="text-lg">Point Siswa</span>
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

        <div className="flex-none p-6">
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

export default TeacherSidebar;
