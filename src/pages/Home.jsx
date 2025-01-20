import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import MapRegist from "../components/MapRegist";
import StaffGrid from "../components/StaffGrid";
import ProfilGranada from "../components/ProfileGranada";
import NewsLayout from "../components/NewsLayout";
import VideoPage from "../components/VideoPage";
import QuotesOfTheDay from "../components/QuotesOfTheDay";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="pt-28 lg:pt-32">
        <Hero />
        <Stats />
        <ProfilGranada />
        <div className="w-full bg-white pb-8">
          <VideoPage />
        </div>
        <div className="w-full bg-white py-8">
          <NewsLayout />
        </div>
        <div className="relative pb-20 md:pb-32 bg-transparent">
          <MapRegist />
        </div>
        <div className="w-full bg-[#F8FCF8]">
          <StaffGrid />
        </div>
        <QuotesOfTheDay />
        <Footer />
      </div>
    </>
  );
};

export default Home;
