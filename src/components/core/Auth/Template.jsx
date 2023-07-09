import React from "react";
import frameImg from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
// import { FcGoogle } from "react-icons/fc";
// import { BsFacebook } from "react-icons/bs";
import { useSelector } from "react-redux";

const Template = ({ title, desc1, desc2, image, formType }) => {
  const { loading } = useSelector((state) => state.auth);


  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center mt-14">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{desc1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {desc2}
              </span>
            </p>
            {formType === "signup" ? (
              <SignupForm/>
            ) : (
              <LoginForm />
            )}
          </div>
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
