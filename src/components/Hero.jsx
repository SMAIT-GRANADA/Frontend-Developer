import { useState, useEffect, useCallback, memo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import granadaImg from "../assets/granada-school.webp";
import granadaImg2 from "../assets/backgroundschool2.webp";
import granadaImg3 from "../assets/backgroundschool3.webp";

const HeroSlide = memo(({ img, index }) => (
  <div className="min-w-full h-full relative">
    <img
      src={img}
      alt={`Granada School ${index + 1}`}
      className="w-full h-full object-cover brightness-50"
      loading={index === 0 ? "eager" : "lazy"}
    />
    <div className="absolute inset-0 bg-black/30 mix-blend-overlay" />
  </div>
));

const HeroButton = memo(({ onClick, direction, children }) => (
  <button
    onClick={onClick}
    className={`absolute ${
      direction === "left" ? "left-4" : "right-4"
    } top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 text-white hover:text-black hover:bg-yellow-400 transition-all`}
  >
    {children}
  </button>
));

const HeroBullet = memo(({ active, onClick }) => (
  <div
    onClick={onClick}
    className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
      active ? "bg-yellow-400 w-6" : "bg-white/50 hover:bg-white/80"
    }`}
  />
));

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timerRef = useRef(null);
  const resumeTimerRef = useRef(null);
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
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5000);
    } else {
      resumeTimerRef.current = setTimeout(() => {
        setAutoPlay(true);
      }, 3000);
    }

    return () => {
      clearInterval(timerRef.current);
      clearTimeout(resumeTimerRef.current);
    };
  }, [autoPlay, images.length]);

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out will-change-transform"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((img, index) => (
          <HeroSlide key={index} img={img} index={index} />
        ))}
      </div>

      <HeroButton onClick={prevSlide} direction="left">
        <ChevronLeft size={24} />
      </HeroButton>

      <HeroButton onClick={nextSlide} direction="right">
        <ChevronRight size={24} />
      </HeroButton>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <HeroBullet
            key={index}
            active={currentSlide === index}
            onClick={() => handleBulletClick(index)}
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

export default memo(Hero);
