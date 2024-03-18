import React from 'react'

import pic from '../../assets/error.png'
const Error = ({error,resetErrorBoundary}) => {

  console.log(error)
  return (
    <div className='h-screen w-full flex items-center justify-center flex-col gap-y-10 bg-dark-200'>
        <img src={pic} alt=""  className='h-96 w-96 object-fit'/>
        <p className="text-center text-xl">An Error has occurred. Try again later</p>
        <button onClick={resetErrorBoundary} className="px-4 py-2 bg-spotify-900 text-center">Refresh Page</button>
    </div>
  )
}

export default Error