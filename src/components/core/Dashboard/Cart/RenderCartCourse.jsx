import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component"
import {RiDeleteBinLine} from "react-icons/ri"
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const RenderCartCourse = () => {

  const {cart, removeFromCart} = useSelector((state)=>state.cart)
  const dispatch = useDispatch();

  return (
    <div className='flex flex-1 flex-col'>
      {
        cart.map((course, index)=>(
          <div key={index} className='flex w-full flex-wrap items-start justify-between gap-6 border-b border-b-richblack-400 pb-6'>
            {/* left section */}
            <div className='flex flex-1 flex-col gap-4 xl:flex-row'>
              <img src={course?.thumbnail} alt={course.name} className='h=[148px] w-[220px] rounded-lg object-cover'/>

              <div className='flex flex-col space-y-1'>
                <p className='text-lg font-medium text-richblack-5'>{course?.name}</p>
                <p  className='text-sm text-richblack-300'>{course?.category?.name}</p>

                {/* rating */}
                <div className='flex items-center gap-2'>
                  <span className='text-yellow-5'>4.5</span>

                  {/* stars */}
                  <ReactStars
                    count={5}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<AiOutlineStar/>}
                    fullIcon={<AiFillStar/>}
                  />
                  <span className='text-richblack-400'>{course?.ratingAndReviews.legth} Rating</span>
                </div>
              </div>

            </div>

            {/* Right Section */}
            <div className='flex flex-col space-y-1'>
              <button
                onClick={()=> dispatch(removeFromCart(course._id))}
                className='flex items-center gap-x-1 rounded-md border-b-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200'>
                <RiDeleteBinLine/>
                <span>Remove</span>
              </button>

              <p className='mb-6 text-3xl font-medium text-yellow-100'>Rs {course?.price}</p>
            </div>


          </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourse