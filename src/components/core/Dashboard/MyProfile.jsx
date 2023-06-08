import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";


const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      {/* section 1 */}
      <div className="flex item-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        {/* left Part */}
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square rounded-full object-cover w-[78px]"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-lg font-semibold text-richblack-5">
              {user?.email}
            </p>
          </div>
        </div>

        {/* button */}
        <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            customClasses={
            "flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
            }
          />
      </div>

      {/* section 2 */}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        {/* left Part */}
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          {/* Right part button */}
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            customClasses={
            "flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
            }
          />
        </div>
        <p className="text-richblack-400 text-sm font-medium">
          {user?.additionalDetails?.about || "Write Something about yourself"}
        </p>
      </div>

      {/* Section 3 */}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-1">
        {/* Left part */}
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
          {/* Right part button */}
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
            customClasses={
            "flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined"
            }
          />
        </div>

        <div>
          {/* First name  */}
          <div>
            <p>First Name</p>
            <p>{user?.firstName}</p>
          </div>

          {/* Email*/}
          <div>
            <p>Email</p>
            <p>{user?.email}</p>
          </div>

          {/* gender*/}
          <div>
            <p>Gender</p>
            <p>{user?.additionalDetails?.gender ?? "Add gender"}</p>
          </div>

          {/* Last Name*/}
          <div>
            <p>Last Name</p>
            <p>{user?.lastName}</p>
          </div>

          {/* Phn No*/}
          <div>
            <p>Phone Number</p>
            <p>
              {user?.additionalDetails?.contactNumber ?? "Add Contact number"}
            </p>
          </div>

          {/*Date of Birth*/}
          <div>
            <p>Date of Birth</p>
            <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
