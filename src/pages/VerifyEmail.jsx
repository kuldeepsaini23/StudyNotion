import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { IoArrowBack } from "react-icons/io5";
import { RxCounterClockwiseClock } from "react-icons/rx";


const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, signupData } = useSelector((state) => state.auth);


  const { accountType, firstName, lastName, email, password, confirmPassword} = signupData;
  console.log(signupData)
  console.log(accountType)

  useEffect(()=>{
    if(!signupData){
      navigate("/signup")
    }
  },[])

  const handleOnSubmit = (e) => {
    e.preventdeefault();
   
    dispatch(signUp( accountType, firstName, lastName, email, password, confirmPassword , otp, navigate));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div>Loding...</div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-3xl font-semibold text-richblack-5">Verify Email</h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">A verfication code has been sent to you. Enter the code below</p>

          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
              containerStyle={{justifyContent:"space-between", gap:"0px 6px"}}
              inputStyle= "w-[48px] bg-richblack-800 lg:w-[60px] rounded-md text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
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
