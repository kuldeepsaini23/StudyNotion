import React from "react"
import { IoIosVideocam } from "react-icons/io"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div>
      <div className="flex justify-between py-2">
        <div className={`flex items-center gap-2`}>
          <span>
            <IoIosVideocam className="text-yellow-25"/>
          </span>
          <p>{subSec?.title}</p>
        </div>

        <p>{subSec?.timeDuration}</p>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion