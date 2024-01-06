import React,{useState,useEffect} from 'react'
import pic from '../../assets/one.png'

// components
import Topbar from '../../Components/Topbar/Topbar'

import { MdOutlineHeadset } from "react-icons/md"
import { IoHeartOutline } from "react-icons/io5"
// Heart filled
import { IoHeartSharp } from "react-icons/io5"

import { IoIosRemoveCircleOutline } from "react-icons/io"
import { CiTimer } from "react-icons/ci"
import { CiSpeaker } from "react-icons/ci"
import { RxTrackNext } from "react-icons/rx"
import { RxTrackPrevious } from "react-icons/rx"
import { RxPlay } from "react-icons/rx"
import { IoMdMore } from "react-icons/io"

const SpotifyUI = () => {
    const [color,setColor] = useState("")
    const list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

    const colors = [
    'rgba(225,255,255,0.2)',
    'rgba(217, 200, 165,0.25)',
    'rgba(152, 88, 62,0.2)',
     'rgba(239, 239, 238,0.25)',
     'rgba(181, 155, 137,0.2)',
    'rgba(180, 137, 110,0.25)',
    'rgba(229, 172, 73,0.2)'
    ]
    

    useEffect(()=>{
       let colorIndex =  Math.floor((Math.random()*colors.length))
       setColor(colors[colorIndex])
    },[])


  return (
    <div className='h-full w-full relative' 
          style={{
            background:`linear-gradient(to bottom, ${color} , #222222 45%)`
        }}   
        >

        <div className="h-[35vh] md:h-[45vh] relative flex md:items-center">
            <div className="px-2 md:mx-4 flex items-center gap-x-4 w-full">
                <img src={pic} alt="" className='h-44 md:h-60 w-36 md:w-44 object-cover rounded-sm'/>
                <div className="md:max-w-xl">
                   <h1 className="text-3xl md:text-8xl">Otile Brown</h1>
                   <p className="mt-2 text-sm md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, tempore ipsum? Quasi cupiditate unde qui quos fugit ab nisi nemo nihil sunt, at, repellendus et asperiores facere ipsa iure ullam!</p>
                </div>
            </div>  
       </div>

       {/* songs table */}
       <div className="px-2 md:mx-4">
          <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              #
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Song 
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Artist
                          </th>
                          <th scope="col" className="px-6 py-3">
                            
                              <span>
                                <MdOutlineHeadset className='text-spotify-900 text-[18px]'/>
                              </span>
                          </th>

                          <th scope="col" className="px-6 py-3">
                              <span>
                                <CiTimer className='text-spotify-900 text-[18px]'/>
                              </span>
                          </th>

                          <th scope="col" className="px-6 py-3">
                            
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      list.map((item)=>{
                        return <tr className="hover:cursor-pointer hover:bg-light" key={item}>
                              <td className="px-6 py-4">
                                  {item}
                              </td>
                              <th scope="row" className="flex items-center gap-x-4 px-6 py-4 font-medium whitespace-nowrap text-white">
                                  Song name 
                                  <span>
                                < IoHeartOutline className='text-[20px] text-spotify-900'/>
                                  </span>
                              </th>
                              <td className="px-6 py-4">
                                  Artist name
                              </td>
                              <td className="px-6 py-4">
                                  12,000
                              </td>
                              <td className="px-6 py-4">
                                  3:45
                              </td>
                              <td className="px-6 py-4">
                                <IoIosRemoveCircleOutline className='text-[20px] text-red-500'/>
                              </td>
                          </tr>
                      })
                    }
                      

                  </tbody>
              </table>
          </div>

       </div>
          {/* songs table */}

            {/* Player */}
          <div className="fixed bottom-0  w-screen bg-dark-100 py-2 px-2 h-16 shadow-lg md:mx-4"
              style={{
                background:`linear-gradient(to left, ${color} , #222222 65%)`
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
    </div>
  )
}

export default SpotifyUI