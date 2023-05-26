import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold text-yellow-100 bg-gradient-to-r from-richblack-500 via-pink-500 to-red-500 text-transparent bg-clip-text'>
     {" "} {text} {" "}
    </span>
  )
}

export default HighlightText