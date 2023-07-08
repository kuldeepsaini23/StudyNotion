import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import { formattedDate } from "../../../utils/dateFormatter";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      {/* section 1 */}
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 xs:flex-row flex-col-reverse gap-y-8">
        {/* left Part */}
        <div className="flex items-center gap-x-4 flex-col sm:flex-row">
          <Link to={`/instructor/${user._id}`}>
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square rounded-full object-cover w-[78px]"
            />
          </Link>

          <div className="space-y-1">
            <Link to={`/instructor/${user._id}`}>
              <p className="text-sm xs:text-lg text-center sm:text-left font-semibold text-richblack-5 hover:underline hover:text-caribbeangreen-300">
                {user?.firstName + " " + user?.lastName}
              </p>
            </Link>

            <p className="text-sm xs:text-lg font-semibold text-richblack-5 text-center sm:text-left">
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
        <div className="flex w-full items-center justify-between gap-4 flex-col-reverse xs:flex-row">
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

        <p className="text-lg text-richblack-5">
          Account Type:{" "}
          <span className=" font-semibold">{user?.accountType}</span>
        </p>
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

        <div className="flex max-w-[500px] justify-between flex-col xs:flex-row">
          {/* left part */}
          <div className="flex flex-col gap-y-5">
            {/* First name  */}
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>

            {/* Email*/}
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>

            {/* gender*/}
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add gender"}
              </p>
            </div>
          </div>

          {/* Right part */}
          <div className="flex flex-col gap-y-5">
            {/* Last Name*/}
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
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

      {/* Section 4 Social Media */}

      {user.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:p-8 sm:px-12 px-2 py-2">
          {/* Left part */}
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">
              Social Media Details
            </p>
            {/* Right part button */}
            <IconBtn
              text={user?.socials.length > 0 ? "Edit" : "Add"}
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            >
              {user?.socials.length > 0 ? (
                <RiEditBoxLine />
              ) : (
                <AiOutlinePlusCircle />
              )}
            </IconBtn>
          </div>

          
          {/*Social Links */}
          <Table>
            <Thead>
              <Tr className="flex gap-x-14 px-6 py-2 justify-between">
                <Th className="text-lg sm:text-sm font-medium text-richblack-600">Platform</Th>
                <Th className="flex flex-1 text-lg sm:text-sm font-medium text-richblack-600">Link</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                user?.socials.map((social,i)=>(
                  <Tr key={i} className="flex gap-x-14 px-6 py-3 justify-between !border-richblack-300 sm:border-0">
                    <Td className="text-base sm:text-sm font-medium text-richblack-5">{social.name}</Td>
                    <Td className="flex flex-1 text-base sm:text-smfont-medium text-richblack-5">{social.link}</Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
            
     

        

         
        </div>
      )}
    </div>
  );
};

export default MyProfile;
