import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
import 'react-loading-skeleton/dist/skeleton.css'
import { apiConnector } from "../services/apiconnector";
import { ratingsEndpoints } from "../services/apis";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../utils/constants";
// import Skeleton from "react-loading-skeleton";

const Home = () => {
  const { user } = useSelector((state) => state.profile);

  // DATA for reviews Slider
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fecthAllReviews = async () => {
      try {
        const response = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );

        if (response) {
          if (!response.data.success) {
            throw new Error(response.data.message);
          }
          setReviews(response?.data?.data);
          // console.log("REVIEWS_DETAILS_API RESPONSE.....",response)
        }
      } catch (error) {
        console.log("ERROR IN GETTING ALL REVIEWS....", error);
      }
    };

    fecthAllReviews();
  }, []);

  return (
    <div className="mt-5">
      {/* Section 1 */}
      <section className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[10px] transition-all duration-200 group-hover:bg-richblack-900">
              {user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ? (
                <p>Add a Course</p>
              ) : (
                <p>Become an Instructor</p>
              )}
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblue-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-7 shadow-blue-200 shadow-[10px_-5px_50px_-5px]">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section-1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{ btnText: "Learn more", linkto: "/login", active: false }}
            codeblocks={`<!DOCTYPE html>
            <html>
            <head><title>Example</title><linkrel="stylesheet"href="styles.css">
            </head>
            <body>
            <h1><a href="/">Header</a>
            </h1>
            <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
            </nav>`}
            codeColor={"text-yellow-25"}
            codeblockName={"codeblock1"}
          />
        </div>

        {/* Code Section-2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/login",
              active: true,
            }}
            ctabtn2={{ btnText: "Learn more", linkto: "/login", active: false }}
            codeblocks={`<!DOCTYPE html>
            <html>
            <head><title>Example</title><linkrel="stylesheet"href="styles.css">
            </head>
            <body>
            <h1><a href="/">Header</a>
            </h1>
            <nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
            </nav>`}
            codeColor={"text-richblack-5"}
            codeblockName={"codeblock2"}
          />
        </div>

        <ExploreMore />
      </section>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>

            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catlog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <InstructorSection />

        <h2 className="text-center text-4xl font-semibold mt-8">
          Reviews from Other Learners
        </h2>
        {/* Review Slider here */}

         <ReviewSlider reviews={reviews} />
      
        
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
