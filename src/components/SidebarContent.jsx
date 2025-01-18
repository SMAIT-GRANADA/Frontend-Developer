import React from "react";
import { LogOut, Clock, X } from "lucide-react";

const SidebarContent = ({ onClose }) => {
  return (
    <div className="h-full flex flex-col justify-between py-6">
      <div className="space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gray-400 flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-500 rounded-full relative">
                <div className="absolute w-4 h-4 bg-gray-600 rounded-full top-1 left-2" />
                <div className="absolute w-6 h-3 bg-gray-600 rounded-full bottom-1 left-1" />
              </div>
            </div>
          </div>
          <div className="text-white font-semibold">ADMIN</div>
          <div className="text-white text-sm">21000349959</div>
        </div>
        <div className="pt-4">
          <button className="w-full flex items-center space-x-3 text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors">
            <Clock className="w-5 h-5" />
            <span>Absensi</span>
          </button>
        </div>
      </div>
      <button className="w-full flex items-center space-x-3 text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default SidebarContent;
