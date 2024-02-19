import React,{useState,useEffect} from 'react'

// components
import Loading from '../LoadingTemplate/Loading'
import SpotifyWebApi from 'spotify-web-api-js'

const Recommendations = () => {
    const [loading,setLoading]= useState(false)
    const [playlists,setPlaylist] = useState([])
    const SpotipyApi = new SpotifyWebApi()

    useEffect(()=>{
      SpotipyApi.getFeaturedPlaylists({
        limit:4,
      }).then((response)=>{
        setPlaylist(response.playlists.items)
        setLoading(false)
      })
      .catch((err)=>{
        setLoading(false)
        console.log(err)
      })
    },[])

  return (
    <div className='py-4 px-2 md:px-0'>
 

        {
        loading ? (<Loading/>) :
        (
            <>
            
                <div className="w-full flex items-center justify-between pr-2">
                    <h6 className="text-xl mb-4">Popular Playlists</h6> 
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {
                        playlists.map((playlist)=>{
                            return  <div className="max-w-sm  mt-5 px-2 overflow-hidden" key={playlist?.id}>
                            <div className="flex flex-col gap-y-1 ">
                                <img src={playlist?.images[0].url} alt="" className='object-fit h-44 rounded-sm'/>
                                <div className="flex items-center justify-between">
                                  <p>{playlist.name}</p>
                                  <span className='text-sm text-gray-300'>Tracks: {playlist.tracks.total}</span>
                                </div>
                            </div> 
                        </div>
                        })
                    }
                                
                </div>   
            </>
        )
        } 
  

    </div>
  )
}

export default Recommendations