import { useState } from "react";
import schoolLogo from "../assets/logo-sekolah.svg";
import { Eye, EyeOff, User } from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-full rounded-xl overflow-hidden">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white p-8">
        <img
          src={schoolLogo}
          alt="School Logo"
          className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40"
        />
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mt-4 lg:mt-6">
          SMAIT GRANADA
          <br />
          SAMARINDA
        </h1>
      </div>

      <div className="w-full lg:w-1/2 bg-green-700 p-6 sm:p-8">
        <div className="h-full flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-xl sm:text-2xl text-white font-semibold mb-6 sm:mb-8">
              Login
            </h2>

            <form className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ID"
                  className="w-full bg-transparent border-b-2 border-white/50 py-2 text-white placeholder-white/70 focus:outline-none focus:border-white pr-10"
                />
                <User
                  className="absolute right-2 top-2 text-white/70"
                  size={20}
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="PASSWORD"
                  className="w-full bg-transparent border-b-2 border-white/50 py-2 text-white placeholder-white/70 focus:outline-none focus:border-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-white/70"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-full hover:bg-yellow-300 transition-colors mt-8"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
