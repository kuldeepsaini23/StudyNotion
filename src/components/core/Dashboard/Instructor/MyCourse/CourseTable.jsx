import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deleteCourse, fetchInstructorCourses } from "../../../../../services/operations/courseDetailsAPI";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { setCourse} from "../../../../../slices/courseSlice";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { COURSE_STATUS } from "../../../../../utils/constants";
import {BsClockFill} from "react-icons/bs"
import {AiFillCheckCircle} from "react-icons/ai"

const CourseTable = ({ instructorCourses, setInstructorCourses }) => {

  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleEdit = (courseId) => {
    navigate(`/dashboard/edit-course/${courseId}`);
  }

  const handleCourseDelete = async (courseId) => {
    setLoading(true)

    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setInstructorCourses(result)
    }
    setLoading(false)
  }

  return (
    <>
      {!instructorCourses ? (
        <div>Loading.....</div>
      ) : !instructorCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          you have not enrolled in any course yet
        </p>
      ) : (
        <Table className="rounded-xl border border-richblack-800">
          <Thead>
            <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
              {/* 1st grid */}
              <Th className="flex flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                Courses
              </Th>
              {/* 2nd grid */}
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Duration
              </Th>
              {/* 3rd grid */}
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Price
              </Th>
              {/* 4Th grid */}
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Actions
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {/* Cards yha se shru ho rhe hh */}
            {instructorCourses.map((courseData, index) => (
              <Tr
                key={index}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                {/* 1st grid */}
                <Td className="flex flex-1 gap-x-4 pivoted">
                  <img src={courseData.thumbnail} alt={courseData.courseName} className="h-[148px] w-[ww0px] rounded-lg object-cover" />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">{courseData.courseName}</p>
                    <p className="text-xs text-richblack-300">{courseData.courseDescription}</p>
                    {/* Created */}
                    <p className="text-[12px] text-white">Created: </p>
                    {/* CourseStateus */}
                    {
                      courseData.status === COURSE_STATUS.DRAFT ? (
                        <p className="text-pink-50 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium">
                            <BsClockFill className="flex h-3 w-3 items-center justify-center rounded-full"/>
                            DRAFTED
                        </p>
                      ) :(
                        <p className="text-caribbeangreen-300 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium">
                            <AiFillCheckCircle className="flex h-3 w-3 items-center justify-center rounded-full"/>
                          PUBLISHED
                        </p>
                      )
                    }
                  </div>
                </Td>
                {/* 2nd grid */}
                <Td className="text-left text-sm font-medium uppercase text-richblack-100 pivoted">
                  Duration
                </Td>
                {/* 3rd grid */}
                <Td className="text-left text-sm font-medium uppercase text-richblack-100 pivoted">
                  ₹{courseData.price}
                </Td>
                {/* 4Th grid */}
                <Td className="text-left text-sm font-medium uppercase text-richblack-100 pivoted">
                  <button title="Edit" className="px-2 Transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                    disabled={loading}
                    onClick={()=>handleEdit(courseData._id)}>
                    <FiEdit2 fontSize={20} />
                  </button>
                  <button title="Delete" className="px-1 Transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete This course?",
                        text2: "All The data related to This course will be deleted",
                        btn1Text: "Delete",
                        btn1Handler: !loading ? () => handleCourseDelete(courseData._id) : () => { },
                        btn2Text: "Cancel",
                        btn2Handler: !loading ? () => setConfirmationModal(null) : () => { },
                      })
                    }}
                  >
                    <RiDeleteBin6Line fontSize={20} />
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    
  </>
  )
}

export default CourseTable