import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode } from 'swiper'
import CatalogCourseCard from './CatalogCourseCard'

const CourseSlider = ({Courses}) => {
  return (
    <>
      {
        Courses?.length ? (
          <Swiper 
            slidesPerView={1}
            loop={true}
            spaceBetween={50}
            freeMode={true}
            modules={[FreeMode]}
            breakpoints={{
              1024:{slidesPerView:3}
            }}
            className='mySwiper'
          >
            {
              Courses?.map((course,index)=>{
                return(
                  <SwiperSlide key={index}>
                    <CatalogCourseCard course={course} Height={"h-[250px]"}/>
                  </SwiperSlide>
                )
                
              })
            }
          </Swiper>
        ) :(
          <p className='text-lg text-richblack-5 font-medium'>No Courses Found</p>
        )
      }
    </>
  )
}

export default CourseSlider