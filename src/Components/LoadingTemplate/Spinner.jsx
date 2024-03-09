import React from 'react'
import { Triangle } from 'react-loader-spinner'


const Spinner = ({text}) => {
  return (
    <div className='h-screen w-full flex flex-col gap-y-4 items-center justify-center'>
         <Triangle
            visible={true}
            height="80"
            width="80"
            color="#1DB954"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
        <p className="text-base">{text}</p>
    </div>
  )
}

export default Spinner