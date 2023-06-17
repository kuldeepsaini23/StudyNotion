import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../../common/IconBtn";
import { GrFormAdd } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { BiRightArrow } from "react-icons/bi";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../../slices/courseSlice";
import { toast } from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValue,
    formState: { errors },
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // For cancel Button
  const cancelEdit = () => {
    setEditSectionName(false);
    setValue("sectionName", "");
  };

  // Next and Back Button of nested view
  const gotoBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const gotoNext = () => {
    // if course doesnot contain any section
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }

    // if section doesnot contain any Subsection
    if (course.courseContent.some((section) => section.subSection === 0)) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    //If eberything is alright
    dispatch(setStep(3));
  };

  // on form submit
  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      //we are editing the section name
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      // create Section
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    //update Values
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
      setLoading(false);
    }
  };

  // for nested view
  const hadnleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="text-3xl text-white">
      <p>Course Builder</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 border-[1px]"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="sectionName" className="text-sm text-richblack-5">
            Section Name<sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className="w-full form-style"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section Name is required
            </span>
          )}
        </div>

        {/* Button */}
        <div className="flex gap-4">
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-lg"}
          >
            <GrFormAdd fontSize={25} className="text-yellow-50" />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/*Nested View  */}
      {course.courseContent.length > 0 && (
        <div className="flex flex-col gap-5">
          <NestedView
            hadnleChangeEditSectionName={hadnleChangeEditSectionName}
          />
          <div className="flex gap-4">
            <button onclick={gotoBack}>Back</button>
            <IconBtn text="Next" onclick={gotoNext}>
              <BiRightArrow />
            </IconBtn>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseBuilderForm;
