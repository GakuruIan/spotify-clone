import React,{useState,useEffect} from 'react'

// spotify
import SpotifyWebApi from 'spotify-web-api-js'

// redux
import { useSelector } from 'react-redux'

// component
import Loading from '../../Components/LoadingTemplate/Loading.jsx'

// react router
import { Link } from 'react-router-dom'

const Categories = () => {

   const SpotifyWeb = new SpotifyWebApi()
   const [categories,setCategories] = useState([])
   const [loading,setLoading] = useState(false)

   const user = useSelector(state=>state.user.currentuser)


   useEffect(()=>{
       setLoading(true)

       if(user){
        SpotifyWeb.setAccessToken(user.token)
        SpotifyWeb.getCategories()
       .then((response)=>{
        setCategories(response.categories.items)
        setLoading(false)
       })
       .catch((err)=>{
        setLoading(false)
        console.log(err)
       })
       }
   },[])

  return (
    <div>
       {
        loading ? (
         <>
          <Loading/>
         </>
         ) :
         <div className='px-2 mt-4'>
            {/* stick navbar */}
            <div className="">
                <h6 className="text-4xl mb-4">My Category</h6>
            </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                     {
                        categories.map((category)=>{
                           return  <Link to={`/category/${category.id}`} className="max-w-sm md:mt-4  overflow-hidden" key={category?.id}>
                           <div className="flex flex-col gap-y-1 ">
                               <img src={category?.icons[0].url} alt="" className='object-fit h-44 rounded-sm'/>
                               <p>{category.name}</p>
                           </div> 
                        </Link>
                        })
                     }
                                  
              </div> 
         </div>
       }
    </div>
  )
}

export default Categories