import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useVerifyOtpMutation } from "../hooks/useVerifyOtpMutation";
import { useForgotPasswordMutation } from "../hooks/useForgotPasswordMutation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import LockLogo from "../assets/lock-icon.png";

const OTPVerificationForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputs = useRef([]);
  const verifyOtpMutation = useVerifyOtpMutation();
  const resendOtpMutation = useForgotPasswordMutation();

  useEffect(() => {
    const username = Cookies.get("username");
    if (!username) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter complete OTP",
      });
      return;
    }
    verifyOtpMutation.mutate(otpString);
  };

  const handleResend = () => {
    const username = Cookies.get("username");
    if (!username) {
      navigate("/login");
      return;
    }
    resendOtpMutation.mutate(username, {
      onSuccess: () => {
        setTimeLeft(60);
      },
    });
  };

  return (
    <div className="bg-green-700 rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto">
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
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-2 rounded-xl text-center text-lg sm:text-xl font-bold focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
          />
        ))}
      </div>

      <div className="text-center mb-6">
        <p className="text-white mb-2 text-sm sm:text-base">
          {`${Math.floor(timeLeft / 60)}`.padStart(2, "0")}:
          {`${timeLeft % 60}`.padStart(2, "0")}
        </p>
        <p className="text-white text-sm sm:text-base">
          Silakan periksa email Anda untuk
          <br />
          kode verifikasi Anda.
        </p>
      </div>

      <button
        onClick={handleVerify}
        disabled={verifyOtpMutation.isPending}
        className="w-full bg-yellow-300 text-black font-semibold py-2.5 sm:py-3 px-4 rounded-full hover:bg-yellow-400 transition-colors mb-3 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {verifyOtpMutation.isPending && (
          <Loader2 className="animate-spin" size={20} />
        )}
        <span>
          {verifyOtpMutation.isPending ? "Verifying..." : "Verifikasi Kode"}
        </span>
      </button>

      <button
        onClick={handleResend}
        disabled={
          timeLeft > 0 ||
          verifyOtpMutation.isPending ||
          resendOtpMutation.isPending
        }
        className="w-full bg-transparent border-2 border-yellow-300 text-yellow-300 font-semibold py-2.5 sm:py-3 px-4 rounded-full hover:bg-yellow-300 hover:text-black transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {resendOtpMutation.isPending && (
          <Loader2 className="animate-spin" size={20} />
        )}
        <span>
          {resendOtpMutation.isPending ? "Sending..." : "Kirim Ulang OTP"}
        </span>
      </button>

      <div className="text-center">
        <p className="text-white text-sm sm:text-base">
          Belum dapat email?{" "}
          <button
            onClick={handleResend}
            disabled={
              timeLeft > 0 ||
              verifyOtpMutation.isPending ||
              resendOtpMutation.isPending
            }
            className="text-white font-bold hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
          >
            Kirim ulang email
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerificationForm;
