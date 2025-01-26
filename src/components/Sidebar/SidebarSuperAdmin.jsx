import { LayoutList, LogOut, Menu, X, UserCog, Quote } from "lucide-react";
import avatar from "../../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const SidebarSuperAdmin = ({ isOpen, setIsOpen, setActiveMenu }) => {
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

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-4 top-24 z-50 p-2 bg-emerald-700 text-white rounded-lg md:hidden"
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
        className={`fixed md:sticky top-0 h-screen md:h-[calc(100vh-4rem)] w-64 bg-emerald-700 p-6 flex flex-col transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-400 rounded-full overflow-hidden">
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

        <div className="flex-1 flex flex-col">
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
          <button
            onClick={() => {
              setActiveMenu("manajemen");
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors mt-4"
          >
            <UserCog size={24} />
            <span className="text-lg">Manajemen</span>
          </button>
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
        </div>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors"
        >
          <LogOut size={24} />
          <span className="text-lg">Logout</span>
        </button>
      </aside>
    </>
  );
};

export default SidebarSuperAdmin;
