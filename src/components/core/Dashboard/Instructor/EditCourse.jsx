import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import RenderSteps from "./AddCourse/RenderSteps"

export default function EditCourse() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const populateCourseDetails = async () => {
    setLoading(true)
    const result = await getFullDetailsOfCourse(courseId, token);
    if(result?.courseDetails){
      dispatch(setEditCourse(true));
      dispatch(setCourse(result?.courseDetails))
    }
    setLoading(false)
  };

  useEffect(() => {
    populateCourseDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if(loading){
    return(
      <div className="grid flex-1 place-items-center">
       <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Course</h1>
      <div className="mx-auto max-w-[600px]">
        {
          course ? (<RenderSteps/>) : (
            <div className="w-full border-richblack-600 border-[2px] flex justify-center items-center py-14">
              <p className="text-3xl font-medium text-richblack-5">
                CourseNot Found
              </p>
            </div>
           
            )
        }
      </div>
    </div>
  );
}
