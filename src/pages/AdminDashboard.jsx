import React from "react";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import Navbar from "../components/Navbar";
import NewsForm from "../components/Form/NewsForm";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-28">
        <SidebarAdmin />
        <main className="flex-1 p-6 mt-4">
          <NewsForm />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
