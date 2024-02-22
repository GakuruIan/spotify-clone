import React,{useState,useEffect} from 'react'

// components
import Loading from '../LoadingTemplate/Loading'

// spotify
import SpotifyWebApi from 'spotify-web-api-js'

// icons
import { MdOutlineCreateNewFolder } from "react-icons/md";


const Albums = () => {
  const [loading,setLoading] = useState()
  const [albums,setAlbums] = useState([])

  const SpotifyApi = new SpotifyWebApi()
  useEffect(()=>{
    setLoading(true)
    SpotifyApi.getMySavedAlbums({
      limit:3
    })
    .then((response)=>{
       setAlbums(response.items)
       setLoading(false)
    })
    .catch((err)=>{
      if(err.status === 401){
        console.log(err.status)
        setLoading(false)
      }
    })
  },[])
  return (
    <div className='py-4 px-2 md:px-0'>
        {
          loading ? (<Loading/>) :
          <>
            <div className="w-full flex items-center justify-between pr-2">
                  <h6 className="text-xl mb-4">Saved Albums</h6> 
            </div>
            {
              albums.length === 0 ? 
              (
              <div className='px-2'>
                <div className="group bg-dark-800 w-36 h-40 md:h-56 flex  flex-col gap-y-4 items-center justify-center transition duration-300 ease-in hover:bg-dark-900 hover:cursor-pointer">
                    <span className='p-2 bg-[rgba(225,255,255,0.2)] rounded-full'>
                      <MdOutlineCreateNewFolder className='text-xl'/>
                    </span>
                    <p className="text-base">Create Album</p>
                </div>
              </div>
              )
               :
              <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {
                      albums.map((album)=>{
                          return  <div className="max-w-sm  mt-5 px-2 overflow-hidden" key={album?.id}>
                          <div className="flex flex-col gap-y-1 ">
                              <img src={album?.images[0].url} alt="" className='object-fit h-44 rounded-sm'/>
                              <p>{album.name}</p>
                          </div> 
                      </div>
                      })
                    }
                             
                    </div>  
              </>
            }
          </>
        }
    </div>
  )
}

export default Albums