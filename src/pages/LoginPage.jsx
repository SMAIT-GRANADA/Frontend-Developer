import LoginForm from "../components/LoginForm";
import loginBanner from "../assets/granada-school.webp";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginBanner})` }}
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
