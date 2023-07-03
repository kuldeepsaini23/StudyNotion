import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import SwiperCore, { Autoplay, FreeMode, Pagination } from 'swiper';
import CatalogCourseCard from './CatalogCourseCard'

SwiperCore.use([Autoplay]);

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay: 2500,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className='max-h-[30rem]'
        >
          {Courses?.map((course, index) => {
            return (
              <SwiperSlide key={index}>
                <CatalogCourseCard course={course} Height={'h-[250px]'} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <p className='text-xl text-richblack-5 font-medium'>No Courses Found</p>
      )}
    </>
  );
};

export default CourseSlider;
