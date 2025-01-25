import { useState } from "react";
import { Eye, EyeOff, User, Loader2 } from "lucide-react";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { useForgotPasswordMutation } from "../hooks/useForgotPasswordMutation";
import Swal from "sweetalert2";
import schoolLogo from "../assets/logo-sekolah.svg";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const loginMutation = useLoginMutation();
  const forgotPasswordMutation = useForgotPasswordMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in all fields",
      });
      return;
    }
    loginMutation.mutate(credentials);
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleForgotPassword = () => {
    if (!credentials.username) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter your username first",
      });
      return;
    }
    forgotPasswordMutation.mutate(credentials.username);
  };

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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="USERNAME"
                  autoComplete="off"
                  className="w-full border-b-2 bg-transparent border-white/50 py-2 text-white placeholder-gray-200 focus:outline-none focus:border-white pr-10"
                />
                <User
                  className="absolute right-2 top-2 text-gray-200"
                  size={20}
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="PASSWORD"
                  autoComplete="off"
                  className="w-full bg-transparent border-b-2 border-white/50 py-2 text-white placeholder-gray-200 focus:outline-none focus:border-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-200"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              <div className="text-right text-xs md:text-sm mt-4">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-white hover:underline"
                >
                  Lupa Kata Sandi?
                </button>
              </div>
              <button
                type="submit"
                disabled={
                  loginMutation.isPending || forgotPasswordMutation.isPending
                }
                className="w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-full hover:bg-yellow-300 transition-colors mt-8 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {(loginMutation.isPending ||
                  forgotPasswordMutation.isPending) && (
                  <Loader2 className="animate-spin" size={20} />
                )}
                <span>
                  {loginMutation.isPending || forgotPasswordMutation.isPending
                    ? "Loading..."
                    : "Login"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
