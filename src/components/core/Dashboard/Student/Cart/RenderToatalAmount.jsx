import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../common/IconBtn'
import { buyCourse } from '../../../../../services/operations/studentFeatureAPI'
import { useNavigate } from 'react-router-dom'

const RenderToatalAmount = () => {

  const {total, cart} = useSelector((state)=>state.cart);
  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleBuyCourse = ()=>{
    const courses = cart.map((course)=>course._id)
    console.log("Buy Course", courses)
    buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className='min-w-[280px] rounded-md border-[1px] border-richblue-700 bg-richblack-800 p-6'>

      <p className='mb-1 text-sm font-medium text-richblack-300'>Total:</p>
      <p className='mb-6 text-3xl font-medium text-yellow-100'>Rs {total}</p>

      {/* button */}
      <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses={"w-full justify-center"}
      />

    </div>
  )
}

export default RenderToatalAmount