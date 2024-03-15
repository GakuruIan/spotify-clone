import axios from "axios"
import SpotifyWebApi from "spotify-web-api-js"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SpotifyWeb = new SpotifyWebApi()

export const scopes = [
    'user-read-email',
    'user-read-private',
    'playlist-modify-private',
    'playlist-read-collaborative',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-top-read',
    'user-follow-read',
    'user-library-read',
    'user-follow-modify'
].join("%20")

export const getToken=()=>{
    return window.location.hash.substring(1).split('&').reduce((initial,item)=>{
        let parts = item.split('=')
        initial[parts[0]] = decodeURIComponent(parts[1])

        return initial
    },{})
}

export const getRefreshToken =(token)=>{
   const url = "https://accounts.spotify.com/api/token"

   const data = new URLSearchParams({
    grant_type:'refresh_token',
    refresh_token: token,
    client_id:import.meta.env.VITE_CLIENT_ID
   })

   
   axios.post(url,data,{
    headers:{
        'Authorization':Buffer.from(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'}
   })
   .then((response)=>{
      console.log(response.data)
   })
   .catch(err=>{
      console.log(err)
   })
}


export const colors = [
    'rgba(225,255,255,0.2)',
    'rgba(217, 200, 165,0.25)',
    'rgba(152, 88, 62,0.2)',
    'rgba(239, 239, 238,0.25)',
    'rgba(181, 155, 137,0.2)',
    'rgba(180, 137, 110,0.25)',
    'rgba(229, 172, 73,0.2)'
    ]

export const getMinutes = (durationInMilliseconds) =>{
    const totalSeconds = durationInMilliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    return minutes
  }

export const getSeconds = (durationInMilliseconds) =>{
    const totalSeconds = durationInMilliseconds / 1000;
    let seconds = Math.floor(totalSeconds % 60);
    if(seconds< 10){
        seconds = "0" +seconds
    }

    return seconds
}


export const handlePlay=(token)=>{
    SpotifyWeb.setAccessToken(token)

    SpotifyWeb.play().then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
        if(err.status === 403){
            toast.error("Premium account required",{theme: "colored",})
           }
    })
}