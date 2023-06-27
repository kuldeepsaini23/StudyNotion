import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";

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
      <div>
        {/* For Buttons and heading */}
        <div>
          {/* for buttons */}
          <div>
            <button onClick={() => navigate("/dashboard/enrolled-courses")}>
              Back
            </button>

            <IconBtn text="Add Review" onclick={() => setReviewModal(true)} />
          </div>

          {/* For headings */}
          <div>
            <p>{courseEntireData?.courseName}</p>
            <p>
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* for sections and subsections */}
        <div>
          {courseSectionData?.map((section, index) => (
            <div key={index} onClick={() => setActiveStatus(section._id)}>
              {/* Section */}
              <div>
                {/* name */}
                <div>{section.sectionName}</div>
                {/* Arrow Icon */}
              </div>

              {/* Subsections */}
              <div>
                {activeStatus === section?._id && (
                  <>
                    {section?.map((topic, index) => (
                      <div
                        key={index}
                        onClick={() =>
                         { navigate(
                            `/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${topic._id}`
                          )

                          setVideoBarActive(topic._id)}
                        }
                        className={`flex gap-5 p-5 ${
                          videoBarActive === topic._id
                            ? "bg-yellow-200 text-richblack-900"
                            : "bg-richblack-900 text-white"
                        }`}
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
