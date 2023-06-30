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
    <div className='text-white w-[400px]'>
      <div className='h-[190px] max-w-maxContent'>
        <Swiper
          slidesPerView={4}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          autoplay={{
            delay:2500,
          }}
          modules={[FreeMode, Autoplay, Pagination, Navigation]}
          className='w-full'
        >
          {
            reviews.map((review, index)=>(
              <SwiperSlide key={index}>
                <img src={review?.user?.image ? review?.user?.image : `https://`} alt='Profile Pic'
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