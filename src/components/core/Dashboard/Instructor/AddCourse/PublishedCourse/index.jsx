import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../../common/IconBtn";
import { resetCourseSection, setStep } from "../../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../../utils/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../../services/operations/courseDetailsAPI";

const PublishCourse = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(course?.status === COURSE_STATUS.PUBLISHED){
      setValue("public", true)
    }
  })

  const goBack = ()=>{
    dispatch(setStep(2));
  }

  const onSubmit = ()=>{
    handleCoursePublish()
  }  

  const handleCoursePublish = async()=>{
    // agar course me kuch bhi change hi nhi kiya toh
    if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public")===true )||
       (course?.status === COURSE_STATUS.DRAFT && getValues("public")===false)){
        //no updation in form
        //no need to make api call
        goToCourses()
        return;
      }

      // if form is updated
      const formData = new FormData();
      formData.append("courseId", course._id);
      const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
      formData.append("status", courseStatus);

      setLoading(true)
      const result = await editCourseDetails(formData,token);

      if(result){
        goToCourses()
      }

      setLoading(false)
  }

  const goToCourses = ()=>{
    dispatch(resetCourseSection());
    navigate("/dashboard/my-courses")
  }


  return (
    <div className="rounded-md border-[1px] bg-richblack-800 border-richblack-800 p-6">
      {/* heading */}
      <p className="text-2xl font-semibold text-richblack-5">Publish Setting</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* CheckBox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
           
            <input
              type="checkbox"
              id="public"
              name="public"
              {...register("public")}
              className="form-style rounded-lg h-4 w-4"
            />
            <span className="ml-2 text-richblack-400">Make this Course as Public</span>
          </label>
        </div>

         {/* buttons */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
            <button disabled={loading} type="button" onClick={goBack}
              className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900">
              Back
            </button>

            <IconBtn disabled={loading} onClick={goBack} text="Save Changes"
              className="">
              
            </IconBtn>
        </div>

      </form>
    </div>
  );
};

export default PublishCourse;
