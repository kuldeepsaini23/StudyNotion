import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { IoArrowBack } from "react-icons/io5";
import { RxCounterClockwiseClock } from "react-icons/rx";


const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, signupData } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const {
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  } = signupData;
 
  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
   
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-3xl font-semibold text-richblack-5">Verify Email</h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">A verfication code has been sent to you. Enter the code below</p>

          <form onSubmit={handleVerifyAndSignup}>
          <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />

            <button type="submit" 
            className="w-full mt-6 rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
              Verify Email
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <div>
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <IoArrowBack />
                Back To Login
              </p>
            </Link>
            </div>

            <button onClick={()=>dispatch(sendOtp(signupData.email, navigate))}
              className="flex items-center text-blue-100 gap-x-2">
              <RxCounterClockwiseClock/>
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
