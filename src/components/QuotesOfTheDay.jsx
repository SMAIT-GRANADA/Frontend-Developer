import React from "react";
import line from "../assets/line.svg";
import quotes from "../assets/quotes.svg";

const QuotesOfTheDay = () => {
  return (
    <div className="bg-[#428938] py-6 px-4">
      <div className="container mx-auto px-4 lg:px-48 py-10 flex items-center">
        <img src={line} alt="" className="mr-6" />
        <div className="flex-1">
          <img src={quotes} alt="" className="" />
          <blockquote className="text-black text-2xl font-medium">
            Quotes of the day
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default QuotesOfTheDay;
