import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../../common/IconBtn'

const RenderToatalAmount = () => {

  const {total, cart} = useSelector((state)=>state.cart)

  const handleBuyCourse = ()=>{
    const courses = cart.map((course)=>course._id)
    console.log("Buy Course", courses)
    // Baad me payyment integerate krdege
  }

  return (
    <div className='min-w-[200px] rounded-md border-[1px] border-richblue-700 bg-richblack-800 p-6'>

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