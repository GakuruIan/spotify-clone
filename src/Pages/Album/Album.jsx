import React,{useState,useEffect} from 'react'

// redux
import { useSelector } from 'react-redux'

//react router
import { useParams } from 'react-router-dom'


// helpers
import { SpotifyWeb } from '../../Spotify-Helpers/Spotify-helpers'

// components
import Wrapper from '../../Components/Wrapper/Wrapper'
import Spinner from '../../Components/LoadingTemplate/Spinner'
import Tracks from '../../Components/Tracks/Tracks'

const Album = () => {
  
    const [album,setAlbum] = useState({})
    const [loading,setLoading] = useState(false)
    const user = useSelector(state=>state.user.currentuser)

    const {id} = useParams()

    if(user){
        SpotifyWeb.setAccessToken(user.token)
    }

    useEffect(()=>{
         setLoading(true)
         SpotifyWeb.getAlbum(id)
         .then((response)=>{
           setLoading(false)
           setAlbum(response)
         })
         .catch((err)=>{
            setLoading(false)
            console.log(err)
         })
    },[])

  return (
    <div> 
       {
        loading ? (<Spinner text="Getting Album..."/>) 
           :
           <>
            <Wrapper data={album}/>
            <Tracks tracks={album.tracks}/>
           </>
       }
          
    </div>
  )
}

export default Album