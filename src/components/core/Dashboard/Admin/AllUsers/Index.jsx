import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  allUserData,
  deleteAccountByAdmin,
} from "../../../../../services/operations/adminAPI";
import { useForm } from "react-hook-form";
import { RiDeleteBin5Line } from "react-icons/ri";
import ConfirmationModal from "../../../../common/ConfirmationModal";

export default function AllUsers() {
  const { token } = useSelector((state) => state.auth);
  const { register, getValues } = useForm();

  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchALlUserData = async () => {
    setLoading(true);
    const res = await allUserData(token);
    if (res) {
      setUsersData(res);
      console.log(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchALlUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterUsers = () => {
    const selectedAccountType = getValues("accountType");
    if (selectedAccountType === "All") {
      // If "All" is selected, display all users
      const filteredUsers = usersData.filter(
        (user) => user.accountType !== "Admin"
      );
      setFilteredUsers(filteredUsers);
    } else {
      // Filter users based on the selected account type
      const filteredUsers = usersData.filter(
        (user) => user.accountType === selectedAccountType
      );
      setFilteredUsers(filteredUsers);
    }
  };

  useEffect(() => {
    filterUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usersData]);

  const handleUserDelete = async (userId) => {
    setLoading(true);
    try {
      deleteAccountByAdmin(userId, token);
      fetchALlUserData();
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
    setLoading(false);
  };

  return (
    <>
      {!usersData ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div div className="spinner"></div>
        </div>
      ) : (
        <div className="my-8 text-richblack-5">
          <div className="flex rounded-t-lg bg-richblack-500 items-center">
            <form className="flex px-5 py-3 w-[60%]">
              <select
                {...register("accountType", {
                  required: true,
                  onChange: filterUsers,
                })}
                id="accountType"
                name="accountType" // Add this line
                className="form-style w-1/2"
                value={getValues("accountType")}
              >
                {["All", "Student", "Instructor"]?.map((accountType, index) => {
                  return (
                    <option key={index} value={accountType}>
                      {accountType}
                    </option>
                  );
                })}
              </select>
            </form>
            <p className="w-1/4 px-2 py-3">Name</p>
            <p className="flex-1 px-2 py-3">Actions</p>
          </div>
          {/* Users Data */}
          {filteredUsers?.map((user, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div className="flex w-[60%] cursor-pointer items-center gap-4 px-5 py-3">
                <img
                  src={user.image}
                  alt="course_img"
                  className="h-[100px] w-[100px] rounded-full object-cover"
                />
                <div className="flex flex-col justify-between gap-y-3">
                  <p className="text-lg text-richblack-5">
                    Account Type:{" "}
                    <span className="font-semibold">{user.accountType}</span>
                  </p>
                  <p>email: {user.email}</p>
                  <p>Active: {user.active ? "Yes" : "No"}</p>
                  <p>Approved: {user.approved ? "Yes" : "No"}</p>

                  {/* CourseStateus */}
                </div>
              </div>

              {/* name */}
              <div className="w-1/4 px-2 py-3">
                {user.firstName} {user.lastName}
              </div>

              {/* Actions */}
              <div className="flex gap-2 px-2 py-3 text-right">
                <button
                  title="Delete"
                  className="px-1 Transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Do you want to delete This course?",
                      text2:
                        "All The data related to This course will be deleted",
                      btn1Text: "Delete",
                      btn1Handler: !loading
                        ? () => {
                            handleUserDelete(user._id);
                          }
                        : () => {},
                      btn2Text: "Cancel",
                      btn2Handler: !loading
                        ? () => setConfirmationModal(null)
                        : () => {},
                    });
                  }}
                >
                  <RiDeleteBin5Line fontSize={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
