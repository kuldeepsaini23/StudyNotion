import React from "react";
import GetAvgRating from "../../../../utils/avgRating";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../../../slices/wishlistSlice";

const CoursesSection = ({ courses }) => {
  const TRUNCATE_LENGTH = 15;
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1 flex-col w-full">
      {courses.map((course, index) => {
        const count = GetAvgRating(course?.data[0]?.ratingAndReviews);
        console.log(course);
        return (
          <div
            key={index}
            className={`flex w-full flex-wrap items-start justify-between gap-6 border-b border-b-richblack-400 pb-6 mt-6"} `}
          >
            {/* left section */}
            <div className="flex flex-1 flex-col gap-4 md:flex-row">
              <img
                src={course?.data[0]?.thumbnail}
                alt={course?.data[0]?.courseName}
                className="h=[148px] w-[250px] rounded-lg object-cover"
              />
              <div className="flex flex-col space-y-1 max-w-sm">
                <p className="text-lg font-medium text-richblack-5">
                  {course?.data[0]?.courseName}
                </p>
                <p className="text-sm text-richblack-300">
                  {course?.data[0]?.courseDescription.split(" ").length >
                  TRUNCATE_LENGTH
                    ? course?.data[0].courseDescription
                        ?.split(" ")
                        ?.slice(0, TRUNCATE_LENGTH)
                        ?.join(" ") + "..."
                    : course?.data.courseDescription}
                </p>

                <p className="text-base text-caribbeangreen-200">
                  {course?.data[0]?.instructor?.firstName}{" "}
                  {course?.data[0]?.instructor?.lastName}
                </p>

                {/* rating */}
                <div className="flex items-center gap-2">
                  <span className="text-yellow-5">{count || 0}</span>

                  {/* stars */}
                  <ReactStars
                    count={5}
                    value={count || 0}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    halfIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                  <span className="text-richblack-400">
                    {course?.data[0]?.ratingAndReviews.length} Rating
                  </span>
                </div>

                {/* Lecture and toatal hours */}
                <div className="flex items-center gap-2">
                <p className="text-sm text-richblack-200">
                  {course?.data?.[1]} total hours
                </p>

                <p className="text-richblack-50 text-xl">·</p>

                <p className="text-sm text-richblack-200">
                  {course?.data?.[2]} lectures
                </p>

                </div>

              </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-center justify-center">
              <p className="mb-6 text-3xl font-medium text-yellow-100">
                Rs {course?.data[0]?.price}
              </p>

              <button
                className="text-xl font-medium hover:underline text-caribbeangreen-100"
                onClick={() => {
                  dispatch(addToWishlist(course?.data));
                }}
              >
                Save for later
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CoursesSection;
