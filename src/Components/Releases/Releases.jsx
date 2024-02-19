import React,{useState,useEffect} from 'react'

// components
import ReleaseTemplate from '../LoadingTemplate/ReleaseTemplate'

// redux
import { useSelector } from 'react-redux'

import SpotifyWebApi from 'spotify-web-api-js'

const Releases = () => {
  const SpotifyApi = new SpotifyWebApi()

  const[releases,setReleases] = useState([])
  const[loading,setLoading] = useState(false)

  const user = useSelector(state=>state.user.currentuser)
  let token = null
  
  useEffect(()=>{
    let _offset = Math.floor(Math.random()*5)

    setLoading(true)
    if(user){
      token = user.token
      SpotifyApi.setAccessToken(token)
      SpotifyApi.getNewReleases({
        limit:4,
        offset:_offset
      })
      .then((response)=>{
       setReleases(response.albums.items)
       setLoading(false)
      })
      .catch((err)=>{
        setLoading(false)
        console.log(err)
      })
    }
    
  },[])


  return (
        <>
    {
      loading  ? (<ReleaseTemplate/>) 
        :
        ( 
          <div className='py-4 px-2 md:px-0'>
            <h6 className="text-xl mb-4">New Releases</h6>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {
                  releases.map((release)=>{
                    return   <div className="flex flex-col md:flex-row gap-x-2 gap-y-1 md:gap-y-0 bg-dark-700 p-2 rounded-md" key={release?.id}>
                        <img src={release?.images[1].url} className='h-16 w-16 md:h-20  md:w-20 object-cover rounded-sm'/>
                        <div className="">
                            <p className="text-base mb-1">{release?.name}</p>
                            <p className="text-sm text-gray-100 mb-1">Tracks: {release.total_tracks}</p>
                            <p className="text-xs md:text-sm text-gray-400 ">Release date: {release.release_date}</p>
                        </div>
                   </div>
               })
            } 
         </div>

    </div>)
    }
    
    </>
  )
}

export default Releases