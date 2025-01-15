import Footer from "../components/Footer";
import MapRegist from "../components/MapRegist";
import Navbar from "../components/Navbar";
import RegistrationPaths from "../components/RegistrationPaths";
import psbBackground from "../assets/PSBBG.png";

const PsbPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mt-32 md:mt-36 w-full relative">
        <img
          src={psbBackground}
          alt="PSB Background"
          className="w-full h-[200px] md:h-[400px] lg:h-[500px] object-cover"
        />
      </div>
      <div className="flex-grow">
        <RegistrationPaths />
        <div className="relative pb-20 md:pb-32">
          <MapRegist />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PsbPage;
