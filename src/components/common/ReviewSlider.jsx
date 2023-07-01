import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper';
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";

const ReviewSlider = ({reviews}) => {
  
  // const truncateWords = 15;

  return (
    <div className='text-white'>
      <div className='my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent'>
        <Swiper
          slidesPerView={4}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          autoplay={{
            delay:2500,
          }}
          modules={[FreeMode, Autoplay, Pagination, Navigation]}
          className='w-[900px]'
        >
          {
            reviews?.map((review, index)=>(
              <SwiperSlide key={index} className='flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25'>
                <img src={review?.user?.image ? review?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review.user.firstName} ${review.user.lastName}`} alt='Profile Pic'
                  className='h-9 w-9 object-cover rounded-full'
                />
                {/* user name */}
                <p>{review?.user?.firstName} {review?.user?.lastName}</p>

                {/* Course Name */}
                <p>{review?.course?.courseName}</p>

                {/* Review text */}
                <p>{review?.review}</p>


                {/* rating and stars */}
                <div>
                <p>{review?.rating.toFixed(1)}</p>
                <ReactStars
                  count={5}
                  value={review?.rating}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                </div>
                

              </SwiperSlide>
            ))
          }
        </Swiper> 
      </div>
    </div>
  )
}

export default ReviewSlider