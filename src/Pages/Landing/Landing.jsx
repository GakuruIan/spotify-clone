import React,{useEffect,useState} from 'react'

// spotify helpers
import { scopes ,getToken} from '../../Spotify-Helpers/Spotify-helpers'
import SpotifyWebApi  from 'spotify-web-api-js'

// redux
import {useDispatch,useSelector} from 'react-redux'
import { login,logout } from '../../Redux/UserReducer'

// images
import pic from '../../assets/one.png'
import pic2 from '../../assets/two.png'
import pic3 from '../../assets/three.png'


const Landing = () => {

  const SpotifyApi =new  SpotifyWebApi()
  const User = useSelector(state=>state.user)
  const dispatch = useDispatch()

   const[image,setImage]= useState(null)
   const[token,setToken] = useState(null)

   const images = [pic,pic2,pic3]
     
   useEffect(()=>{
    
     let num = Math.floor(Math.random() * images.length)
     setImage(images[num])

     if(User.currentuser){
      window.location.href = "/main"
     }

     else{
      const _token = getToken()
    
        if(_token.access_token){

          setToken(_token)
          SpotifyApi.setAccessToken(_token.access_token)

          SpotifyApi.getMe()
          .then(user=>{
             const {country,display_name,email,id,images} = user 
             dispatch(login({country,display_name,email,id,images,token:_token.access_token}))
             window.location.href = "/main"
          })
          .catch(err=>{
            console.log(err)
          })
        }
        window.location.hash = ""
     }

     
    
   },[token])




  return (
   <div className='relative h-screen bg-dark-800  flex items-center justify-center'>
      <img src={image} className='bg-center bg-no-repeat h-full w-full object-cover mix-blend-overlay'/>
        <div className='absolute  inset-y-1/2  flex flex-col gap-2 justify-center items-center'>
          <h1 className="text-5xl md:text-7xl mb-4 text-center"> <span className='text-spotify-900'>Groove</span> Party</h1>
          <p className="text-base md:text-xl text-center mb-4"> Unveiling Today's Chart-Topping Beats!</p>
         
          <a 
             href={`https://accounts.spotify.com/authorize?&client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=token&scope=${scopes}&redirect_uri=http://localhost:5173/&show_dialog=true`}
             className="px-4 py-2 text-base text-center border border-spotify-900 w-full  hover:bg-spotify-900">
             Login
          </a>

          
        </div>
   </div>
  )
}

export default Landing