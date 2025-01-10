import AbsensiKamera from "../components/AttendanceCamera";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="pt-28 lg:pt-32">
        <Hero />
        <Stats />
        <AbsensiKamera />
        <Footer />
      </div>
    </>
  );
};

export default Home;
