import AbsensiKamera from "../components/AttendanceCamera";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="pt-28 lg:pt-32">
        <Hero />
        <Stats />
        <AbsensiKamera />
      </div>
    </>
  );
};

export default Home;
