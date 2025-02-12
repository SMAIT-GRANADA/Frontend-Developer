import React, { useState } from "react";
import SidebarStudent from "../components/SidebarStudent";
import Navbar from "../components/Navbar";
import AbsensiContent from "../components/AbsensiContent";

const StudentDashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("absensi");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-24 md:pt-28">
        <SidebarStudent
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          setActiveMenu={setActiveMenu}
        />
        <main className="flex-1 px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            {activeMenu === "absensi" && <AbsensiContent />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
