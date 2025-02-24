import React, { useState } from "react";
import TeacherSidebar from "../components/Sidebar/TeacherSidebar";
import Navbar from "../components/Navbar";
import SalarySlipSection from "../components/teacher/SalarySlipSection";
import StudentPointsSection from "../components/teacher/StudentPointsSection";
import AttendanceSection from "../components/teacher/AttendanceSection";
import NilaiSection from "../components/Table/NilaiSection";
import AcademicTable from "../components/Table/AcademicTable";

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("input-nilai");

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
            {activeMenu === "input-nilai" && <NilaiSection />}
            {(activeMenu === "ubah-nilai" || activeMenu === "lihat-nilai") && (
              <AcademicTable viewOnly={activeMenu === "lihat-nilai"} />
            )}
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
