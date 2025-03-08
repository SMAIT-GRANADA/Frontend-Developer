import React from "react";
import line from "../assets/line.svg";
import quotes from "../assets/quotes.svg";
import { useGetDailyQuote } from "../hooks/useQoutes";

const QuotesOfTheDay = () => {
  const { data, isLoading, error } = useGetDailyQuote();

  if (error) {
    return (
      <div className="bg-[#428938] py-6 px-4">
        <div className="container mx-auto px-4 lg:px-48 py-10">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center justify-center">
            <div className="text-white mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h2 className="text-white text-xl font-semibold mb-2">
              Gagal memuat kutipan
            </h2>
            <p className="text-white text-opacity-90 text-center mb-4">
              Kutipan hari ini tidak dapat ditampilkan. Silakan coba kembali
              nanti.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white hover:bg-gray-100 text-green-800 rounded-md 
                      transition-colors duration-300 font-medium flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
              </svg>
              Muat ulang
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#428938] py-6 px-4">
      <div className="container mx-auto px-4 lg:px-48 py-10 flex items-center">
        <img src={line} alt="" className="mr-6" />
        <div className="flex-1">
          <img src={quotes} alt="" />
          <blockquote className="text-black text-2xl font-medium">
            {isLoading
              ? "Loading quote..."
              : data?.isEmpty
              ? "Tidak ada quotes hari ini"
              : data?.quote}
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default QuotesOfTheDay;
