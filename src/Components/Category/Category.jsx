import React,{useState,useEffect} from 'react'

// components
import Loading from '../LoadingTemplate/Loading'

import SpotifyWebApi from 'spotify-web-api-js'
// redux
import { useSelector } from 'react-redux'

// react router
import { Link } from 'react-router-dom'


const Category = () => {
   
   const [loading,setLoading] = useState(false)
   const [categories,setCategories] = useState([])
   const SpotifyApi = new SpotifyWebApi()

   const user = useSelector(state=>state.user.currentuser) 
   let _offset = 0

   useEffect(()=>{
     setLoading(true)

     //generate random offset
     _offset =Math.floor(Math.random()*3)
     if(user){
        SpotifyApi.setAccessToken(user.token)
        SpotifyApi.getCategories({
            limit:4,
            offset:_offset
        })
        .then((response)=>{
            setLoading(false)
            setCategories(response.categories.items)
        })
        .catch((err)=>{
            setLoading(false)
            console.log(err)
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
                     <h6 className="text-xl mb-4">My Category</h6> 
                     <Link to={"/categories"} className="underline hover:text-gray-400 text-sm mr-2 my-3 rounded-sm ">More</Link>
                   </div>
                   
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                     {
                        categories.map((category)=>{
                           return  <div className="max-w-sm  mt-5 px-2 overflow-hidden" key={category?.id}>
                           <div className="flex flex-col gap-y-1 ">
                               <img src={category?.icons[0].url} alt="" className='object-fit h-44 rounded-sm'/>
                               <p>{category.name}</p>
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

export default Category