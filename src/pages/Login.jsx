import React, { useState } from "react";
import Template from "../components/core/LoginAndSingupPage/Template";
import loginImage from "../assets/Images/login.webp";
import instructorImage from "../assets/Images/Instructor.png"

const Login = ({ setIsLoggedIn }) => {
  const [accountType, setAccountType] = useState("");

  const getAccountType = (accountTypeFromTemplate) => {
    setAccountType(accountTypeFromTemplate);
  };

  return (
    <Template
      title="Welcome Back"
      desc1={
        accountType === "student"
          ? "Discover your passions,"
          : "Build skills for today, tomorrow, and beyond."
      }
      desc2={
        accountType === "student"
          ? "Be Unstoppable"
          : "Education to future-proof your career."
      }
      image={ accountType === "student"
          ? (instructorImage)
          : (loginImage)}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
      getAccountType={getAccountType}
    />
  );
};

export default Login;
