import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';

const Instructor = () => {

  const {token} = useSelector((state)=>state.auth)
  const {user} = useSelector((state)=>state.profile)

  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([])

  useEffect(()=>{
    const getCourseDataWithStats = async()=>{
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token);

      console.log(instructorApiData)

      if(instructorApiData.length){
        setInstructorData(instructorApiData);
      }

      if(result){
        setCourses(result)
      }

      setLoading(false)
    }

    getCourseDataWithStats()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const totalStudents = instructorData?.reduce((acc, curr)=> acc + curr.totalStudentsEnrolled, 0);
  const totalAmount = instructorData?.reduce((acc, curr)=> acc + curr.totalAmountGenerated, 0);

  return (
    <div className='text-white'>
      {/* Section one */}
      <div> 
        <h1>Hi {user?.firstName}</h1>
        <p>Let's start something new</p>
      </div>

      {/* Remaning Sections */}
      {
        loading ? (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div div className="spinner"></div>
          </div>
        ) : courses.length>0 ? (
          <>
          <div>
          {/* Section 2 */}
            <div>
              <InstructorChart courses={instructorData}/>

              {/* section 3 */}
              <div>
                <p>Statistics</p>
                
                <div>
                  <p>Total Courses</p>
                  <p>{courses.length}</p>
                </div>

                <div>
                  <p>Total Students</p>
                  <p>{totalStudents}</p>
                </div>

                <div>
                  <p>Total Income</p>
                  <p>{totalAmount}</p>
                </div>

              </div>
            </div>
          </div>

          {/* last section render 3 vCourses*/}
          <div>
            {/*  heading */}
            <div>
              <p>Your Courses</p>
              <Link to="/dashboard/mu-courses">
                <p>View All</p>
              </Link>
            </div>

          {/* Courses */}
          <div>
            {
              courses.slice(0,3).map((course, index)=>(
                <div key={index}>
                  <img src={course.thumbnail} alt='course-img'/>

                  <div>
                    <p>{course.courseName}</p>

                    <div>
                      <p>{course.totalStudentsEnrolled} Studens</p>
                      <p>|</p>
                      <p>Rs {course.price}</p>
                    </div>

                  </div>
                </div>
              ))
            }
          </div>

          </div>
          </>
        ) : (
          <div>
            <p>You have not created any courses yet</p>
            <Link to={"/dashboard/addCourse"}>
              Create a Course
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default Instructor