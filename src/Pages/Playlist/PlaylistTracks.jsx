import React,{useEffect,useState} from 'react'

// helpers
import { SpotifyWeb } from '../../Spotify-Helpers/Spotify-helpers'

// redux
import { useSelector } from 'react-redux'

// component
import Wrapper from '../../Components/Wrapper/Wrapper'
import Tracks from '../../Components/Tracks/Tracks'

// react router
import { useParams } from 'react-router-dom'

const PlaylistTracks = () => {
    const [tracks,setTracks] = useState([])
    const [data,setData] = useState({})

    const user = useSelector(state => state.user.currentuser)

    const {id} = useParams()

    if(user){
        SpotifyWeb.setAccessToken(user.token)
    }

    useEffect(()=>{

        if(user){
            SpotifyWeb.getPlaylist(id).then((data)=>{ 
                setData(data)
               
                SpotifyWeb.getPlaylistTracks(id,{limit:20})
                .then((tracks)=>{
                    setTracks(tracks)
                   
                })
                .catch((err)=>{
                    console.log(err)
                })
            }).catch((err)=>{
                console.log(err)
            })
        }
      
    },[tracks])
  return (
    <div>
          <Wrapper data={data}/>

          <Tracks tracks={tracks}/>
    </div>
  )
}

export default PlaylistTracks