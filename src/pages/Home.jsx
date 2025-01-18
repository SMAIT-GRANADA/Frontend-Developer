import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import MapRegist from "../components/MapRegist";
import StaffGrid from "../components/StaffGrid";
import ProfilGranada from "../components/ProfileGranada";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="pt-28 lg:pt-32">
        <Hero />
        <Stats />
        <ProfilGranada />
        <div className="relative pb-20 md:pb-32 bg-transparent">
          <MapRegist />
        </div>
        <div className="w-full bg-white">
          <StaffGrid />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
