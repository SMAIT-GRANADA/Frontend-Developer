import granadaImg from "../assets/granada-school.png";
import granadaImg2 from "../assets/backgroundschool2.jpg";
import granadaImg3 from "../assets/backgroundschool3.jpg";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const images = [granadaImg, granadaImg2, granadaImg3];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setAutoPlay(false);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setAutoPlay(false);
  }, [images.length]);

  const handleBulletClick = useCallback((index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  }, []);

  useEffect(() => {
    let slideTimer;
    let resumeTimer;

    if (autoPlay) {
      slideTimer = setInterval(() => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000);
    }

    if (!autoPlay) {
      resumeTimer = setTimeout(() => {
        setAutoPlay(true);
      }, 3000);
    }

    return () => {
      clearInterval(slideTimer);
      clearTimeout(resumeTimer);
    };
  }, [autoPlay, images.length]);

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="min-w-full h-full relative">
            <img
              src={img}
              alt={`Granada School ${index + 1}`}
              className="w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 bg-black/30 mix-blend-overlay" />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:text-black hover:bg-yellow-400 transition-all"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:text-black hover:bg-yellow-400 transition-all"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => handleBulletClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index
                ? "bg-yellow-400 w-6"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-start justify-center h-full px-16 md:px-24 lg:px-32 max-w-7xl mx-auto">
        <h2 className="text-white text-lg md:text-xl lg:text-2xl font-medium mb-2">
          Join Us!!
        </h2>
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
          SMAIT GRANADA
        </h1>
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          SAMARINDA
        </h1>
        <Link
          to="/pendaftaran"
          className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-4 md:px-6 py-2 text-sm md:text-base rounded-lg hover:bg-yellow-400 hover:text-white transition-all duration-300"
        >
          Lihat selengkapnya
        </Link>
      </div>
    </div>
  );
};

export default Hero;
