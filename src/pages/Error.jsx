import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const Error = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-1 text-3xl flex-col gap-3 text-red justify-center items-center xs:min-h-screen w-full text-richblack-5 text-center">
      Error 404 - Page Not Found
      <div className="mt-6 flex items-center justify-between gap-4 min-w-[400px] flex-col xs:flex-row">
        {/*Go to home  */}
        <Link to="/" className="w-[50%] xs:w-full rounded-[8px] bg-yellow-50 py-[12px] px-5 font-medium text-richblack-900">
          <p className="flex items-center gap-x-2 text-richblack-800 text-lg text-center">
            <IoArrowBack />
            Back To Home
          </p>
        </Link>

        {/* go back */}
        <button className="w-[50%] xs:w-full rounded-[8px] bg-yellow-50 py-[12px] font-medium text-richblack-900 flex justify-center items-center"
          onClick={()=>navigate(-1)}>
          <p className="flex items-center gap-x-2 text-richblack-800 text-lg">
            <IoArrowBack />
            Go Back
          </p>
        </button>
      </div>
    </div>
  );
};

export default Error;
