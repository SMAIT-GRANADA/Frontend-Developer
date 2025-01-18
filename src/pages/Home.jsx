import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import MapRegist from "../components/MapRegist";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="pt-28 lg:pt-32">
        <Hero />
        <Stats />
        <div className="relative pb-20 md:pb-32">
          <MapRegist />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
