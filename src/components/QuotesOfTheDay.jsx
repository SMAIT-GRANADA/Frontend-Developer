import React from "react";
import line from "../assets/line.svg";
import quotes from "../assets/quotes.svg";
import { useGetQuotes } from "../hooks/useQoutes";

const QuotesOfTheDay = () => {
  const { quote, loading, error, isEmpty } = useGetQuotes();

  if (error) return <div>Error loading quote</div>;

  return (
    <div className="bg-[#428938] py-6 px-4">
      <div className="container mx-auto px-4 lg:px-48 py-10 flex items-center">
        <img src={line} alt="" className="mr-6" />
        <div className="flex-1">
          <img src={quotes} alt="" />
          <blockquote className="text-black text-2xl font-medium">
            {loading
              ? "Loading quote..."
              : isEmpty
              ? "Tidak ada quotes hari ini"
              : quote}
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default QuotesOfTheDay;
