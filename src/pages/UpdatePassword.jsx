import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AiFillCheckCircle,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { resetPassword } from "../services/operations/authAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";
import { MdDoNotDisturbOn } from "react-icons/md";



const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;

  const { loading } = useSelector((state) => state.auth);

  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  const minLengthRegExp = /.{8,}/;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));

    console.log("Outside of checking Condition")

  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }

    const uppercasePassword = uppercaseRegExp.test(password);
    const lowercasePassword = lowercaseRegExp.test(password);
    const digitsPassword = digitsRegExp.test(password);
    const specialCharPassword = specialCharRegExp.test(password);
    const minLengthPassword = minLengthRegExp.test(password);

    if (!minLengthPassword) {
      setFormData({
        password: "",
        confirmPassword: "",
      });
      return toast.error("Password Too Short");
    } else if (!uppercasePassword) {
      setFormData({
        password: "",
        confirmPassword: "",
      });
      return toast.error("Atleast have one Uppercase");
    } else if (!lowercasePassword) {
      setFormData({
        password: "",
        confirmPassword: "",
      });
      return toast.error("Atleast have one Lowercase");
    } else if (!digitsPassword) {
      setFormData({
        password: "",
        confirmPassword: "",
      });
      return toast.error("Atleast have one digit");
    } else if (!specialCharPassword) {
      setFormData({
        password: "",
        confirmPassword: "",
      });
      return toast.error("Atleast have one special charater");
    }

    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };


  const ValidationData = [
    {
      id: 1,
      name: "one lowercase charater",
      regx:lowercaseRegExp,
    },
    {
      id: 2,
      name: "one special charater",
      regx:specialCharRegExp,
    },
    {
      id: 3,
      name: "one uppercase charater",
      regx:uppercaseRegExp
    },
    {
      id: 4,
      name: "8 character minimum",
      regx:minLengthRegExp,
    },
    {
      id: 5,
      name: "one number",
      regx:digitsRegExp,
    },
  ];

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center my-14">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-3xl font-semibold text-richblack-5">
            Choose new Password
          </h1>
          <p className="my-4 text-xl font-semibold text-richblack-100">
            Almost done. Enter your new password and youre all set.
          </p>

          <form onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-100">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 border-b-[0.001rem] border-richblack-5"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 border-b-[0.001rem] border-richblack-5"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <div className="my-5 flex justify-start items-center flex-wrap gap-4">
              {ValidationData.map((item) => (
                <div
                  className="flex gap-2 items-center"
                  key={item.id}
                >
                   {item.regx.test(password) ? (
                    <AiFillCheckCircle className="text-caribbeangreen-200" />
                  ) : (
                    <MdDoNotDisturbOn className="text-pink-400" />
                  )}
                  <p className={`${item.regx.test(password) ? "text-caribbeangreen-200" : "text-pink-400"}`}>
                    {item.name}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full mt-6 rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <IoArrowBack />
                Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
