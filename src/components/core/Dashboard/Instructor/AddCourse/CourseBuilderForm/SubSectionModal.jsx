import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../../slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "../Upload";
import IconBtn from "../../../../../common/IconBtn";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSection", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);

    //API Call
    const result = await updateSubSection(formData, token);
    if (result) {
      // Todo aur kya kya kar skte ho
      const updatedCourseContent = course.courseContent.map((section)=>section._id === modalData.sectionId ? result : section)
      const updatedCourse = {...course, courseContent:updatedCourseContent};
      dispatch(setCourse(updatedCourse))

    }

    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) {
      return;
    }

    if (edit) {
      if (isFormUpdated) {
        toast.error("No changes made to the form");
      } else {
        // edit kardo
        handleEditSubSection();
      }

      return;
    }

    // Add
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);

    setLoading(true);

    //API Call
    const result = await createSubSection(
      formData,
      token,
    );

    if (result) {
      // TODO: check for updation
      const updatedCourseContent = course.courseContent.map((section)=>section._id === modalData ? result : section)

      const updatedCourse = {...course, courseContent:updatedCourseContent};
      dispatch(setCourse(updatedCourse))
    }

    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg bg-richblack-800 border-richblack-400">
        {/* header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          {/* Heading */}
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          {/* Close Button */}
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross1 className="text-2xl text-richblack-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Video Component */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view? modalData.videoUrl: null}
            editData={edit? modalData.videoUrl: null}
          />

          {/* Title */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="lectureTitle" className="text-sm text-richblack-5">
              Lecture Title<sup className="text-pink-200">*</sup>
            </label>
            <input
              id="lectureTitle"
              placeholder="Add Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="w-full form-style"
            />
            {errors.lectureTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Title is required
              </span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="lectureDesc" className="text-sm text-richblack-5">
              Lecture Description<sup className="text-pink-200">*</sup>
            </label>
            <textarea
              id="lectureDesc"
              placeholder="Add Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="w-full form-style min-h-[130px] resize-x-none"
            />
            {errors.lectureDesc && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>

          {/* save Button */}

          {!view && (
            <div className="flex justify-end">
              <IconBtn text={loading ? "Loading...": edit ? "Save Changes" : "Save"}/>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
