import React,{useState,useEffect} from 'react'

//icons
import { CiTimer } from "react-icons/ci"
import { IoHeartOutline } from "react-icons/io5"
import { CiPlay1 } from "react-icons/ci";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// helpers
import { getMinutes,getSeconds,handlePlay} from '../../Spotify-Helpers/Spotify-helpers'

// redux
import { useSelector } from 'react-redux';

const Tracks = ({tracks}) => {
    const [isMobile,setIsmobile] = useState(false)

    const user = useSelector(state =>state.user.currentuser)

    const handleResize = ()=>{
        setIsmobile(window.innerWidth < 768)
     
    }
    useEffect(()=>{
        window.addEventListener('resize', handleResize);

        handleResize()
     
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    },[])
   
    console.log(tracks.images)
  return (
    <div>
      {/* toast notification */}
      <ToastContainer/>

         <div className="">
                {
                    isMobile ? 
                   
                    ( <div className="mt-2 px-2 md:mx-4 pb-16">
                    {
                       tracks && tracks.items?.length > 0 && tracks?.items.map((item,index)=>{
                          return   <div onClick={()=>handlePlay(user.token)} className="flex items-center gap-x-3 mb-2 hover:bg-light hover:cursor-pointer py-2 px-1" key={item.id ? item.id : item.track.id}>
                          <span>
                                {index +1}
                          </span>
                          <span>
                            < CiPlay1 className='text-[20px] text-spotify-900'/>
                          </span>
                          {/* <p>{item.track.album?.images[0].url}</p> */}

                          <div className="flex itemss-center gap-x-2 flex-1">
                             <div className="">
                                {
                                  <>
                                
                                     {
                                      item.track.album?.images  ? 
                                       <img src={item.track.album?.images[0].url} alt="" srcset="" className='h-8 w-8 object-fit'/> 
                                          :
                                       <img src={item?.images[0].url} alt="" />
                                     }
                                  </>
                                }
                             </div>
  

                              <div className="">
                                  <h6 className="text-base">{item.name ? item.name : item.track.name}</h6>

                                  <div className="flex items-center flex-wrap gap-x-1">
                                        {
                                          item.track?.artists ? (
                                            item.track.artists.map((artist)=>{
                                              return <p className='text-sm text-[rgba(255,255,255,0.4)]' key={artist.id}>{artist.name} </p>
                                            })
                                          )
                                          :
                                          (
                                            item?.artists.map((artist)=>{
                                              return <p className='text-sm text-[rgba(255,255,255,0.4)]' key={artist.id}>{artist.name} </p>
                                            })
                                          )
                                        }
                                        </div>
                              </div>
                         
                          </div>
      
                          <span>
                            < IoHeartOutline className='text-[20px] text-spotify-900'/>
                          </span>
                       </div>
                         })
                    }
                    
                  </div>) :

                    ( <div className="px-2 md:mx-4">
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
                                tracks  && tracks.items?.map((item,index)=>{
                                  return <tr onClick={()=>handlePlay(user.token)} className="hover:cursor-pointer hover:bg-light" key={item.track?.id ? item.track?.id : item.id}>
                                        <td className="px-6 py-4">
                                            {index + 1}
                                        </td>
                                        <td scope="row" className=" px-6 py-4 font-medium whitespace-nowrap text-white">
                                            {item.track?.name ? item.track?.name : item.name}   
                                        </td>
                                        <td>
                                              <span>
                                                < IoHeartOutline className='text-[20px] text-spotify-900'/>
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 ">
                                          <div className="flex items-center flex-wrap gap-x-1">
                                            {
                                              
                                              item.artist ? 
                                               (
                                                  item?.artists.map((artist)=>{
                                                   return <span className='text-base' key={artist.id}>{artist.name} </span>
                                                  })

                                               )
                                               :
                                               (
                                                item.track?.artists.map((artist)=>{
                                                  return <span className='text-base' key={artist.id}>{artist.name} </span>
                                              })
                                               )
                                            }
                                          </div>
                                          
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                          {item.track?.popularity ? item.track?.popularity : item?.popularity}
                                        </td>
                                        <td className="px-6 py-4 w-24">
                                            {
                                              `${getMinutes(item?.duration_ms)} : ${getSeconds(item?.duration_ms)}`
                                            }
                                        </td>
                                    </tr>
                                })
                              }
                                

                            </tbody>
                        </table>
                    </div>
                  </div>)
                }
         </div>
    </div>
  )
}

export default Tracks