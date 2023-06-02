import React from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const Error = () => {
  return (
    <div className="flex flex-1 text-3xl flex-col gap-3 text-red justify-center items-center min-h-screen w-full text-richblack-5">
      Error 404 - Page Not Found
      <div className="mt-6 flex items-center justify-between">
        <Link to="/" className="w-full rounded-[8px] bg-yellow-50 py-[12px] px-5 font-medium text-richblack-900">
          <p className="flex items-center gap-x-2 text-richblack-800 text-lg">
            <IoArrowBack />
            Back To Home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Error;
