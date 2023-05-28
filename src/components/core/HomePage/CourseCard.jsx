import React from "react";
import { MdSupervisorAccount } from "react-icons/md";
import { TbVectorBezier } from "react-icons/tb";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const { heading, description, lessionNumber, level } = cardData;
  return (
    <div
      className={`w-[400px] h-[300px] flex flex-col px-5 py-3 justify-between hover:cursor-pointer
      ${
        currentCard === heading
          ? "bg-white text-richblack-900 font-medium"
          : "text-richblack-200 bg-richblack-900"
      } transition-all duration-00 hover:bg-richblack-5 hover:text-richblack-900`}
      onClick={() => setCurrentCard(heading)}
    >
      <div className="flex flex-col gap-3 mt-5">
        <div className="font-bold">{heading}</div>

        <p className="text-center text-richblack-300 text-sm">{description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <div className="h-[1px] border border-dashed w-full"></div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-1">
            <MdSupervisorAccount />
            {level}
          </div>

          <div className="flex flex-row gap-1">
            <TbVectorBezier />
            {lessionNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
