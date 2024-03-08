import React,{useState} from 'react'

// icons
import { CiSpeaker } from "react-icons/ci"
import { RxTrackNext } from "react-icons/rx"
import { RxTrackPrevious } from "react-icons/rx"
import { RxPlay } from "react-icons/rx"
import { IoMdMore } from "react-icons/io"



const Player = () => {
  return (
    <>
        {/* Player */}
        <div className="fixed bottom-0  w-screen bg-dark-100 py-2 px-2 h-16 shadow-lg md:mx-0"
              style={{
                background:`linear-gradient(to left, #282828 , #222222 65%)`
            }}  
            >
              <div className="px-2 md:px-0 grid grid-cols-3 md:grid-cols-6 gap-2 place-items-center">

                <div className="md:col-span-1 w-full">
                    <h6 className="text-base">song name</h6>
                    <p className="text-sm text-gray-400">artist</p>
                </div>

                {/* player icons */}
                <div className="md:col-span-2 w-full">
                     <div className="">
                        <div className="flex items-center justify-between">
                              <RxTrackPrevious className='text-xl hover:cursor-pointer hover:text-spotify-900'/>
                              <RxPlay className='text-xl hover:cursor-pointer hover:text-spotify-900'/>
                              <RxTrackNext className='text-xl hover:cursor-pointer hover:text-spotify-900'/>
                        </div>
                     </div>
                </div>

                <div className="md:col-span-1 justify-self-end ">
                  <div className="flex items-center gap-x-2">
                    <CiSpeaker className='text-xl text-spotify-900'/>
                    <IoMdMore className='text-xl'/>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default Player