import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="bg-green-700 rounded-3xl shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-[90%] sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
          Atur Ulang Sandi
        </h1>
        <p className="text-white text-sm sm:text-base mb-2">
          Permintaan atur ulang sandimu telah diterima.
        </p>
        <p className="text-white text-xs sm:text-base">
          Ayo, atur ulang sandimu sekarang!
        </p>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Kata Sandi Baru"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 focus:outline-none"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Konfirmasi Kata Sandi"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 focus:outline-none"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex justify-center">
          <button className="w-3/4 bg-yellow-300 text-black font-semibold py-3 px-4 rounded-full hover:bg-yellow-400 transition-colors">
            Ubah Kata Sandi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
