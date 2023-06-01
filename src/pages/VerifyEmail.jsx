import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, signupData } = useSelector((state) => state.auth);

  const {  accountType, firstName, lastName, email, password, confirmPassword } = signupData;

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
    <div>
      {loading ? (
        <div>Loding...</div>
      ) : (
        <div className="min-h-screen w-full flex flex-col gap-3 text-richblack-5 justify-center items-center">
          <h1>Verify Email</h1>
          <p>A verfication code has been sent to you. Enter the code below</p>

          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
            />

            <button type="submit">Verify Email</button>
          </form>

          <div className="flex flex-row justify-around">
            <div>
              <Link to="/login">
                <p>Back To Login</p>
              </Link>
            </div>

            <button onClick={()=>dispatch(sendOtp(signupData.email, navigate))}>
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
