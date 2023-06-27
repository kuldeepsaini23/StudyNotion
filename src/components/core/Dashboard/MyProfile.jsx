import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import {formattedDate} from "../../../utils/dateFormatter"

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      {/* section 1 */}
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
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
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      {/* section 2 */}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        {/* left Part */}
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          {/* Right part button */}
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p className="text-richblack-400 text-sm font-medium">
          {user?.additionalDetails?.about || "Write Something about yourself"}
        </p>

        {
          user?.socials.length>0 && (
          <div className="flex w-full flex-col gap-y-5">
            <p className="text-lg font-semibold text-richblack-5">Socials</p>
            <p className="text-richblack-400 text-sm font-medium">{ "Write Something about yourself"}</p>
          </div>
          )
        }
      </div>

      {/* Section 3 */}
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        {/* Left part */}
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          {/* Right part button */}
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="flex max-w-[500px] justify-between">
        {/* left part */}
          <div className="flex flex-col gap-y-5">
            {/* First name  */}
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
            </div>

            {/* Email*/}
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">{user?.email}</p>
            </div>

            {/* gender*/}
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.gender ?? "Add gender"}</p>
            </div>
          </div>

        {/* Right part */}
          <div className="flex flex-col gap-y-5">
            {/* Last Name*/}
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
            </div>

            {/* Phn No*/}
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact number"}
              </p>
            </div>

            {/*Date of Birth*/}
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default MyProfile;
