import React,{useState} from "react";
import Template from "../components/core/LoginAndSingupPage/Template";
import signupImage from "../assets/Images/signup.webp";
import instructorImage from "../assets/Images/Instructor.png"

const Signup = ({setIsLoggedIn}) => {
  const [accountType, setAccountType] = useState('');

  const getAccountType = (accountTypeFromTemplate) =>{
    setAccountType(accountTypeFromTemplate)
  }

  return (
    <Template
      title={
        accountType === "student"
          ? "Join the millions learners to guide the students"
          : "Join the millions learning to code with StudyNotion for free"
      }
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
          : (signupImage)}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
      getAccountType={getAccountType}
    />
  );
};

export default Signup;
