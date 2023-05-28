import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabNames = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabNames[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );
  
  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div>
      <div className="relative text-4xl font-semibold text-center">
        Unlock the
        <HighlightText text={"power of Code"} />
      </div>

      <p className="text-center text-richblack-300 text-sm text-[16px] mt-3">
        Learn to build anything you can imagine
      </p>

      {/* Tab vala section */}
      <div
        className="flex flex-row rounded-full bg-richblack-800 mt-5 mb-5 border border-richblack-100
        px-1 py-1"
      >
        {tabNames.map((element, index) => (
          <div
            className={`text-[16px] flex items-center gap-2 
            ${
              currentTab === element
                ? "bg-richblack-900 text-richblack-5 font-medium"
                : "text-richblack-200"
            } rounded-full transition-all duration-200 cursor-pointer
            hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
            key={index}
            onClick={() => setMyCards(element)}
          >
            {element}
          </div>
        ))}
      </div>

      <div className="lg:h-[150px]"></div>

      {/* Card Component */}
      <div className="relative mb-5 w-11/12">
      <div className="absolute flex flex-row gap-10 w-full items-center justify-center top-[-150px]">
        {courses.map((element, index) => (
          <CourseCard
            key={index}
            cardData={element}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
      </div>
      

    </div>
  );
};

export default ExploreMore;
