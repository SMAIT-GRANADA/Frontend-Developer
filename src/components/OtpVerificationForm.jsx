import React, { useState, useEffect, useRef } from "react";
import LockLogo from "../assets/lock-icon.png";

const OTPVerificationForm = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(35);
  const inputs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="bg-green-700 rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 w-full  sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto">
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <div className="rounded-full mb-4 sm:mb-6">
          <img
            src={LockLogo}
            alt="lock"
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-white">
          VERIFIKASI OTP
        </h2>
        <p className="text-white text-center text-sm sm:text-base mb-4">
          Masukkan kode verifikasi
        </p>
      </div>

      <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            ref={(ref) => (inputs.current[index] = ref)}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-2 rounded-xl text-center text-lg sm:text-xl font-bold focus:border-green-600 focus:outline-none"
          />
        ))}
      </div>

      <div className="text-center mb-6">
        <p className="text-white mb-2 text-sm sm:text-base">
          {`${Math.floor(timeLeft / 60)}`.padStart(2, "0")}:
          {`${timeLeft % 60}`.padStart(2, "0")}
        </p>
        <p className="text-white text-sm sm:text-base">
          Silakan periksa email Anda G**********@gmail.com untuk
          <br />
          kode verifikasi Anda.
        </p>
      </div>

      <button className="w-full bg-yellow-300 text-black font-semibold py-2.5 sm:py-3 px-4 rounded-full hover:bg-yellow-400 transition-colors mb-3">
        Verifikasi Kode
      </button>

      <button className="w-full bg-transparent border-2 border-yellow-300 text-yellow-300 font-semibold py-2.5 sm:py-3 px-4 rounded-full hover:bg-yellow-300 hover:text-black transition-colors mb-4">
        Kirim Ulang OTP
      </button>

      <div className="text-center">
        <p className="text-white text-sm sm:text-base">
          Belum dapat email?{" "}
          <button className="text-white font-bold hover:underline">
            Kirim ulang email
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerificationForm;
