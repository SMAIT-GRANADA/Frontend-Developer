import React, { useState } from "react";
import { Menu } from "lucide-react";
import TeacherSidebar from "../components/Sidebar/TeacherSidebar";
import Navbar from "../components/Navbar";
import SalarySlipSection from "../components/teacher/SalarySlipSection";
import StudentPointsSection from "../components/teacher/StudentPointsSection";
import AttendanceSection from "../components/teacher/AttendanceSection";

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("slipgaji");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-24 md:pt-28">
        <TeacherSidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          setActiveMenu={setActiveMenu}
        />
        <main className="flex-1 px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            {activeMenu === "slipgaji" && <SalarySlipSection />}
            {activeMenu === "points" && <StudentPointsSection />}
            {activeMenu === "absensi" && <AttendanceSection />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
