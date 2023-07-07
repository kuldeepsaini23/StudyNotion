import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { AiOutlineDown } from "react-icons/ai";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) {
        return;
      }
      // current section index
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      // current subsection index
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      //setCurrent section
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      //set Current Subsection
      setVideoBarActive(activeSubSectionId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      <div className="h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 lg:flex hidden">
        {/* For Buttons and heading */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          {/* for buttons */}
          <div className="flex w-full items-center justify-between ">
            <button
              onClick={() => navigate("/dashboard/enrolled-courses")}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            >
              <MdOutlineArrowBackIosNew className="text-xl font-bold" />
            </button>

            <IconBtn text="Add Review" onclick={() => setReviewModal(true)} />
          </div>

          {/* For headings */}
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* for sections and subsections */}
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData?.map((section, index) => (
            <div
              key={index}
              onClick={() => setActiveStatus(section._id)}
              className="mt-2 cursor-pointer text-sm text-richblack-5"
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                {/* name */}
                <div className="w-[70%] font-semibold">
                  {section.sectionName}
                </div>

                <div className="flex items-center gap-3">
                  <AiOutlineDown
                    className={`${
                      activeStatus.includes(section._id)
                        ? "rotate-180"
                        : "rotate-0"
                    } transition-all duration-500`}
                  />
                </div>
              </div>

              {/* Subsections */}
              <div className="transition-[height] duration-500 ease-in-out">
                {activeStatus === section?._id && (
                  <>
                    {section?.subSection?.map((topic, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${topic._id}`
                          );

                          setVideoBarActive(topic._id);
                        }}
                        className={`flex gap-3 p-5 py-2 ${
                          videoBarActive === topic._id
                            ? "bg-yellow-200 text-richblack-900"
                            : "bg-richblack-900 text-white"
                        }font-semibold`}
                      >
                        {/* checkbox and subsection name */}
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic._id)}
                          onChange={() => {}}
                        />
                        <span>{topic.title}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex lg:hidden w-[calc(100vw-3.5rem)] h-auto flex-col border-[2px] border-richblack-600 bg-richblack-800 mx-auto mb-10">
        {/* For Buttons and heading */}
        <div className="flex flex-col gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25 absolute inset-0 h-28 bg-richblack-700 w-screen">
          {/* for buttons */}
          <div className="flex w-11/12 items-center justify-between mx-5">
            <button
              onClick={() => navigate("/dashboard/enrolled-courses")}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            >
              <MdOutlineArrowBackIosNew className="text-xl font-bold" />
            </button>

            {/* For headings */}
            <div className="gap-4 items-center text-richblack-50 md:flex hidden">
              <p>{courseEntireData?.courseName}</p>
              <p className="text-sm font-semibold text-richblack-500">
                {completedLectures?.length} / {totalNoOfLectures}
              </p>
            </div>

            <IconBtn text="Add Review" onclick={() => setReviewModal(true)} />
          </div>
        </div>

        {/* for sections and subsections */}
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {/* For headings */}
          <div className="flex gap-4 items-start sm:items-center justify-between flex-col sm:flex-row m-4 sm:px-4">
            <p className="text-lg text-richblack-25 font-bold">{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-25 ">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
          {courseSectionData?.map((section, index) => (
            <div
              key={index}
              onClick={() => setActiveStatus(section._id)}
              className="mt-2 cursor-pointer text-sm text-richblack-5"
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                {/* name */}
                <div className="w-[70%] font-semibold">
                  {section.sectionName}
                </div>

                <div className="flex items-center gap-3">
                  <AiOutlineDown
                    className={`${
                      activeStatus.includes(section._id)
                        ? "rotate-180"
                        : "rotate-0"
                    } transition-all duration-500`}
                  />
                </div>
              </div>

              {/* Subsections */}
              <div className="transition-[height] duration-500 ease-in-out">
                {activeStatus === section?._id && (
                  <>
                    {section?.subSection?.map((topic, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${topic._id}`
                          );

                          setVideoBarActive(topic._id);
                        }}
                        className={`flex gap-3 p-5 py-2 ${
                          videoBarActive === topic._id
                            ? "bg-yellow-200 text-richblack-900"
                            : "bg-richblack-900 text-white"
                        }font-semibold`}
                      >
                        {/* checkbox and subsection name */}
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic._id)}
                          onChange={() => {}}
                        />
                        <span>{topic.title}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
