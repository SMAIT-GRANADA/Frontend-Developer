import React from "react";
import AbsensiKamera from "../components/AttendanceCamera";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-bold mb-6">Welcome to the Home Page</h1>
      <AbsensiKamera />
    </>
  );
};

export default Home;
