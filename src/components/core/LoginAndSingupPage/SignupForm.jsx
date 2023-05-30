import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import countrycode from "../../../data/countrycode.json";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countrycode: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [createPassword, setCreatePassword] = useState(false);
  const [accountType, setAccountType] = useState("student");

  const changeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
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
          }}
        >
          Instructor
        </button>
      </div>
      <form className="flex flex-col w-full gap-y-4 mt-6">
        {/* Fist name and Last Name */}
        <div className="flex gap-x-4 mt-[10px]">
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              First Name<sup className="text-pink-200">*</sup>
            </p>

            <input
              required
              type="text"
              value={formData.firstName}
              onChange={changeHandler}
              placeholder="Enter First Name"
              name="firstName"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[0.001rem] border-richblack-5"
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name<sup className="text-pink-200">*</sup>
            </p>

            <input
              required
              type="text"
              value={formData.lastName}
              onChange={changeHandler}
              placeholder="Enter Last Name"
              name="lastName"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[0.001rem] border-richblack-5"
            />
          </label>
        </div>

        {/* Email */}
        <label className="w-full mt-[10px]">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address<sup className="text-pink-200">*</sup>
          </p>

          <input
            required
            type="text"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter Email Id"
            name="email"
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[0.001rem] border-richblack-5"
          />
        </label>

        {/* Country Code and Phone no */}

        <label className="w-full mt-[10px]">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            Phone Number<sup className="text-pink-200">*</sup>
          </p>
          <div className="flex gap-x-4 mt-[10px]">
            <select
              id="countryCode"
              // value={}
              // onChange={(e) => setSelectedCountryCode(e.target.value)}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[20%] p-[16px] border-b-[0.001rem] border-richblack-5"
            >
              <option value="+91">+91-India</option>
              {countrycode.map((country) => (
                <option
                  key={country.code}
                  value={country.code}
                  className="text-richblack-5 w-[90%]"
                >
                  {country.code}-{country.country}
                </option>
              ))}
            </select>

            <input
              required
              type="text"
              value={formData.phoneNo}
              onChange={changeHandler}
              placeholder="1234567890"
              name="phoneNo"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-[80%] p-[12px] border-b-[0.001rem] border-richblack-5"
            />
          </div>
        </label>

        {/*Confirm Password and Password  */}
        <div className="flex gap-x-4 mt-[10px]">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Create Password<sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter Password"
              name="password"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[0.001rem] border-richblack-5"
            />

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm Password<sup className="text-pink-200"> *</sup>
            </p>

            <input
              required
              type={createPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={changeHandler}
              placeholder="Confirm Password"
              name="confirmPassword"
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[0.001rem] border-richblack-5"
            />

            <span
              onClick={() => setCreatePassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer"
            >
              {createPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button className="bg-yellow-50 rounded-[8px] font-medium text-black px-[12px] py-[8px] mt-6 hover:bg-richblack-5 transition-all duration-200">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
