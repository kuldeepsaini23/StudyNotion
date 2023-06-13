import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import IconBtn from "../../../common/IconBtn";
import { GrFormAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import {FiEdit2} from "react-icons/fi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { setEditCourse } from "../../../../slices/courseSlice";
import ConfirmationModal from "../../../common/ConfirmationModal";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [instructorCourses, setInstructorCourses] = useState();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const getinstructorCourses = async () => {
    try {
      //calling course handler with api
      const response = await fetchInstructorCourses(token);
      setInstructorCourses(response);
    } catch (error) {
      console.log("Unable to fetch Enrolled Courses");
    }
  };

  useEffect(() => {
    getinstructorCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    console.log(instructorCourses)
  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl text-richblack-50">My Courses</h1>
        <IconBtn text="Add Course" onclick={()=>navigate("/dashboard/add-course")}>
          <GrFormAdd fontSize={25} />
        </IconBtn>
      </div>
      {!instructorCourses ? (
        <div>Loading.....</div>
      ) : !instructorCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          you have not enrolled in any course yet
        </p>
      ) : (
        <table className="rounded-xl border border-richblack-800 responsiveTable">
          <thead>
            <tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
              {/* 1st grid */}
              <th className="flex flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                Courses
              </th>
              {/* 2nd grid */}
              <th className="text-left text-sm font-medium uppercase text-richblack-100">
                Duration
              </th>
              {/* 3rd grid */}
              <th className="text-left text-sm font-medium uppercase text-richblack-100">
                Price
              </th>
              {/* 4th grid */}
              <th className="text-left text-sm font-medium uppercase text-richblack-100">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Cards yha se shru ho rhe hh */}
            {instructorCourses.map((item, index) => (
              <tr
                key={index}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                {/* 1st grid */}
                <td className="flex flex-1 gap-x-4 pivoted">
                  <img src={item.thumbnail} alt={item.courseName} className="h-[148px] w-[ww0px] rounded-lg object-cover"/>
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">{item.courseName}</p>
                    <p className="text-xs text-richblack-300">{item.courseDescription}</p>
                    {/* Pending */}
                    <p></p>
                    <p></p>
                  </div>
                </td>
                {/* 2nd grid */}
                <td className="text-left text-sm font-medium uppercase text-richblack-100 pivoted">
                  Duration
                </td>
                {/* 3rd grid */}
                <td className="text-left text-sm font-medium uppercase text-richblack-100 pivoted">
                 ₹{item.price}
                </td>
                {/* 4th grid */}
                <td className="text-left text-sm font-medium uppercase text-richblack-100 pivoted">
                  <button title="Edit" className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
                    <FiEdit2 fontSize={20} onClick={()=>{navigate("/dashboard/add-course"); dispatch(setEditCourse(true))}}/>
                  </button>
                  <button title="Delete" className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    onClick={()=>{ setConfirmationModal({
                      text1:"Do you want to delete this course?",
                      text2:"All the data related to this course will be deleted",
                      btn1Text:"Delete",
                      btn1Handler:()=> dispatch(navigate("/")),
                      btn2Text:"Cancel",
                      btn2Handler:()=> setConfirmationModal(null),
                    })}}
                    >
                    <RiDeleteBin6Line fontSize={20}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  );
};

export default MyCourses;
