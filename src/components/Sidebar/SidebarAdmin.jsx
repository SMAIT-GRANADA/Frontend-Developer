import { LayoutList, LogOut, Menu, X } from "lucide-react";
import avatar from "../../assets/avatar.png";

const SidebarAdmin = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-24 z-50 p-2 bg-emerald-700 text-white rounded-lg md:hidden"
      >
        <Menu size={24} />
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity md:hidden ${
          isOpen ? "opacity-100 z-30" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed md:static h-screen w-64 bg-emerald-700 p-6 flex flex-col transform transition-transform duration-300 ease-in-out z-50 ${
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
              <div className="font-medium">ADMIN</div>
              <div className="text-sm">21000349959</div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-white hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1">
          <button className="w-full flex items-center gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors">
            <LayoutList size={24} />
            <span className="text-lg">Konten</span>
          </button>
        </div>

        <button className="flex items-center gap-3 text-white py-3 px-4 rounded-lg hover:bg-white hover:text-black transition-colors">
          <LogOut size={24} />
          <span className="text-lg">Logout</span>
        </button>
      </div>
    </>
  );
};

export default SidebarAdmin;
