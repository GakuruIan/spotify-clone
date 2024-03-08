import React,{useState,useEffect} from 'react'

import { useParams } from 'react-router-dom'

import SpotifyWebApi from 'spotify-web-api-js'

import { colors } from '../../Spotify-Helpers/Spotify-helpers'
// redux
import { useSelector } from 'react-redux'

// components
import Loading from '../../Components/LoadingTemplate/Loading'

const CategoryPage = () => {
  const [playlists,setPlaylists] = useState([])
  const [title,setTitle] = useState('')
  const [loading,setLoading] = useState(false)

  const [color,setColor] = useState("")

  const {id} = useParams()
  const SpotifyWeb = new SpotifyWebApi()
  const user = useSelector(state=>state.user.currentuser) 

  useEffect(()=>{
      let colorIndex =  Math.floor((Math.random()*colors.length))
      setColor(colors[colorIndex])
      setLoading(true)
      if(user){
        SpotifyWeb.setAccessToken(user.token)

         SpotifyWeb.getCategoryPlaylists(id)
         .then((data)=>{
          setPlaylists(data.playlists.items)
          setTitle(data.message)
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
      loading ? <Loading/> : 
        (
            <div className="w-full relative">
              <div className='sticky top-0 z-40  h-[20vh] md:h-[30vh] w-full py-2 mb-6 px-2 flex items-center' 
                    style={{
                      background:`linear-gradient(to bottom, #333,#232323 80%)`
                    }}   
                  >
                <header className=''>
                    <h6 className="text-8xl md:text-9xl">{title}</h6>
                </header>
              </div>
        
              <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-4 px-2">
                  {
                    playlists.map((playlist)=>{
                      return <div className="">
                          <div className="mb-2">
                              <img src={playlist.images[0].url} alt="" />
                          </div>
                          <div className="flex items-center justify-between">
                            <h6 className="text-base"> {playlist.name}</h6>
                            <p className="text-base text-gray-500"> Tracks {playlist.tracks.total}</p>
                          </div>
                    </div>
                    })
                  }
              </div>
        
           </div>
        )
     }
    </>
    
  )
}

export default CategoryPage