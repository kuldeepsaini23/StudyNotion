import React from "react";
import Template from "../components/core/LoginAndSingupPage/Template";
import loginImage from "../assets/Images/login.webp";

const Login = ({ setIsLoggedIn }) => {
  return (
    <Template
      title="Welcome Back"
      desc1={"Build skills for today, tomorrow, and beyond."}
      desc2={"Education to future-proof your career."}
      image={loginImage}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}

    />
  );
};

export default Login;
