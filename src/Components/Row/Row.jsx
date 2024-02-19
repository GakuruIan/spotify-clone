import React,{useState,useEffect} from 'react'

import Loading from '../LoadingTemplate/Loading';
import { useSelector } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';


const Row = () => {
    const SpotifyApi = new SpotifyWebApi();

    const [loading,setLoading] = useState(false)
    const [items,setItems] = useState([])

    const user = useSelector(state=>state.user.currentuser)
    let token = null

    
    useEffect(()=>{
      setLoading(true)
      if(user){
        token = user.token

        SpotifyApi.setAccessToken(token)
        SpotifyApi.getMyTopArtists({
          limit:4
        })
        .then((response)=>{
          setItems(response.items)
          setLoading(false)
        })
        .catch(err=>{
          console.log(err)
          setLoading(false)
        })
      }
    },[])

   
  return (
    <div className='py-4 px-2 md:px-0'>

          {
           loading ? (<Loading/>) :
            (
              <>
              
               <div className="w-full flex items-center justify-between pr-2">
                <h6 className="text-xl mb-4">Top artist</h6> 
                <a href='' className="underline hover:text-gray-400 text-sm mr-2 my-3 rounded-sm ">More</a>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {
                   items.map((item)=>{
                      return  <div className="max-w-sm  mt-5 px-2 overflow-hidden" key={item?.id}>
                      <div className="flex flex-col gap-y-1 ">
                          <img src={item?.images[0].url} alt="" className='object-fit  h-44 rounded-sm'/>
                          <p>{item.name}</p>
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

export default Row