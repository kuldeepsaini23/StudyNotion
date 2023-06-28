import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { Player } from "video-react";
// import "~video-react/styles/scss/video-react";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { courseId, sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  const playerRef = useRef();

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData) {
        return;
      }

      if (!courseId && !sectionId && !subSectionId) {
        return navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData?.filter(
          (section) => section._id === sectionId
        );

        //we are getting array in return at the first position of arrat we get aur subsection btw we only get one array in return
        const filteredVideoData = filteredData?.[0]?.subSection?.filter(
          (topic) => topic._id === subSectionId
        );
        console.log("VIDEO DATTA>>>>>>>", filteredVideoData);

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    };

    setVideoSpecificDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    //current Section index
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    //current subsection index
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    //current Section index
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;
    //current subsection index
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    //current Section index
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    //No of subsections
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    //current subsection index
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      //same section ki next video
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;
      //isse video pe jao
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      // diff section first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      //isse video pe jao
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    //current Section index
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    //current subsection index
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      //same section ki prev video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;
      //isse video pe jao
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      // diff section last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      //No of subsections
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      //isse video pe jao
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    //dummy code
    setLoading(true);

    //TODO Write this handler
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    // update state in redux
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };

  return (
    <div className="mx-6">
      <div className="flex flex-col gap-5 text-white">
        {!videoData ? (
          <div className="mt-5 text-3xl font-semibold">No Data Found</div>
        ) : (
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            onEnded={() => setVideoEnded(true)}
            src={videoData.videoUrl}
          >
            {
              videoEnded && (
                <div>
                {/*Mark as read button */}
                  {
                    !completedLectures.includes(subSectionId) && (
                      <IconBtn
                        disabled={loading}
                        onclick={()=>handleLectureCompletion()}
                        text={!loading ? "Mark As Completed" : "Loading..."}
                      />
                    )
                  }

                  {/* Rewatch Button */}
                  <IconBtn
                    disabled={loading}
                    onclick={()=>{
                      if(playerRef.current){
                        playerRef.current?.seek(0);
                        setVideoEnded(false);
                      }
                    }}
                    text="Rewatch"
                  />

                  {/* prev */}
                  <div className="mt-10 flex min-h-[250px] justify-center gap-x-4 text-xl">
                    {
                      !isFirstVideo() && (
                        <button disabled={loading} onClick={goToPrevVideo} className="blackButton">
                          Prev
                        </button>
                      )
                    }
                  </div>

                  {/* Next */}
                  <div>
                    {
                      !isLastVideo() && (
                        <button disabled={loading} onClick={goToNextVideo} className="blackButton">
                          Next
                        </button>
                      )
                    }
                  </div>

                </div>
              )
            }
          </Player>
        )}

        <h1 className="mt-5 text-3xl font-semibold">{videoData?.title}</h1>
        <p className="pt-2 pb-6">{videoData?.description}</p>
      </div>  
    </div>
  );
};

export default VideoDetails;
