import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShareSquare } from "react-icons/fa";
import {BiRightArrow} from "react-icons/bi"
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import {ACCOUNT_TYPE} from "../../../utils/constants"
import { addToCart } from "../../../slices/cartSlice";

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { thumbnail: ThumbnailImage, price: CurrentPrice } = course;

  const handleAddToCart = ()=>{
    //if a valid user but instructor
    if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
      toast.error("You are an Instructor, you cannot but a course")
      return;
    }

    //Token is present
    if(token){
      dispatch(addToCart(course))
      return;
    }

    setConfirmationModal({
      text1: "You are not Logged in",
      text2: "Please login to purchase the course",
      btn1text: "Login",
      btn2text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  const handleShare = ()=>{
    copy(window.location.href)
    toast.success("Link Copied to Clipboard")
  }

  return (
    <div className="flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5">
      <img
        src={ThumbnailImage}
        alt="Thumbnail Img"
        className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
      />

      {/* All Info abour course */}
      <div className="px-4">
        {/* Price */}
        <div className="space-x-3 pb-4 text-3xl font-semibold">Rs. {CurrentPrice}</div>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <button className="yellowButton"
            onClick={
              user && course?.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && course?.studentsEnrolled.includes(user?._id)
              ? "Go to Course"
              : "Buy Now"}
          </button>

          {/* Add to Cart */}
          {!course?.studentsEnrolled.includes(user?._id) && (
            <button className="blackButton" onClick={handleAddToCart}>Add to Cart</button>
          )}
        </div>

        {/* Course Info */}
        <div>
          <p className="pb-3 pt-6 text-center text-sm text-richblack-25">30-Day Money-Back Guarantee</p>
          <p className="my-2 text-xl font-semibold ">Basic Details: </p>

          {/* Instructions  */}
          <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
            {course?.instructions?.map((item, index) => (
              <p key={index} className="flex gap-2">
               <BiRightArrow/> <span className="max-w-[265px]">{item}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Share Button */}
        <div className="text-center">
          <button className="mx-auto flex items-center gap-2 py-6 text-yellow-100" onClick={handleShare}>
            <FaShareSquare/> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
