import React, { useState } from "react";
import { Menu } from "lucide-react";
import TeacherSidebar from "../components/Sidebar/TeacherSidebar";
import Navbar from "../components/Navbar";
import AttendanceSection from "../components/teacher/AttendanceSection";
import SalarySlipSection from "../components/teacher/SalarySlipSection";
import StudentPointsSection from "../components/teacher/StudentPointsSection";

const TeacherDashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("attendance");

  const renderSection = () => {
    switch (activeSection) {
      case "attendance":
        return <AttendanceSection />;
      case "salary":
        return <SalarySlipSection />;
      case "points":
        return <StudentPointsSection />;
      default:
        return <AttendanceSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-24 md:pt-28">
        <TeacherSidebar
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <button
          onClick={() => setIsDrawerOpen(true)}
          className={`lg:hidden fixed top-32 left-4 p-2 bg-emerald-700/80 rounded-lg text-white transition-all duration-300 ${
            isDrawerOpen ? "z-0" : "z-[60]"
          }`}
        >
          <Menu className="w-6 h-6" />
        </button>

        <main className="flex-1 p-6 mt-4">{renderSection()}</main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
