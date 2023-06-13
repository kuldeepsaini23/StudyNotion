import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);

  const [enrolledCourses, setEnrolledCourses] = useState();

  const getEnrolledCourses = async () => {
    try {
      //calling course handler with api
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch Enrolled Courses");
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div>Loading.....</div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">you have not enrolled in any course yet</p>
      ) : (
        <div>

          <div>
            <p>Course Name</p>
            <p>Duration</p>
            <p>Progress</p>
          </div>

          {/* Cards yha se shru ho rhe hh */}
          {
            enrolledCourses.map((course, index)=>(
              <div key={index}>
                {/* Course Details */}
                <div>
                  <img src={course.thumbnail} alt={course.name}/>
                  {/* Title and descrption */}
                  <div>
                    <p>{course.name}</p>
                    <p>{course.courseDescription}</p>
                  </div>
                </div>

                {/* duration */}
                <div>
                  {course?.totalDuration}
                </div>

                {/* Progress bar */}
                <div>
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    maxCompleted={100}
                  />
                </div>

              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
