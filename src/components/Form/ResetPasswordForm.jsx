import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useResetPasswordMutation } from "../../hooks/useResetPasswordMutation";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetPasswordMutation = useResetPasswordMutation();

  useEffect(() => {
    const resetToken = Cookies.get("resetToken");
    if (!resetToken) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const handleSubmit = () => {
    const resetToken = Cookies.get("resetToken");
    if (!resetToken) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Reset token not found",
      });
      return;
    }

    if (!password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all fields",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match",
      });
      return;
    }

    if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password must be at least 8 characters long",
      });
      return;
    }

    resetPasswordMutation.mutate({
      resetToken,
      newPassword: password,
      confirmPassword,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
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
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors focus:outline-none"
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
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors focus:outline-none"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={resetPasswordMutation.isPending}
            className="w-3/4 bg-yellow-300 text-black font-semibold py-3 px-4 rounded-full hover:bg-yellow-400 active:bg-yellow-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-green-700"
          >
            {resetPasswordMutation.isPending ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Loading...</span>
              </>
            ) : (
              "Ubah Kata Sandi"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
