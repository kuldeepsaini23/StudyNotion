import React, { useState } from "react";
import { ACCOUNT_TYPE } from "../utils/constants";
import Error from "./Error";
import { useEffect } from "react";
import { getInstructorDetails } from "../services/operations/profileAPI";
import { Link, useParams } from "react-router-dom";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const InstructorProfile = () => {
  const { instructorId } = useParams();
  const [instructorDetails, setInstructorDetails] = useState([]);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [toatalEnrolledStudents, setToatalEnrolledStudents] = useState(0);
  const [toatalNoOfReviews, setToatalNoOfReviews] = useState(0);
  const [allInstructorReviews, setAllInstructorReviews] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInstructorData = async () => {
      setLoading(true);
      const response = await getInstructorDetails(instructorId);
      setInstructorDetails(response);
      setInstructorCourses(response?.courses);
      setLoading(false);
    };

    fetchInstructorData();
  }, [instructorId]);

  useEffect(() => {
    let enrolledStudents = 0;
    if (instructorCourses) {
      instructorCourses.forEach((course) => {
        enrolledStudents += course.studentsEnrolled.length || 0;
      });
      setToatalNoOfReviews(enrolledStudents);
    }
  }, [instructorCourses]);

  useEffect(() => {
    let totalReviews = 0;
    let allReviews = [];
    if (instructorCourses) {
      instructorCourses.forEach((course) => {
        totalReviews += course.ratingAndReviews.length || 0;
        course?.ratingAndReviews.forEach((review) => {
          allReviews = [...allReviews, review];
        });
      });
      setToatalEnrolledStudents(totalReviews);
      setAllInstructorReviews(allReviews);
    }
  }, [instructorCourses]);

  if (instructorDetails.accountType !== ACCOUNT_TYPE.INSTRUCTOR) {
    return <Error />;
  }

  if (loading || !instructorDetails) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Section1 */}
      <div className="w-full bg-richblack-800">
        <div className="grid place-items-center">
          {/* Left section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-evenly py-12   md:flex-row md:gap-y-0 gap-0 gap-x-0">
            {/* Instructor Data */}
            <div className="mx-auto w-11/12 max-w-[450px] lg:max-w-[600px] md:mx-0 flex flex-col items-start gap-4 py-5 text-lg text-richblack-5">
              {/* Instructor heading/name */}
              <div>
                <p className="text-richblack-200 text-xl mb-2">Instructor</p>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {instructorDetails.firstName} {instructorDetails.lastName}
                </p>
              </div>

              {/* No of Reveiws and total student enrolled */}
              <div className="flex gap-2 flex-col xs:flex-row">
                <p className="text-yellow-50">
                  {toatalEnrolledStudents} Total Student(s)
                </p>
                <a href="#reviews" className="hover:underline text-yellow-50">
                  {toatalNoOfReviews} Review(s)
                </a>
              </div>

              {/* Instructor Description */}
              <div>
                <p className="text-richblack-5 text-xl font-bold mb-3">
                  About me
                </p>
                <p className="text-richblack-200">
                  {instructorDetails.additionalDetails.about}
                </p>
              </div>
            </div>

            {/* Instructor Image */}
            <div className="mx-auto w-11/12 max-w-[250px] md:mx-0 md:relative place-content-center">
              <img
                src={instructorDetails.image}
                alt="instructor img"
                className="w-[78px] h-[78px] xs:w-[150px] xs:h-[150px] sm:w-[200px] sm:h-[200px] rounded-full object-cover mb-5 mx-auto"
              />

              {/* Instruvtor Social media */}
              <div className="flex flex-col justify-center items-center gap-4">
                <Link className="bg-transparent hover:bg-yellow-200 text-yellow-50 font-semibold hover:text-white py-2 px-10 border border-yellow-50 hover:border-transparent rounded">
                  Website
                </Link>
                <button className="bg-transparent hover:bg-yellow-200 text-yellow-50 font-semibold hover:text-white py-2 px-10 border border-yellow-50 hover:border-transparent rounded">
                  Website
                </button>
                <button className="bg-transparent hover:bg-yellow-200 text-yellow-50 font-semibold hover:text-white py-2 px-10 border border-yellow-50 hover:border-transparent rounded">
                  Website
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="w-full flex flex-col gap-5 mt-10 mb-5 text-richblack-5">
        {/* Reviews from student for this course */}
        <div id="reviews">
          <h2 className="text-center text-4xl font-semibold">
            Reviews from Students
          </h2>
          <ReviewSlider reviews={allInstructorReviews} />
        </div>

        {/* Other courses from instructor */}
        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <h2 className="text-center text-4xl font-semibold mt-4">
            My Courses ({instructorCourses.length})
          </h2>
          <div className="py-8">
            {instructorCourses?.length > 0 && (
              <CourseSlider Courses={instructorCourses} />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InstructorProfile;
