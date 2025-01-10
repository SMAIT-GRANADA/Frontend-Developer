import React from "react";
import AbsensiKamera from "../components/AttendanceCamera";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AbsensiKamera />
    </>
  );
};

export default Home;
