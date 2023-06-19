import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from "../../common/RatingStars"
import GetAvgRating from "../../../utils/avgRating"

const CatalogCourseCard = ({course, Height}) => {

  const [avgReviewCount, setAvegReviewCount] = useState(0)

  useEffect(()=>{
    const count = GetAvgRating(course.ratingAndReviews);
    setAvegReviewCount(count)
  },[course])

  return (
    <div>
      {/* Complete course card is a link */}
      <Link to={`/courses/${course._id}`}>
        <div>
          {/* Image */}
          <div className='rounded-lg'>
            <img src={course?.thumbnail} alt="course thumbnail"
              className={`${Height} w-full rounded-xl object-cover`}
            />
          </div>

          {/* Details of course */}
          <div className='flex flex-col gap-2 px-1 py-3'>
            {/* title */}
            <p className='text-xl text-richblack-5'>{course.courseName}</p>

            {/* Instructor Name */}
            <p className='text-sm text-richblack-50'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>

            {/* rating and stars */}
            <div className='flex items-center gap-2'>
              {/* Avg review count */}
              <span className='text-yellow-5'>{avgReviewCount || 0}</span>

              {/* Stars */}
              <RatingStars Review_Count={avgReviewCount}/>

              {/* how many people alrady given their ratings */}
              <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>
            </div>
            
            {/* Price */}
            <p className='text-xl text-richblack-5'>{course?.price}</p>
          </div>

        </div>
      </Link>
    </div>
  )
}

export default CatalogCourseCard