import React from "react"
import { useSelector } from "react-redux"
import RendertotalWishlistAmount from "./RenderTotalWishlistAmount"
import RenderWishlistCourse from "./RenderWishlistCourse"
 

export default function BookmarkedCourses(){

  const {totalWishlist, totalWishlistItems} = useSelector((state)=>state.wishlist)

  return(
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Your Wishlist</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalWishlistItems} Courses in Wishlist</p>

      {
        totalWishlist>0 ?
        (
          <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
            <RenderWishlistCourse/>
            <RendertotalWishlistAmount/>
          </div>
        ):(
          <p className="mt-14 text-center text-3xl text-richblack-100">Your Wishlist is Empty</p>
        )
      }
    </>
  )
}