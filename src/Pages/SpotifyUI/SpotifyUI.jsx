import React,{useState,useEffect} from 'react'

import { IoHeartOutline } from "react-icons/io5"
// Heart filled
import { IoHeartSharp } from "react-icons/io5"

import { CiTimer } from "react-icons/ci"
import { CiPlay1 } from "react-icons/ci";

// colors
import { colors } from '../../Spotify-Helpers/Spotify-helpers'

import Spinner from '../../Components/LoadingTemplate/Spinner.jsx'

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

// notification
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getMinutes,getSeconds,handlePlay } from '../../Spotify-Helpers/Spotify-helpers';


const SpotifyUI = ({data,loading}) => {
    const [color,setColor] = useState("")
    const [isMobile,setIsMobile] = useState(false)


    const handleResize = ()=>{
      setIsMobile(window.innerWidth < 768)
    }

    const user = useSelector(state=>state.user.currentuser)
    
   
    useEffect(()=>{
       let colorIndex =  Math.floor((Math.random()*colors.length))
       setColor(colors[colorIndex])

       
           
       window.addEventListener('resize', handleResize);

       handleResize()

       return () => {
        window.removeEventListener('resize', handleResize);
      };

    },[])

     console.log(data)

    const Trimmer=(inputStr) => {
      const word = 'Cover'
      var index = inputStr.indexOf(word);
      if (index !== -1) {
          return inputStr.slice(0, index + word.length);
      } else {
          return inputStr;
      }
  }

  return (
    <>
         <ToastContainer
            
         />
       {
        loading ? (<Spinner text="Getting Playlist..."/>) :  

           <div className='h-full w-full relative'>


           
              <div className="sticky top-14 md:top-16 z-10 bg-dark-400 h-[35vh] md:h-[45vh] relative flex md:items-center"
                style={{
                  backgroundImage:`linear-gradient(to bottom, ${color} , #222222)`
              }}   
              >
                  <div className="px-2 md:mx-4 flex items-center gap-x-4 md:gap-x-4 w-full">
                      {
                        data?.images &&  <img src={data?.images[0].url} alt="" className='h-44 md:h-60 w-36 md:w-44 object-cover rounded-sm'/>
                      }
                      
                      <div className=" md:max-w-xl text-wrap">
                        <h1 className="text-3xl md:text-8xl">{data?.name}</h1>
                        <p className="text-wrap   mt-2 text-sm md:text-base">{data?.description && Trimmer(data?.description)}</p>
                      </div>
                  </div>  
            </div>

                  {
                    isMobile ? (
                    <div className="mt-2 px-2 md:mx-4">
                      {
                          data?.tracks?.items.map((item)=>{
                            return   <div onClick={()=> handlePlay(user.token)} className="flex items-center gap-x-3 mb-2 hover:bg-light hover:cursor-pointer py-2 px-1" key={item.track.id}>
                            <span>
                              < CiPlay1 className='text-[20px] text-spotify-900'/>
                            </span>
        
                            <div className="flex flex-col flex-1">
                              <Link to={`/track/${item?.track.id}`} className="text-base hover:text-gray-300 mb-1">{item?.track.name}</Link>

                              <div className="flex items-center flex-wrap gap-x-1">
                                {
                                  item.track.artists.map((artist)=>{
                                    return <Link to={`/artist/${artist.id}`}  className='text-sm text-[rgba(255,255,255,0.4)]' key={artist.id}>{artist.name} </Link>
                                  })
                                }
                              </div>
                            </div>
        
                            <span>
                              < IoHeartOutline className='text-[20px] text-spotify-900'/>
                            </span>
                        </div>
                          })
                      }
                      
                    </div>
                    ) 
                    
                    :

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
                                      return <tr onClick={()=>handlePlay(user.token)} className="hover:cursor-pointer hover:bg-light" key={item.track.id}>
                                            <td className="px-6 py-4">
                                                {index + 1}
                                            </td>
                                            <td scope="row" className=" px-6 py-4 font-medium whitespace-nowrap text-white">
                                                <Link to={`/track/${item?.track.id}`} className="hover:text-300">
                                                  {item?.track.name}   
                                                </Link>
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
                                                    return <Link to={`/artist/${artist.id}`} className='text-base hover:text-gray-300' key={artist.id}>{artist.name} </Link>
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
                                        </tr>
                                    })
                                  }
                                    

                                </tbody>
                            </table>
                        </div>
                      </div>
                  }
          </div>
       }
    </>
   
   
  )
}

export default SpotifyUI