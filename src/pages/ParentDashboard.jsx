import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ParentSidebar from "../components/Sidebar/ParentSidebar";
import StudentGrades from "../components/Table/StudentGrades";
import StudentPoints from "../components/Table/StudentPoints";

const ParentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("nilai-siswa");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-24 md:pt-28">
        <ParentSidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          setActiveMenu={setActiveMenu}
        />
        <main className="flex-1 px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            {activeMenu === "nilai-siswa" && <StudentGrades />}
            {activeMenu === "point-siswa" && <StudentPoints />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ParentDashboard;
