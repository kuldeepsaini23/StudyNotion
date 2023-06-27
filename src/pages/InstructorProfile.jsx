import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../utils/constants';
import Error from './Error';
import { useEffect } from 'react';
import { getInstructorDetails } from '../services/operations/profileAPI';
import { useParams } from 'react-router-dom';

const InstructorProfile = () => {

  const {instructorId} = useParams()
  const [instructorDetails, setInstructorDetails] = useState([])

  useEffect(()=>{
    const fetchInstructorData = async()=>{
      const response = await getInstructorDetails(instructorId);
      setInstructorDetails(response)
    } 

    fetchInstructorData()
  },[instructorId])


  if(instructorDetails.accountType !== ACCOUNT_TYPE.INSTRUCTOR){
    return(<Error/>)
  }


  return (
    <div className='text-5xl text-richblack-5'>InstructorProfile</div>
  )
}

export default InstructorProfile