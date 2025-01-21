import { LayoutList, LogOut } from "lucide-react";
import avatar from "../../assets/avatar.png";

const SidebarAdmin = () => {
  return (
    <div className="h-screen w-64 bg-emerald-700 p-6 flex flex-col">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 bg-gray-400 rounded-full overflow-hidden">
          <img
            src={avatar}
            alt="Admin"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-white text-center">
          <div className="font-medium">ADMIN</div>
          <div className="text-sm">21000349959</div>
        </div>
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
  );
};

export default SidebarAdmin;
