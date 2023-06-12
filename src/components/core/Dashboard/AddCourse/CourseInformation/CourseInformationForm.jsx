import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../.../../../../../../services/operations/courseDetailsAPI";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import RequirementField from "./RequirementField";
import IconBtn from "../../../../common/IconBtn";
import { toast } from "react-hot-toast";
import {COURSE_STATUS} from "../../../../../utils/constants"
import {setStep, setCourse} from "../../../../../slices/courseSlice"

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const { course, editCourse } = useSelector(
    (state) => state.course
  );

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  //data edit hua hh ya nhi
  const isFormUpdated = () => {
    const currentValues = getValue();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      // currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
      course.instructions.toString()
      // currentValues.courseImage !== course.thumbnail
    )
      return true;
    else return false;
  };

  //handle next button click
  const onSubmit = async (data) => {


    //Edit course
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValue();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        // if (currentValues.courseTags.toString() !== course.tag.toString()) {
        //   formData.append("tag", JSON.stringify(data.courseTags));
        // }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append( "instructions",JSON.stringify(data.courseRequirements));
        }
        // if (currentValues.courseImage !== course.thumbnail) {
        //   formData.append("thumbnail", data.courseImage);
        // }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          setStep(2);
          dispatch(setCourse(result));
        }
        console.log("Printing Form Data", formData)
        console.log("Printing Result", result)
      }else{
        toast.error("No changes made to the form")
      }
    }


    //First time creating course
    const formData = new FormData()
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    // formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions",JSON.stringify(data.courseRequirements));
    // formData.append("thumbnail", data.courseImage);
    formData.append("status", COURSE_STATUS.DRAFT)

    setLoading(true)
    const result = await addCourseDetails(formData, token);
    if(result){
      setStep(2)
      dispatch(setCourse(result))
    }
    setLoading(false)
    console.log("Printing Form Data", formData)
    console.log("Printing Result", result)
    
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 border-[1px]"
    >
      {/* Course title input field */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTitle" className="text-sm text-richblack-5">
          Course Title<sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          name="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full form-style"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Title is required
          </span>
        )}
      </div>

      {/* Course Description text Area */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseShortDesc" className="text-sm text-richblack-5">
          Course Description<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          name="courseShortDesc"
          placeholder="Enter Course Description"
          {...register("courseShortDesc", { required: true })}
          className="min-h-[130px] w-full form-style resize-none"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>

      {/* Course Price input field */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="coursePrice" className="text-sm text-richblack-5">
          Course Price<sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            name="coursePrice"
            placeholder="Enter Course price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full form-style !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>

      {/* Category Dropdown */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className="text-sm text-richblack-5">
          Course Category<sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          name="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className="w-full form-style"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories.map((category, index) => {
              return (
                <option key={index} value={category._id}>
                  {category?.name}
                </option>
              );
            })}
        </select>

        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>

      {/* For Tags a Custom Component (trying to made)*/}
      {/* <ChipInput
        name="courseTags"
        label="Tags"
        placeholder="Enter tags and Press enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValue={getValue}
      /> */}

      {/* Upload Component Its like change picture component (made by me) */}
      {/* <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        errors={errors}
        setValue={setValue}
      /> */}

      {/* Benefits of the Course */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseBenefits" className="text-sm text-richblack-5">
          Course Benefits<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          name="courseBenefits"
          placeholder="Enter Benefits of the Course"
          {...register("courseBenefits", { required: true })}
          className="min-h-[130px] w-full form-style resize-none"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the Course are required
          </span>
        )}
      </div>

      {/* Instructions for the course */}
      <RequirementField
        name="courseRequirements"
        label="Requirement/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValue={getValue}
      />

      {/* buttons */}
      <div className="flex justify-end gap-x-2">
        {/* First Button */}
        {editCourse && (
          <button onClick={() => dispatch(setStep(2))}>
            Countinue Without Saving
          </button>
        )}

        {/* second button */}
        <IconBtn text={!editCourse ? "Next" : "Save Changes"} />
      </div>
    </form>
  );
};

export default CourseInformationForm;
