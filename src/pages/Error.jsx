import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='flex text-3xl flex-col gap-3 text-red justify-center items-center min-h-screen w-full text-richblack-5'>
      Error - 404 Not Found
      <div>
            <Link to="/">
              <p>Back To Home</p>
            </Link>
          </div>
    </div>
  )
}

export default Error