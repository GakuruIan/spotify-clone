import React,{useState,useEffect} from 'react'

// react router
import { useParams } from 'react-router-dom'

// spotify
import SpotifyWebApi from 'spotify-web-api-js'
import { colors } from '../../Spotify-Helpers/Spotify-helpers'

import Wrapper from '../../Components/Wrapper/Wrapper'

// icons
import { IoHeartOutline } from "react-icons/io5"
import { IoIosRemoveCircleOutline } from "react-icons/io"
import { CiTimer } from "react-icons/ci"

//redux
import { useSelector } from 'react-redux'

const Artist = () => {

  const user = useSelector(state=>state.user.currentuser)

   const SpotifyWeb = new SpotifyWebApi()
   const [artist,setArtist] = useState({})
   const [tracks,setTracks]= useState([])
   const [color,setColor] = useState("")

   const artistId = useParams().id;

   useEffect(()=>{
    let colorIndex =  Math.floor((Math.random()*colors.length))
    setColor(colors[colorIndex])
    if(user){
      SpotifyWeb.setAccessToken(user.token)
      SpotifyWeb.getArtist(artistId)
      .then((response)=>{
        setArtist(response)
        SpotifyWeb.getArtistTopTracks(artistId,'KE').then((response)=>{
          setTracks(response.tracks)
            console.log(response)
        }).catch((err)=>{
          console.log(err)
        })
      })
      .catch((err)=>{
        console.log(err)
      })
    }
      
   },[])


  return (
    <div className="h-full w-full">

      {
        artist && artist.images && artist.images.length > 0 && 
          <div className="relative h-full w-full ">
            <div className="flex md:items-center h-64 md:h-96 gap-x-4 py-4 px-2"
              style={{
                background:`linear-gradient(to bottom, rgba(239, 239, 238,0.15),rgba(239, 239, 238,0.1),rgba(239, 239, 238,0.05), #222222 )`
                }}  
            >
              <img src={artist?.images[0]?.url} className='h-52 md:h-60 w-40 md:w-44 object-cover rounded-sm'/>
              <div className="">
                   <h6 className="text-[40px] md:text-9xl mb-2">{artist.name}</h6>
                   
                   {/* ratings and followers */}
                   <div className='flex items-center flex-wrap gap-y-1 gap-x-2 mb-2 md:ml-2'>
                      <div className="flex items-center gap-x-1 md:gap-x-2">
                          <small className='text-sm md:text-base text-gray-300'>Followers :</small>
                          <span className="text-sm md:text-base text-gray-300">{artist?.followers?.total}</span>
                      </div>
                      <div className="flex items-center gap-x-1">
                            <small className='text-sm md:text-base text-gray-300'>Popularity:</small>
                            <span className="text-sm md:text-base text-gray-300">{artist?.popularity}</span>
                      </div>
                   </div>

                   {/* genres */}
                   <div className="md:ml-2">
                    <h6 className="text-base mb-1">Genres</h6>
                      <div className="flex flex-wrap gap-y-1 items-center gap-2">
                        {
                          artist?.genres.map((genre,index)=>{
                            return <span key={index} className='text-sm md:text-base text-gray-400 hover:cursor-pointer hover:underline'>{genre}</span>
                          })
                        }
                      </div>
                   </div>
              </div>
            </div>
            
           {/* follow button and play buttton */}
           <div className="relative px-2 mb-4 py-2">
             <div className="absolute top-0 right-5 pb-2">
                   <button
                      className=" px-2 py-1.5 text-base text-center border border-spotify-900 w-24  hover:bg-spotify-900">
                    Follow
                   </button>
             </div>
           </div>

           {/* top tracks */}


           <div className="px-2 bg-dark-200">
                <h6 className="text-2xl mb-2">Top songs</h6>
                
                <div className="">

                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-2 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                        Song 
                                    </th>
                                    <th scope="col" className="px-3 py-3">
                                      
                                    </th>

                                    <th scope="col" className="px-3 py-3">
                                        <span>
                                          <CiTimer className='text-spotify-900 text-[18px]'/>
                                        </span>
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                              {
                                tracks.map((track)=>{
                                  return <tr className="group hover:cursor-pointer hover:bg-light" key={track.id}>
                                        <td className="px-2 py-4">
                                            {track?.track_number}
                                        </td>
                            
                                        <th scope="row" className="flex items-center gap-x-4 px-3 py-4 font-medium whitespace-nowrap text-white">
                                           <img src={track.album.images[0].url} className="h-8 w-8 object-fit" alt="" />
                                           <span> {track?.name} </span>
                                        </th>
                                         
                                         <td className=''>
                                          <span className='hidden transition-all duration-300 ease-in group-hover:block'>
                                           < IoHeartOutline className='text-[20px] text-spotify-900 '/> 
                                          </span>
                                         </td>

                                        <td className="px-3 py-4">
                                            3:45
                                        </td>
                                    </tr>
                                })
                              }
                                

                            </tbody>
                        </table>
                    </div>

       </div>
          {/* songs table */}
           </div>
        </div>
      }
       
    </div>
  )
}

export default Artist