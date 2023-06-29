import React from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {getFullDetailsOfCourse} from "../services/operations/courseDetailsAPI"
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice'

const ViewCourse = () => {

  const [reviewModal, setReviewModal] = useState(false)
  const {courseId} = useParams();
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    const setCourseSpecificDetails = async()=>{
      const courseData = await getFullDetailsOfCourse(courseId, token);
      if(courseData){
        dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
        dispatch(setEntireCourseData(courseData.courseDetails));
        dispatch(setCompletedLectures(courseData.completedVideos));
        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
          lectures += sec.subSection.length
        });
  
        dispatch(setTotalNoOfLectures(lectures));
      }
     
    }

    setCourseSpecificDetails()
  },[courseId, dispatch, token])

  return (
    <>
      <div className='flex relative min-h-[calc(100vh - 3.5rem)]'>
      {/* Sidebar */}
        <VideoDetailsSidebar setReviewModal={setReviewModal}/>

        {/* For Video */}
        <div className='h-[calc(100vh - 3.5rem)] flex-1 overflow-auto'>
          <Outlet/>
        </div>
      </div>

      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse