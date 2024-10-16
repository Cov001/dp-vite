import React from "react";
import AuthEmail from "../../components/AuthEmail";
const AuthCode = () => {
  const cp = localStorage.getItem("nameSign");
  const ca = localStorage.getItem("emailSign");
  const ct = localStorage.getItem("passSign");
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <AuthEmail name={cp} email={ca} pass={ct} />
    </div>
  );
};

export default AuthCode;
