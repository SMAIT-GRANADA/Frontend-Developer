import React from "react";
import AbsensiKamera from "../components/AttendanceCamera";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-6">Welcome to the Home Page</h1>
      <AbsensiKamera />
    </div>
  );
};

export default Home;
