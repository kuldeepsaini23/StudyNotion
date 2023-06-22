import React from "react"
import { useEffect } from "react"
import { courseEndpoints } from "../../../../../services/apis"
import { apiConnector } from "../../../../../services/apiconnector"
// import { useForm } from "react-hook-form"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import IconBtn from "../../../../common/IconBtn"


export default function AllCourses(){

  useEffect(()=>{
    const fetchallcourses = async()=>{
      try{
        let res = await apiConnector("GET",courseEndpoints.GET_ALL_COURSE_API)
        console.log(res)
  
      }catch(error){
        console.log(error)
      }
    }

    fetchallcourses()
  },[])

  return(
    <div>Hello</div>
  )
}