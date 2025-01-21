import React, { useState } from "react";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import Navbar from "../components/Navbar";
import NewsForm from "../components/Form/NewsForm";

const SuperAdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-24 md:pt-28">
        <SidebarAdmin isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="flex-1 p-4 md:p-6 mt-8">
          <NewsForm />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
