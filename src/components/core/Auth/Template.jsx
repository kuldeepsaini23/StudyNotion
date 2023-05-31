import React from "react";
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
  formType
}) => {



  return (
    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-around items-center gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12 mt-10">
      <div className="w-11/12 max-w-[450px]">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          {title}
        </h1>

        <p className="text-[1.25rem] leading-[1.625rem] mt-4">
          <span className="text-richblack-100">{desc1}</span>
          <br />
          <span className="text-blue-100 italic">{desc2}</span>
        </p>

        {formType === "signup" ? (
          <SignupForm />
        ) : (
          <LoginForm />
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
          <p>{formType=== "signup" ? "Sign Up" : "Sign In"} with Google</p>
        </button>

        <button
          className="w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 hover:bg-richblue-5 hover:text-richblack-900
         transition-all duration-200"
        >
          <BsFacebook color="#4267B2" />
          <p>{formType=== "signup" ? "Sign Up" : "Sign In"} with Facebook</p>
        </button>
      </div>

      <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
        <img
          src={frameImage}
          alt="Pattern"
          width={558}
          height={504}
          loading="lazy"
        />

        <img
          src={image}
          alt="students"
          width={558}
          height={504}
          loading="lazy"
          className="absolute -top-4 right-4 z-10"
        />
      </div>
    </div>
  );
};

export default Template;
