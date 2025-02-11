import React, { useState } from "react";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import Navbar from "../components/Navbar";
import SalarySlipSection from "../components/Admin/SalarySlipSelection";

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("slipgaji");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-24 md:pt-28">
        <AdminSidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          setActiveMenu={setActiveMenu}
        />
        <main className="flex-1 px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            {activeMenu === "slipgaji" && <SalarySlipSection />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
