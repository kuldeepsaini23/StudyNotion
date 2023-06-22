import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../services/operations/studentFeatureAPI'

const CourseDetails = () => {

  const {user} = useSelector((state)=>state.profile)
  const {token} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {courseId} = useParams();

  const handleBuyCourse = ()=>{
    if(token){
      buyCourse(token, [courseId], user, navigate, dispatch)
      return;
    }
  }

  return (
    <>
      <button className='text-yellow-100 px-5 py-5 bg-richblack-400'
      onClick={()=>handleBuyCourse()}
      >
        Buy Now
      </button>
    </>
    
  )
}

export default CourseDetails