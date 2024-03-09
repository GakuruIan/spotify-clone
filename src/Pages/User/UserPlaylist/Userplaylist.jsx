import React,{useState,useEffect} from 'react'
// redux
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// spotify
import SpotifyWebApi from 'spotify-web-api-js'

// component
import Spinner from '../../../Components/LoadingTemplate/Spinner'

// assets
import { colors } from '../../../Spotify-Helpers/Spotify-helpers'

const Userplaylist = () => {
    const[ userPlaylist,setUserplaylist] = useState([])
    const [loading,setLoading] = useState(false)

    const user = useSelector(state=>state.user.currentuser)
     
    const SpotifyWeb = new SpotifyWebApi()

    useEffect(()=>{
       
        setLoading(true)
        if(user){
            SpotifyWeb.setAccessToken(user.token)
            SpotifyWeb.getUserPlaylists(user.id)
            .then((data)=>{
                setLoading(false)
                setUserplaylist(data.items)
                console.log(data.items)
            })
            .catch((err)=>{
                setLoading(false)
                console.log(err)
            })
        }

    },[])

  return (

    <div>
        {
            loading ? (<Spinner text="Getting Playlist..."/>) :
             (
                <div className='px-2'>
                <h6 className="text-7xl mb-2">My Playlist</h6>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-x-2">
                        {
                            userPlaylist.map((playlist)=>{
                                return <Link to={`/playlist/${playlist.id}/tracks`} key={playlist.id} className="rounded-lg group bg-dark-800  px-2 py-3 transition duration-300 ease-in hover:bg-dark-950 hover:cursor-pointer">
                                <div className="flex items-center justify-center mb-2">
                                <img src={playlist.images[0].url} alt="" className='h-40 w-full md:w-full object-cover md:object-fit rounded-sm'/>
                                </div>
                                   <div className="flex items-center justify-between mb-1">
                                     <p className="text-base mb-1 group-hover:underline group-hover:cursor-pointer">{playlist.name}</p>
                                    
                                   </div>

                                   <div className="flex items-center justify-between mb-1">
                                     <p className="text-base mb-1 group-hover:underline group-hover:cursor-pointer">Tracks</p>
                                     <p className='text-sm text-gray-200 text-center capitalize'>{playlist?.tracks.total}</p>
                                   </div>
                                </Link>
                            })
                        }
                     </div>
                </div>
              
             )
        }
    </div>
  )
}

export default Userplaylist