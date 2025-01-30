import React from "react";
import { LogOut, Clock, CreditCard, Award, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const TeacherSidebar = ({
  isOpen,
  onClose,
  activeSection,
  setActiveSection,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessToken", { path: "/" });
    Swal.fire({
      icon: "success",
      title: "Logout Berhasil",
      text: "Sampai jumpa kembali!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/login");
  };

  const menuItems = [
    { id: "attendance", icon: Clock, label: "Absensi" },
    { id: "salary", icon: CreditCard, label: "Slip Gaji" },
    { id: "points", icon: Award, label: "Point Siswa" },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col justify-between py-6">
      <div className="space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gray-400 flex items-center justify-center">
              <span className="text-2xl text-white">👨‍🏫</span>
            </div>
          </div>
          <div className="text-white font-semibold">GURU</div>
        </div>

        <div className="pt-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (onClose) onClose();
              }}
              className={`w-full flex items-center space-x-3 py-2 px-4 rounded-lg transition-colors ${
                activeSection === item.id
                  ? "bg-white text-emerald-700"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full flex items-center space-x-3 text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-64 bg-emerald-700">
        <SidebarContent />
      </div>

      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-emerald-700 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg"
        >
          <X className="w-6 h-6" />
        </button>
        <SidebarContent />
      </div>
    </>
  );
};

export default TeacherSidebar;
