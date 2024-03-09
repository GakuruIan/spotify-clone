import React,{useState,useEffect} from 'react'
// redux
import { useSelector } from 'react-redux'

// react router
import { useParams } from 'react-router-dom'

// spotify
import SpotifyWebApi from 'spotify-web-api-js'

//icons
import { CiTimer } from "react-icons/ci"
import { IoHeartOutline } from "react-icons/io5"
import { CiPlay1 } from "react-icons/ci";

const Tracks = () => {
    const [tracks,setTracks] = useState([])
    const [playlist,setPlaylist] = useState({})

    const [isMobile,setIsmobile] = useState(false)

    const SpotifyWeb = new SpotifyWebApi()

    const user = useSelector(state => state.user.currentuser)

    const {id} = useParams()

    const handleResize = ()=>{
        setIsmobile(window.innerWidth < 768)
     
    }
    useEffect(()=>{
        if(user){
            SpotifyWeb.setAccessToken(user.token)

            SpotifyWeb.getPlaylist(id).then((data)=>{ 
                setPlaylist(data)
                console.log(data)
                SpotifyWeb.getPlaylistTracks(id,{limit:20})
                .then((tracks)=>{
                    setTracks(tracks)
                    console.log(tracks.items)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })

            window.addEventListener('resize', handleResize);

            handleResize()
     
            return () => {
             window.removeEventListener('resize', handleResize);
           };
        }
    },[])

    const getMinutes = (durationInMilliseconds) =>{
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
    <div>
         <div className='sticky top-14 z-10  h-[20vh] md:h-[30vh] w-full py-2 mb-6 px-2 flex items-center' 
            style={{
                backgroundImage:`linear-gradient(to bottom, #333,#232323 80%)`
            }}   
          >
           <div className="flex items-center gap-x-2 md:gap-x-4 mt-4 md:mt-2">
               {playlist.images &&  <img src={playlist?.images[0]?.url} className='h-32 w-32 md:h-60  md:w-44 object-cover rounded-sm'/>}
                <header className='flex  gap-x-2 '>
                    <h6 className="text-5xl md:text-9xl">{playlist.name}</h6>
                    <p className='text-base'>{playlist.description}</p>
                </header>
            </div>
         </div>

         <div className="">
                {
                    isMobile ? 
                   
                    ( <div className="mt-2 px-2 md:mx-4 pb-16">
                    {
                         tracks.items?.map((item,index)=>{
                          return   <div className="flex items-center gap-x-3 mb-2 hover:bg-light hover:cursor-pointer py-2 px-1" key={item.id}>
                          <span>
                                {index +1}
                          </span>
                          <span>
                            < CiPlay1 className='text-[20px] text-spotify-900'/>
                          </span>
      
                          <div className="flex flex-col flex-1">
                            <h6 className="text-base mb-1">{item?.track.name}</h6>
  
                            <div className="flex items-center flex-wrap gap-x-1">
                              {
                                 item.track.artists.map((artist)=>{
                                  return <p className='text-sm text-[rgba(255,255,255,0.4)]' key={artist.id}>{artist.name} </p>
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
                                tracks.items?.map((item,index)=>{
                                  return <tr className="hover:cursor-pointer hover:bg-light" key={item.track.id}>
                                        <td className="px-6 py-4">
                                            {index + 1}
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
                  </div>)
                }
         </div>
    </div>
  )
}

export default Tracks