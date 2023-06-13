import React from 'react'
import { useSelector } from 'react-redux'
import {FaCheck} from "react-icons/fa"
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import CourseBuilderForm from './CourseBuilderForm/CourseBuilderForm'

const Rendersteps = () => {

  const {step} = useSelector((state)=>state.course)

  const stepsData = [
    {
      id:1,
      title: "Course Information"
    },
    {
      id:2,
      title: "Course Builder"
    },
    {
      id:3,
      title: "Publish"
    },
  ]

  // ...

return (
  <>
    {/* Progress Bar */}
    <div className='relative mb-2 flex w-full justify-center'>
      {stepsData.map((item) => (
        <React.Fragment key={item.id}>
          {/* Circle and Number */}
          <div className={`flex flex-col items-center`}>
            <button
              className={`grid cursor-default aspect-square w-[34px] h-[34px] place-items-center rounded-full border-[1px] ${
                step === item.id
                  ? 'bg-yellow-900 border-yellow-50 text-yellow-50'
                  : 'border-richblack-700 bg-richblack-800 text-richblack-300'
              } transition-all duration-2 ${step > item.id
                  ? 'bg-yellow-50 text-yellow-900'
                  : ''}`}
            >
              {step > item.id ? <FaCheck /> : item.id}
            </button>
          </div>

          {/* dotted line / dashes between the label */}
          {stepsData.length - 1 >= item.id && (
            <div
              className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 border-richblack-500 ${
                step === item.id + 1 ? 'border-yellow-50' : 'border-richblack-700'
              } transition-all duration-2`}
              key={item.title}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>

    {/* Title */}
    <div className='flex relative mb-16 w-full select-none justify-between'>
      {stepsData.map((item) => (
        <div className='flex min-w-[130px] flex-col items-center gap-y-2' key={item.id}>
          <p className='text-sm text-richblack-5'>{item.title}</p>
        </div>
      ))}
    </div>

    {/* Forms for 3 different steps */}
    {step === 1 && <CourseInformationForm />}
    {step === 2 && <CourseBuilderForm />}
    {/*   {step === 3 && <PublishCourse />} */}
  </>
);

}

export default Rendersteps