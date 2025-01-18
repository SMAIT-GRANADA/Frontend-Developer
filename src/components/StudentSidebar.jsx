import React from "react";
import SidebarContent from "./SidebarContent";
import { X } from "lucide-react";

const SidebarStudent = ({ isOpen, onClose }) => {
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
        <SidebarContent onClose={onClose} />
      </div>
    </>
  );
};

export default SidebarStudent;
