import OTPVerificationForm from "../components/OtpVerificationForm";
import loginBanner from "../assets/granada-school.png";

const OTPVerificationPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginBanner})` }}
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10">
        <OTPVerificationForm />
      </div>
    </div>
  );
};

export default OTPVerificationPage;
