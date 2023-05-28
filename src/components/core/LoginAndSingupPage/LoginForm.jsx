import React, { useState } from "react";
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form className="flex flex-col w-full gap-y-4 mt-6">
      <label className='w-full'>
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
          Email Address<sup className='text-pink-200'>*</sup>
        </p>

        <input
          required
          type="text"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter Email Id"
          name="email"
          className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[0.001rem] border-richblack-5'
        />
      </label>

      <label className='w-full relative'>
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
          Password<sup className='text-pink-200'>*</sup>
        </p>
        <input
          required
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
          className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
        />
       <span onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-[38px] cursor-pointer">
        {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)}
      </span>

        <Link to={"/"}>
          <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
            Forgot Password
          </p>
        </Link>
      </label>

      <button className='bg-yellow-50 rounded-[8px] font-medium text-black px-[12px] py-[8px] mt-6 hover:bg-richblack-5 transition-all duration-200'>
        Sign In
      </button>

    </form>
  );
};

export default LoginForm;
