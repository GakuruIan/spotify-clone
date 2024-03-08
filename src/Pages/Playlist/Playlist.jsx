import React,{useState,useEffect} from 'react'
// react touter
import { useParams } from 'react-router-dom'

// components
import SpotifyWebApi from 'spotify-web-api-js'

// redux
import { useSelector } from 'react-redux'
import SpotifyUI from '../SpotifyUI/SpotifyUI'
const Playlist = () => {
    const [data,setData] = useState([])

    const SpotifyWeb = new SpotifyWebApi()
    const {id} = useParams()
    const user = useSelector(state=>state.user.currentuser) 
   
    useEffect(()=>{
    
    if(user){
        SpotifyWeb.setAccessToken(user.token)
        SpotifyWeb.getPlaylist(id,{limit:20})
        .then((data)=>{
           setData(data)
        //    console.log(data)
        })
        .catch((err)=>{
           console.log(err)
        })
   
    }
    
    },[])

  return (
    <div>
        <SpotifyUI data={data}/>
    </div>
  )
}

export default Playlist