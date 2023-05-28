import React, { useState } from "react";
import frameImage from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

const Template = ({
  title,
  desc1,
  desc2,
  image,
  formtype,
  setIsLoggedIn,
  getAccountType,
}) => {
  const [accountType, setAccountType] = useState("student");

  function sendData() {
    console.log(accountType);
    getAccountType(accountType);
  }

  return (
    <div className="flex justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0">
      <div className="w-11/12 max-w-[450px]">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          {title}
        </h1>

        <p className="text-[1.25rem] leading-[1.625rem] mt-4">
          <span className="text-richblack-100">{desc1}</span>
          <br />
          <span className="text-blue-100 italic">{desc2}</span>
        </p>

        {/* Student Instructor tab */}
        <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max">
          <button
            className={`${
              accountType === "student"
                ? "bg-richblack-900 text-richblack-5"
                : "bg-transparent text-richblack-200"
            } py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => {
              setAccountType("student");
              sendData();
            }}
          >
            Student
          </button>

          <button
            className={`${
              accountType === "instructor"
                ? " bg-richblack-900 text-richblack-5"
                : "bg-transparent text-richblack-200"
            } py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => {
              setAccountType("instructor");
              sendData();
            }}
          >
            Instructor
          </button>
        </div>
        {formtype === "signup" ? (
          <SignupForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}

        <div className="flex w-full items-center my-4 gap-x-2">
          <div className="w-full h-[1px] bg-richblack-700"></div>
          <p className="text-richblack-700 font-medium leading-[1.375rem]">
            OR
          </p>
          <div className="w-full h-[1px] bg-richblack-700"></div>
        </div>

        <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 hover:bg-richblue-5 hover:text-richblack-900 transition-all duration-200">
          <FcGoogle />
          <p>Sign Up with Google</p>
        </button>

        <button
          className="w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 hover:bg-richblue-5 hover:text-richblack-900
         transition-all duration-200"
        >
          <BsFacebook color="#4267B2" />
          <p>Sign Up with Facebook</p>
        </button>
      </div>

      <div className="relative w-11/12 max-w-[450px]">
        <img
          src={frameImage}
          alt="Frame"
          width={558}
          height={504}
          loading="lazy"
        />

        <img
          src={image}
          alt="Frame"
          width={558}
          height={504}
          loading="lazy"
          className="absolute -top-4 right-4"
        />
      </div>
    </div>
  );
};

export default Template;
