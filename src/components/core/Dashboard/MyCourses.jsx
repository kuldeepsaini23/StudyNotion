import React, { useState, useEffect } from "react";
import { COURSE_STATUS } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import { GrFormAdd } from "react-icons/gr";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [instructorCourses, setInstructorCourses] = useState();

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

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl text-richblack-50">My Courses</h1>
        <IconBtn text="Add Course">
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
            {instructorCourses.map((course, index) => (
              <tr
                key={index}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                {/* 1st grid */}
                <td className="flex flex-1 gap-x-4 pivoted">
                  Courses
                </td>
                {/* 2nd grid */}
                <td className="text-left text-sm font-medium uppercase text-richblack-100 pivoted">
                  Duration
                </td>
                {/* 3rd grid */}
                <td className="text-left text-sm font-medium uppercase text-richblack-100 pivoted">
                  Price
                </td>
                {/* 4th grid */}
                <td className="text-left text-sm font-medium uppercase text-richblack-100 pivoted">
                  Actions
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyCourses;
