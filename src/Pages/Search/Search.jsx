import { data } from 'autoprefixer'
import React,{useState,useEffect} from 'react'

import SpotifyWebApi from 'spotify-web-api-js'
import { useSelector } from 'react-redux'

const Search = () => {

    const user = useSelector(state=>state.user.currentuser)
  const SpotifyWeb = new SpotifyWebApi()

  useEffect(()=>{

    if(user){
        SpotifyWeb.setAccessToken(user.token)
        SpotifyWeb.searchTracks('We belong together',{limit:20})
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
  },[])
 
  return (
    <div>

    </div>
  )
}

export default Search