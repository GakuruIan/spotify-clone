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

// colors
import { colors } from '../../Spotify-Helpers/Spotify-helpers'

const SpotifyUI = ({data}) => {
    const [color,setColor] = useState("")

    const [lists,setLists] = useState([])
    const list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

    console.log(data)
   

    useEffect(()=>{
       let colorIndex =  Math.floor((Math.random()*colors.length))
       setColor(colors[colorIndex])
     
    },[])

    function getMinutes(durationInMilliseconds) {
      const totalSeconds = durationInMilliseconds / 1000;
      const minutes = Math.floor(totalSeconds / 60);
      return minutes
    }

    const getSeconds = (durationInMilliseconds) =>{
      const totalSeconds = durationInMilliseconds / 1000;
      let seconds = Math.floor(totalSeconds % 60);
      if(seconds< 10){
        seconds = "0" +seconds
      }

      return seconds
    }

  return (
    <div className='h-full w-full relative'>
           
        <div className="sticky top-0 z-40 h-[35vh] md:h-[45vh] relative flex md:items-center"
          style={{
            background:`linear-gradient(to bottom, ${color} , #222222)`
        }}   
        >
            <div className="px-2 md:mx-4 flex items-center gap-x-4 w-full">
                <img src={data?.images[0].url} alt="" className='h-44 md:h-60 w-36 md:w-44 object-cover rounded-sm'/>
                <div className="md:max-w-xl">
                   <h1 className="text-3xl md:text-8xl">{data?.name}</h1>
                   <p className="mt-2 text-sm md:text-base">{data?.description}</p>
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
                             
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Artist
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Popularity
                          </th>

                          <th scope="col" className="px-6 py-3">
                              <span>
                                <CiTimer className='text-spotify-900 text-[18px]'/>
                              </span>
                          </th>

                      </tr>
                  </thead>
                  <tbody>
                    {
                      data?.tracks?.items.map((item,index)=>{
                        return <tr className="hover:cursor-pointer hover:bg-light" key={item.track.id}>
                              <td className="px-6 py-4">
                                  {index}
                              </td>
                              <td scope="row" className=" px-6 py-4 font-medium whitespace-nowrap text-white">
                                  {item?.track.name}   
                              </td>
                              <td>
                                    <span>
                                       < IoHeartOutline className='text-[20px] text-spotify-900'/>
                                  </span>
                              </td>
                              <td className="px-6 py-4 ">
                                <div className="flex items-center flex-wrap gap-x-1">
                                  {
                                    item.track.artists.map((artist)=>{
                                      return <span className='text-base' key={artist.id}>{artist.name} </span>
                                    })
                                  }
                                </div>
                                
                              </td>
                              <td className="px-6 py-4 text-center">
                                 {item.track.popularity}
                              </td>
                              <td className="px-6 py-4 w-24">
                                  {
                                    `${getMinutes(item.track.duration_ms)} : ${getSeconds(item.track.duration_ms)}`
                                  }
                              </td>
                              {/* <td className="px-6 py-4">
                                <IoIosRemoveCircleOutline className='text-[20px] text-red-500'/>
                              </td> */}
                          </tr>
                      })
                    }
                      

                  </tbody>
              </table>
          </div>

       </div>
          {/* songs table */}

           
    </div>
  )
}

export default SpotifyUI