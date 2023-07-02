/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { GrFormAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../../services/formatDate";
import {
  deleteCourse,
  getAllCourses,
} from "../../../../../services/operations/courseDetailsAPI";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { RiDeleteBin5Line } from "react-icons/ri";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { BsClockFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../../../services/apiconnector";
import { categories } from "../../../../../services/apis";

export default function AllCourses() {
  const { token } = useSelector((state) => state.auth);
  const [allCourses, setAllCourses] = useState([]);
  const [categoryCourses, setCategoryCourses] = useState([]);

  const [courseCategories, setCourseCategories] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { register, getValues } = useForm();

  const getCategories = async () => {
    setLoading(true);
    try {
      const categorys = await apiConnector("GET", categories.CATEGORIES_API);
      if (categorys) {
        // console.log("categories", categories)
        setCourseCategories(categorys?.data?.data);
      }
    } catch (error) {
      console.log("could not fetch the category list");
    }
    setLoading(false);
  };

  const fetchAllcourses = async () => {
    try {
      let result = await getAllCourses();
      if (result) {
        setAllCourses(result);
        // console.log("fetchAllcourses ",result);
      }
    } catch (error) {
      console.log("Unable to fetch All Courses", error);
    }
  };

  useEffect(() => {
    getCategories();
    fetchAllcourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterCourses();
  }, [allCourses]);

  const filterCourses = () => {
    const categoryValue = getValues("courseCategory");
    // console.log("Category Value: ", categoryValue);

    if (categoryValue === "All") {
      return setCategoryCourses([]);
    }

    // console.log("It is inside filtered courses", allCourses)
    const filterCourse = allCourses.filter((course) => {
      return course.category === categoryValue;
    });

    if (filterCourse.length === 0) {
      setCategoryCourses(["Theend"]);
    } else {
      setCategoryCourses(filterCourse);
    }

    // console.log(filterCourse);
  };


  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    await fetchAllcourses();
    setLoading(false);
  
  };

  return (
    <>
      <div>
        <div className="mb-14 flex items-center justify-between">
          <h1 className="text-3xl text-richblack-50">StudyNotion Courses</h1>
          <IconBtn
            text="Add Category"
            onclick={() => navigate("/dashboard/add-category")}
          >
            <GrFormAdd fontSize={25} />
          </IconBtn>
        </div>
      </div>

      {/*  All Courses */}
      {!allCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="my-8 text-richblack-5">
          <div className="flex rounded-t-lg bg-richblack-500 items-center">
            <form className="flex px-5 py-3 w-[60%]">
              <select
                {...register("courseCategory", {
                  required: true,
                  onChange: filterCourses,
                })}
                id="courseCategory"
                name="courseCategory" // Add this line
                className="form-style w-1/2"
                value={getValues("courseCategory")}
                
              >
                <option value="All">All</option>
                {!loading &&
                  courseCategories?.map((category, index) => {
                    return (
                      <option key={index} value={category?._id}>
                        {category?.name}
                      </option>
                    );
                  })}
              </select>
            </form>
            <p className="w-1/4 px-2 py-3">Instructor</p>
            <p className="flex-1 px-2 py-3">Actions</p>
          </div>
          {/* Cards yha se shru ho rhe hh */}
          {!allCourses.length ? (
            <p className="grid h-[10vh] w-full place-content-center text-richblack-5 xl:text-3xl text-xl">
              No Course is Created Till Now
            </p>
          ) : (
            <>
              {categoryCourses.length > 0 && categoryCourses[0] !== "Theend" ? (
                <>
                  {categoryCourses.map((course, i, arr) => {
                    return (
                      <div
                        className={`flex items-center border border-richblack-700 ${
                          i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                        }`}
                        key={i}
                      >
                        <div
                          className="flex w-[60%] cursor-pointer items-center gap-4 px-5 py-3"
                          onClick={() => {
                            navigate(`/courses/${course?._id}`);
                          }}
                        >
                          <img
                            src={course.thumbnail}
                            alt="course_img"
                            className="h-[148px] w-[ww0px] rounded-lg object-cover"
                          />
                          <div className="flex flex-col justify-between gap-y-3">
                            <p className="text-lg font-semibold text-richblack-5">
                              {course.courseName}
                            </p>
                            <p className="text-base text-richblack-100 font-semibold">
                              Price: {course.price}
                            </p>
                            {/* Created */}
                            <p className="text-[12px] text-white">
                              Created: {formatDate(course.createdAt)}
                            </p>
                            {/* CourseStateus */}
                            {course.status === COURSE_STATUS.DRAFT ? (
                              <p className="text-pink-50 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium">
                                <BsClockFill className="flex h-3 w-3 items-center justify-center rounded-full" />
                                DRAFTED
                              </p>
                            ) : (
                              <p className="text-caribbeangreen-300 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium">
                                <AiFillCheckCircle className="flex h-3 w-3 items-center justify-center rounded-full" />
                                PUBLISHED
                              </p>
                            )}
                          </div>
                        </div>
                        {/* Instructor */}
                        <div className="w-1/4 px-2 py-3">
                          <button
                            className="text-lg uppercase hover:underline hover:stroke-yellow-50"
                            onClick={() =>
                              navigate(`/instructor/${course?.instructor?._id}`)
                            }
                          >
                            {course?.instructor?.firstName}{" "}
                            {course?.instructor?.lastName}
                          </button>
                        </div>
                        {/* Actions */}
                        <div className="flex gap-2 px-2 py-3 text-right">
                          <button
                            title="Delete"
                            className="px-1 Transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                            onClick={() => {
                              setConfirmationModal({
                                text1: "Do you want to delete This course?",
                                text2:
                                  "All The data related to This course will be deleted",
                                btn1Text: "Delete",
                                btn1Handler: !loading
                                  ? () => {
                                      handleCourseDelete(course._id);
                                    }
                                  : () => {},
                                btn2Text: "Cancel",
                                btn2Handler: !loading
                                  ? () => setConfirmationModal(null)
                                  : () => {},
                              });
                            }}
                          >
                            <RiDeleteBin5Line fontSize={20} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {categoryCourses[0] === "Theend" ? (
                    <p className="grid h-[10vh] w-full place-content-center text-richblack-5 xl:text-3xl text-xl">
                      No Course in this Category
                    </p>
                  ) : (
                    <>
                      {allCourses.map((course, i, arr) => {
                        return (
                          <div
                            className={`flex items-center border border-richblack-700 ${
                              i === arr.length - 1
                                ? "rounded-b-lg"
                                : "rounded-none"
                            }`}
                            key={i}
                          >
                            <div
                              className="flex w-[60%] cursor-pointer items-center gap-4 px-5 py-3"
                              onClick={() => {
                                navigate(`/courses/${course?._id}`);
                              }}
                            >
                              <img
                                src={course.thumbnail}
                                alt="course_img"
                                className="h-[148px] w-[ww0px] rounded-lg object-cover"
                              />
                              <div className="flex flex-col justify-between gap-y-3">
                                <p className="text-lg font-semibold text-richblack-5">
                                  {course.courseName}
                                </p>
                                <p className="text-base text-richblack-100 font-semibold">
                                  Price: {course.price}
                                </p>
                                {/* Created */}
                                <p className="text-[12px] text-white">
                                  Created: {formatDate(course.createdAt)}
                                </p>
                                {/* CourseStateus */}
                                {course.status === COURSE_STATUS.DRAFT ? (
                                  <p className="text-pink-50 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium">
                                    <BsClockFill className="flex h-3 w-3 items-center justify-center rounded-full" />
                                    DRAFTED
                                  </p>
                                ) : (
                                  <p className="text-caribbeangreen-300 flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium">
                                    <AiFillCheckCircle className="flex h-3 w-3 items-center justify-center rounded-full" />
                                    PUBLISHED
                                  </p>
                                )}
                              </div>
                            </div>
                            {/* Instruvtor Name */}
                            <div className="w-1/4 px-2 py-3">
                              <button
                                className="text-lg uppercase hover:underline hover:stroke-yellow-50"
                                onClick={() =>
                                  navigate(
                                    `/instructor/${course?.instructor?._id}`
                                  )
                                }
                              >
                                {course?.instructor?.firstName}{" "}
                                {course?.instructor?.lastName}
                              </button>
                            </div>
                            {/* Actions */}
                            <div className="flex gap-2 px-2 py-3 text-right">
                              <button
                                title="Delete"
                                className="px-1 Transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                onClick={() => {
                                  setConfirmationModal({
                                    text1: "Do you want to delete This course?",
                                    text2:
                                      "All The data related to This course will be deleted",
                                    btn1Text: "Delete",
                                    btn1Handler: !loading
                                      ? () => {
                                          handleCourseDelete(course._id);
                                        }
                                      : () => {},
                                    btn2Text: "Cancel",
                                    btn2Handler: !loading
                                      ? () => setConfirmationModal(null)
                                      : () => {},
                                  });
                                }}
                              >
                                <RiDeleteBin5Line fontSize={20} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
