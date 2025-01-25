import React, { useState } from "react";
import SidebarSuperAdmin from "../components/Sidebar/SidebarSuperAdmin";
import Navbar from "../components/Navbar";
import NewsForm from "../components/Form/NewsForm";
import ManagementTable from "../components/ManagementTable";

const SuperAdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("konten");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-24 md:pt-28">
        <SidebarSuperAdmin
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          setActiveMenu={setActiveMenu}
        />
        <main className="flex-1 p-4 md:p-6 mt-8">
          {activeMenu === "konten" && <NewsForm />}
          {activeMenu === "manajemen" && <ManagementTable />}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
