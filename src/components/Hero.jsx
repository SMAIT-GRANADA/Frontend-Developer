import granadaImg from "../assets/granada-school.png";

const Hero = () => {
  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full">
      <div className="absolute inset-0">
        <img
          src={granadaImg}
          alt="Granada School"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-black/30 mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex flex-col items-start justify-center h-full px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-white text-lg md:text-xl lg:text-2xl font-medium mb-2">
          Join Us!!
        </h2>

        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
          SMAIT GRANADA
        </h1>

        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          SAMARINDA
        </h1>

        <button className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-4 md:px-6 py-2 text-sm md:text-base rounded-lg hover:bg-yellow-400 hover:text-white transition-all duration-300">
          Lihat selengkapnya
        </button>
      </div>
    </div>
  );
};

export default Hero;
