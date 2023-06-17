import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../../slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "../Upload"

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

  const handleEditSubSection = async()=>{
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId)
    formData.append("subSection", modalData._id);

    if(currentValues.lectureTitle !== modalData.title){
      formData.append("title", currentValues.lectureTitle)
    }
    if(currentValues.lectureDesc !== modalData.description){
      formData.append("description", currentValues.lectureDesc)
    }
    if(currentValues.lectureVideo !== modalData.videoUrl){
      formData.append("video", currentValues.lectureVideo)
    }

    setLoading(true)

    //API Call
    const result = await updateSubSection(formData,token);
    if(result){
      // Todo aur kya kya kar skte ho
      dispatch(setCourse(result))
    }

    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async()=>{
    if(view){
      return;
    }

    if(edit){
      if(isFormUpdated){
        toast.error("No changes made to the form")
      }else{
        // edit kardo
        handleEditSubSection();
      }

      return;
    }

    // Add
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", modalData.lectureTitle);
    formData.append("description", modalData.lectureDesc);
    formData.append("video", modalData.lectureVideo);

    setLoading(true)

    //API Call
    const result = await createSubSection({
      formData,token
    })

    if(result){
      // TODO: check for updation
      dispatch(setCourse(result))
    }

    setModalData(null)
    setLoading(false)
  }

  return (
    <div>
      <div>
        {/* header */}
        <div>
          {/* Heading */}
          <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
          {/* Close Button */}
          <button onClick={()=>(!loading ? setModalData(null): {})}>
            <RxCross1/>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Video Component */}
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
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
            className="w-full form-style"
          />
          {errors.lectureDesc && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Lecture Description is required
            </span>
          )}
        </div>

        </form>

      </div>
    </div>
  );
};

export default SubSectionModal;
