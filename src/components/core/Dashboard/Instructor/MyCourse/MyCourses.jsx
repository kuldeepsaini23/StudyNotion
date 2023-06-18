import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../../services/operations/courseDetailsAPI";
import IconBtn from "../../../../common/IconBtn";
import { GrFormAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import CourseTable from "./CourseTable";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [instructorCourses, setInstructorCourses] = useState([]);

  const navigate = useNavigate();



  useEffect(() => {
    const getinstructorCourses = async () => {
      try {
        //calling course handler with api
        const response = await fetchInstructorCourses(token);
        if(response){
          setInstructorCourses(response);
        }
        
      } catch (error) {
        console.log("Unable to fetch Enrolled Courses");
      }
    };
    getinstructorCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <div className="mb-14 flex items-center justify-between">
          <h1 className="text-3xl text-richblack-50">My Courses</h1>
          <IconBtn
            text="Add Course"
            onclick={() => navigate("/dashboard/add-course")}
          >
            <GrFormAdd fontSize={25} />
          </IconBtn>
        </div>
      </div>

      {/*  Table */}
      {instructorCourses && (
        <CourseTable
          instructorCourses={instructorCourses}
          setInstructorCourses={setInstructorCourses}
        />
      )}
    </>
  );
};

export default MyCourses;
