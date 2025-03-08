import React from "react";
import { Menu, X, GraduationCap, AlertTriangle, LogOut } from "lucide-react";
import { useGetUserByIdQuery } from "../../hooks/useGetUserQuery";
import { jwtDecode } from "jwt-decode";
import avatar from "../../assets/logo-sekolah.svg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const ParentSidebar = ({ isOpen, setIsOpen, setActiveMenu }) => {
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?.id;
  const { data: userData } = useGetUserByIdQuery(userId);
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
          className="fixed left-4 top-28 z-50 p-2 bg-green-700 text-white rounded-lg md:hidden"
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
        } md:translate-x-0`}
      >
        <div className="flex-none p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-700 overflow-hidden">
                <img
                  src={avatar}
                  alt="Parent"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white">
                <div className="font-medium">
                  {userData?.data?.name || "PARENT"}
                </div>
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
          <button
            onClick={() => {
              setActiveMenu("nilai-siswa");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
          >
            <GraduationCap size={24} />
            <span className="text-lg">Nilai Siswa</span>
          </button>

          <button
            onClick={() => {
              setActiveMenu("point-siswa");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors mt-4"
          >
            <AlertTriangle size={24} />
            <span className="text-lg">Point Pelanggaran</span>
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

export default ParentSidebar;
