import Footer from "../components/Footer";
import MapRegist from "../components/MapRegist";
import Navbar from "../components/Navbar";
import RegistrationPaths from "../components/RegistrationPaths";
import psbBackground from "../assets/PSBBG.png";

const PsbPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mt-24 md:mt-28 w-full relative">
        <div className="w-full h-full relative overflow-hidden">
          <img
            src={psbBackground}
            alt="PSB Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10" />
        </div>
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
