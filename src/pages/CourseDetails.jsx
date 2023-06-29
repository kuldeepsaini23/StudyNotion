import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentFeatureAPI";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import { formatDate } from "../services/formatDate";
import { MdOutlineLanguage } from "react-icons/md";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import {AiOutlineDown} from "react-icons/ai"
import {IoIosVideocam} from "react-icons/io"
import Footer from "../components/common/Footer"
import CourseSlider from "../components/core/Catalog/CourseSlider";

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  // const { paymentLoading } = useSelector((state) => state.course);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
        console.log("Fetch all courses", result);
      } catch (error) {
        console.log("Could not fetch course details");
      }
    };

    getCourseFullDetails();
  }, [courseId]);

  //*To Update
  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }

    setConfirmationModal({
      text1: "You are not Logged in",
      text2: "Please login to purchase the course",
      btn1text: "Login",
      btn2text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(
      courseData?.data?.courseDetails?.ratingAndReviews
    );
    setAvgReviewCount(count);
  }, [courseData]);

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [isActive, setIsActive] = useState(Array(0));

  const handleActive = (id) => {
    // console.log("Handle Active: ", id)
    //Toggle code
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e !== id)
    );
  };

  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });

    setTotalNoOfLectures(lectures);
  }, [courseData]);


  //Instructor Other courses
    
    const [otherCourses, setOtherCourses] = useState([])

    useEffect(()=>{
      //TODO Doubt here
      const filteredCourses = courseData?.data?.courseDetails?.instructor?.courses?.filter((course) => {
       
        return(course._id !== courseId)
      });
      console.log("Filtered Course: ", filteredCourses)
      setOtherCourses(filteredCourses)
    },[courseData, courseId])
  

  if (loading || !courseData) {
    return (
      <div className="grid flex-1 place-items-center">
       <div className="spinner"></div>
      </div>
    );
  }

  if (!courseData.success) {
    return <Error />;
  }

  const {
    // _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData?.data?.courseDetails;


  // setTimeout(()=>{
  //   console.log(isActive)
  // },5000)
  

  return (
    <>
      {/* Section 1 */}
      <div className="relative w-full bg-richblack-800">
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          {/* Left section */}
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            {/* for less than lg screen */}
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>

            {/* Course Data */}
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
              {/* course heading/name */}
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              {/* course Description */}
              <p className="text-richblack-200">{courseDescription}</p>

              {/* Rating and rating stars */}
              <div className="text-md flex flex-wrap items-center gap-2">
                {/*count of rating  */}
                <span className="text-yellow-25">{avgReviewCount || 0}</span>
                {/* Rating stars */}
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                {/* Numer of reviews */}
                <a href="#reviews" className="underline hover:text-yellow-50">{`(${ratingAndReviews.length} Reviews)`}</a>
                {/* Number of students enrolled in this course*/}
                <span>{`(${studentsEnrolled.length} Student Enrolled)`}</span>
              </div>

              {/* Instructor Name */}
              <a href="#instructor">
                <p>
                  Created By <span className="underline hover:text-yellow-50">{`${instructor.firstName} ${instructor.lastName}`}</span>
                </p>
              </a>

              {/* Created at and language */}
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {/* Icons to add */} Created At {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <MdOutlineLanguage /> English/Hindi/Hinglish
                </p>
              </div>
            </div>

            {/* Buttons for view less than lg */}
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs.{price}
              </p>
              <button className="yellowButton">Buy Now</button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>

          {/* Right Side Absolute Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <CourseDetailsCard
              course={courseData?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      {/* Section 2s */}
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What you will learn */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you Will learn</p>
            <div className="mt-5">{whatYouWillLearn}</div>
          </div>

          {/* Course Content */}
          <div className="flex flex-col gap-3">
            <p>Course Content:</p>
            {/* Count */}
            <div className="flex flex-wrap justify-between gap-2">
              <div className="flex gap-2">
                <span>{courseContent.length} section(s)</span>
                <span>{totalNoOfLectures} lecture(s)</span>
                <span>{courseData?.data?.totalDuration} total length</span>
              </div>
              {/* collapse All */}
              <div>
                <button
                  className="text-yellow-25"
                  onClick={() => setIsActive([])}
                >
                  Collaspe All Sections
                </button>
              </div>
            </div>
          </div>

          {/* Lecture Display */}
          {courseContent.map((lecture, index) => {
            return (
              <div key={index} className="py-4" onClick={()=>handleActive(lecture._id)}>
                <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
                  {/* Lecture details */}
                  <div>
                    <div className="flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]">
                      {/* section name and arrow */}
                      <div className="flex items-center gap-2">
                        <AiOutlineDown className={`${isActive.includes(lecture._id) ? "rotate-180" : "rotate-0"} transition-all duration-500`}/>
                        <p>{lecture.sectionName}</p>
                      </div>

                      {/* No of lectures */}
                      <div className="space-x-4">
                        <span className="text-yellow-50">{lecture.subSection.length} lecture(s)</span>
                      </div>

                    </div>
                  </div>

                  {/* Display afetr clicking arrow button */}
                  <div className={`relative overflow-y-auto bg-richblack-900 transition-[height] duration-[0.50s] ease-[ease] ${isActive.includes(lecture._id) ? "h-[88px]" : "h-0"}`} >
                    <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">  
                    {
                      lecture?.subSection?.map((subSection,index)=>(
                        <div key={index}>
                          <div className="flex justify-between py-2">
                          {/* Lecture Name */}
                            <div className="flex items-center gap-2">
                              <span><IoIosVideocam className="text-yellow-50"/></span>
                              <p>{subSection.title}</p>
                            </div>

                          {/* Lecture Duration */}
                          <div>{subSection.timeDuration}</div>

                        </div>
                      </div>
                      ))
                    }
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

          {/* Instructor Deatils */}
          <div className="mb-12 py-4" id="instructor">
            <p className="text-[28px] font-semibold">Author</p>
    
              
              {/* image and name */}
            <div className="flex items-center gap-4 py-4">
              <img
                  src={instructor.image}
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
              />
              <button className="text-lg text-yellow-100 underline capitalize" onClick={()=> navigate(`/instructor/${instructor._id}`)}>
                {instructor.firstName} {instructor.lastName}
              </button>
             </div>

            <p className="text-richblack-50">{instructor.additionalDetails?.about}</p>
           
          </div>

        </div>


      </div>

      {/* Section 3 */}
      <div className="w-full flex flex-col gap-5 mb-10 text-richblack-5">
        {/* Reviews from student for this course */}
        <div id="reviews">
          <h2 className='text-center text-4xl font-semibold'>Reviews from Students</h2>
        </div>


        {/* Other courses from instructor */}
        <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
          <h2 className='text-center text-4xl font-semibold mt-4'>More Courses by {`${instructor.firstName} ${instructor.lastName}`}</h2>
            <div className="py-8">
              {otherCourses?.length>0 && <CourseSlider Courses={otherCourses}/>}
            </div>
           
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}


      <Footer/>
    </>
  );
};

export default CourseDetails;
