import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import {
  BigPlayButton,
  ControlBar,
  CurrentTimeDisplay,
  ForwardControl,
  PlayToggle,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  TimeDivider,
  VolumeMenuButton,
} from "video-react";
// import "~video-react/styles/scss/video-react";
import IconBtn from "../../common/IconBtn";

// import {AiOutlinePlayCircle} from "react-icons/ai"

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
    // totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  const playerRef = useRef();

  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
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
        // console.log("VIDEO DATTA>>>>>>>", filteredVideoData);

        setVideoData(filteredVideoData?.[0]);
        setPreviewSource(courseEntireData.thumbnail);
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
    setLoading(true);

    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );

    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };

  return (
    <div className="lg:mx-6 lg:mt-0 mt-20 mx-0">
      <div className="flex flex-col gap-5 text-white">
        {!videoData ? (
          <img
            src={previewSource}
            alt="Preview"
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <BigPlayButton position="center" />

            <ControlBar>
              {/*Forwar and backward buttons  */}
              <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={30} order={1.2} />

              <PlayToggle />

              {/* Current display time */}
              <CurrentTimeDisplay order={4.1} />

              {/* Divider Sign */}
              <TimeDivider order={4.2} />

              {/* Speed of the Video */}
              <PlaybackRateMenuButton
                rates={[0.75, 1, 1.25, 1.5, 1.75, 2]}
                order={7.1}
              />

              {/* volume */}
              <VolumeMenuButton />
            </ControlBar>

            {/* Render When Video Ends */}
            {videoEnded && (
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                }}
                className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
              >
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                    customClasses="text-xl max-w-max px-4 mx-auto"
                  />
                )}
                <IconBtn
                  disabled={loading}
                  onclick={() => {
                    if (playerRef?.current) {
                      // set the current time of the video to 0
                      playerRef?.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  text="Rewatch"
                  customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                />
                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                  {!isFirstVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToPrevVideo}
                      className="blackButton"
                    >
                      Prev
                    </button>
                  )}
                  {!isLastVideo() && (
                    <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      className="blackButton"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </Player>
        )}

        <h1 className="mt-4 text-3xl font-semibold mx-6 lg:mx-0">{videoData?.title}</h1>
        <p className="pt-2 pb-6 mx-6 lg:mx-0">{videoData?.description}</p>
      </div>
    </div>
  );
};

export default VideoDetails;
