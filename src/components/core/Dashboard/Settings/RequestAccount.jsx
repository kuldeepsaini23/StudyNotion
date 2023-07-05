import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../../../utils/constants";
import IconBtn from "../../../common/IconBtn";

const RequestAccount = () => {
  // const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  // const submitPasswordForm = async (data) => {
  //   // console.log("password Data - ", data)
  //   try {
  //     await changePassword(token, data);
  //   } catch (error) {
  //     console.log("ERROR MESSAGE - ", error.message);
  //   }
  // };

  return (
    <>
      {user && user.accountType !== ACCOUNT_TYPE.ADMIN && (ACCOUNT_TYPE.INSTRUCTOR) && (
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Account Type
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <div className="flex flex-col gap-2">
                <p className="text-lg text-richblack-100">
                  Account Type:{" "}
                  <span className="text-richblack-5 font-semibold">
                    {user.accountType}
                  </span>
                </p>

                <p className="text-lg text-richblack-100">
                  Wanna Switch Account Type to{" "}
                  <span className="text-richblack-5 font-semibold">
                    Instructor?
                  </span>
                </p>
                <p className="text-lg text-pink-200">Note: If you Switch the Account then you will </p>
              </div>
              <div className="flex justify-start gap-2 mt-3">
                <button
                  onClick={() => {
                    navigate("/dashboard/my-profile");
                  }}
                  className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                  Cancel
                </button>
                <IconBtn type="submit" text="Request" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestAccount;
