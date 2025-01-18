import React, { useState } from "react";
import { Menu } from "lucide-react";
import SidebarStudent from "../components/StudentSidebar";
import AbsensiContent from "../components/AbsensiContent";

const StudentDashboardPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarStudent
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <button
        onClick={() => setIsDrawerOpen(true)}
        className="lg:hidden fixed top-4 left-4 p-2 bg-emerald-700/80 rounded-lg text-white z-20"
      >
        <Menu className="w-6 h-6" />
      </button>

      <main className="flex-1">
        <AbsensiContent />
      </main>
    </div>
  );
};

export default StudentDashboardPage;
