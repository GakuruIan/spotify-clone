import React,{useState,useEffect} from 'react'

// react router
import { Link, useParams } from 'react-router-dom'

// redux
import { useSelector } from 'react-redux'

//spotify web 
import SpotifyWebApi from 'spotify-web-api-js'

// helpers
import { getMinutes,getSeconds } from '../../Spotify-Helpers/Spotify-helpers'

const Track = () => {
    const [track,setTrack] = useState({})
    const [artists,setArtists] = useState([])

    const user = useSelector(state=>state.user.currentuser)

    const SpotifyWeb = new SpotifyWebApi()

    const {id} = useParams()
    useEffect(()=>{
        if(user){
            SpotifyWeb.setAccessToken(user.token)

            SpotifyWeb.getTrack(id,{limit:1})
            .then((response)=>{
                setTrack(response)

                console.log(response)
                const ids = response.artists.map(({ id }) => id);

                SpotifyWeb.getArtists(ids,{limit:ids.length})
                .then((artist)=>{
                    setArtists(artist.artists)
                })
                .catch((err)=>{
                    console.log(err)
                })

            })

            
            .catch((err)=>{
                console.log(err)
            })
        }

    },[])
  return (
    <div className="">
        <div className="flex md:items-center h-64 md:h-96 gap-x-4 py-4 px-2"
            style={{
                background:`linear-gradient(to bottom, rgba(239, 239, 238,0.15),rgba(239, 239, 238,0.1),rgba(239, 239, 238,0.05), #222222 )`
            }}  
         >
               <div className="px-2 md:mx-4 flex items-center gap-x-4 md:gap-x-4 w-full">
                      { 
                        track.album?.images  && <img src={track.album?.images[0]?.url} className='h-32 w-32 md:h-60  md:w-44 object-cover rounded-sm'/>
                      }
                      
                      <div className=" md:max-w-xl text-wrap">
                        <h6 className="text-5xl md:text-7xl">{track?.name}</h6>

                        <div className="flex md:items-center  gap-x-2 mt-2 ml-2 flex-wrap">
                          <Link to={`/album/${track.album?.id}`} className="text-sm md:text-base capitalize text-gray-400 hover:text-gray-300">{track.album?.name}</Link>
                          <p className="text-sm md:text-base text-gray-400 hover:text-gray-300">Popularity: {track?.popularity}</p>
                          <p className="text-sm md:text-base text-gray-400 hover:text-gray-300">{`Length: ${getMinutes(track?.duration_ms)} : ${getSeconds(track?.duration_ms)}`}</p>
                        </div>

                      </div>
                </div>  
               
        </div>

            <div className="md:px-2 px-3">
                <h6 className="text-xl mb-2">Artists</h6>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 md:gap-y-0 md:grid-cols-5 gap-x-2">
                  {
                      artists.map((artist)=>{
                        return  <div key={artist.id} className="flex items-center flex-col rounded-lg group bg-dark-800  px-2 py-3 transition duration-300 ease-in hover:bg-dark-950 hover:cursor-pointer">
                              <div className="flex items-center justify-center mb-2">
                                <img src={artist.images[0]?.url} alt="" className='h-40 w-40 object-fit rounded-full'/>
                            </div>
                            <Link to={`/artist/${artist.id}`} className="text-base text-center mb-1 group-hover:underline group-hover:cursor-pointer">{artist.name}</Link>
                            <p className='text-sm text-gray-300 text-center capitalize'>{artist?.type}</p>
                      </div>
                    })
                  }
              </div>
            </div>

    </div>
  )
}

export default Track