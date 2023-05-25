import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <section className="group mt-16 p-1 relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
        <Link to={"/signup"}>
          <div
            className="mx-auto rounded-full bg-richblack-800 text-richblack-200 font-bold
          transition-all duration-200 hover:scale-95 w-fit"
          >
            <div className="flex items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblue-900">
              <p>Become an Instructor</p>
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

        <div className="mx-3 my-12 shadow-blue-200">
          <video muted loop autoPlay>
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
                <HighlightText text={"Coding Potential"} />
                with out online courses
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

            codeColor={"text-yellow-25"}
          />
        </div>
      </section>

      {/* Section 2 */}
      <section></section>

      {/* Section 3 */}
      <section></section>

      {/* Footer */}
      <section></section>
    </div>
  );
};

export default Home;
