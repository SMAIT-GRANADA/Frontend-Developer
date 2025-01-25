import React from "react";
import ResetPasswordForm from "../components/Form/ResetPasswordForm";
import loginBanner from "../assets/granada-school.png";

const ResetPasswordPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginBanner})` }}
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
