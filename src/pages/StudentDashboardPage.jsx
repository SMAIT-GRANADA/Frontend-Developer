import React, { useState } from "react";
import { Menu } from "lucide-react";
import SidebarStudent from "../components/StudentSidebar";
import AbsensiContent from "../components/AbsensiContent";
import Navbar from "../components/Navbar";

const StudentDashboardPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-28">
        <SidebarStudent
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
        <button
          onClick={() => setIsDrawerOpen(true)}
          className={`lg:hidden fixed top-32 left-4 p-2 bg-emerald-700/80 rounded-lg text-white transition-all duration-300 ${
            isDrawerOpen ? "z-0" : "z-[60]"
          }`}
        >
          <Menu className="w-6 h-6" />
        </button>
        <main className="flex-1 p-6 mt-4">
          <AbsensiContent />
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
