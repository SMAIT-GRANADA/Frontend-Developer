import React from "react";
import AbsensiKamera from "../components/AttendanceCamera";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <AbsensiKamera />
    </>
  );
};

export default Home;
