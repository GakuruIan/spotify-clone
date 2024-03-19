import React,{useState,useEffect} from 'react'

import SpotifyWebApi from 'spotify-web-api-js'
import { useSelector } from 'react-redux'

import { CiSearch } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { IoHeartOutline } from "react-icons/io5"
import { CiTimer } from "react-icons/ci"

import Spinner from '../../Components/LoadingTemplate/Spinner.jsx';

const Search = () => {
  const [search,setSearch] = useState("")
  const [tracks,setTracks] = useState([])
  const [isMobile,setIsMobile] = useState(false)
  const [notfound,setnotFound] = useState(false)
  const [loading,setLoading] = useState(false)

  const user = useSelector(state=>state.user.currentuser)
  const SpotifyWeb = new SpotifyWebApi()

  const handleResize = ()=>{
    setIsMobile(window.innerWidth < 768)
  }

  useEffect(()=>{

    if(user){
        SpotifyWeb.setAccessToken(user.token)
    }

    window.addEventListener('resize', handleResize);

    handleResize()

    return () => {
     window.removeEventListener('resize', handleResize);
   };
    
  },[tracks])

  const getMinutes = (durationInMilliseconds) =>{
    const totalSeconds = durationInMilliseconds / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    return minutes
  }

  const getSeconds = (durationInMilliseconds) =>{
      const totalSeconds = durationInMilliseconds / 1000;
      let seconds = Math.floor(totalSeconds % 60);
      if(seconds< 10){
          seconds = "0" +seconds
      }

      return seconds
  }

  const handleSearch = (e)=>{
    e.preventDefault();
    setLoading(true)
     if(search !== ""){
        SpotifyWeb.searchTracks(search,{limit:20})
        .then((data)=>{
            setTracks(data.tracks.items)
            setLoading(false)
            console.log(data.tracks.items)
        })
        .catch((err)=>{
            setLoading(false)
            console.log(err)
        })
      }
  }
 
  return (
    <div>
         <div className="mt-2 px-2">
            <form onSubmit={handleSearch} className="flex gap-x-2 bg-light mb-4 md:w-1/2 pl-2 pr-4 rounded-sm">
                      <input type="text"  onChange={(e) => setSearch(e.target.value)} name='query' className="w-full bg-transparent px-2 py-2 outline-none placeholder:text-gray-400" placeholder='search by song or artist'/>
                      <button type='submit' className='px-2'><CiSearch/></button>
            </form>

            {
              tracks.length > 0 ?

              (
                <>
                    {
                      loading ? <Spinner/> :
                       (
                        
                          isMobile ? (
                          <div className="mt-2 px-2 md:mx-4">
                            {
                                tracks.map((item)=>{
                                  return   <div className="flex items-center gap-x-3 mb-2 hover:bg-light hover:cursor-pointer py-2 px-1" key={item.id}>
                                  <span>
                                    < CiPlay1 className='text-[20px] text-spotify-900'/>
                                  </span>
    
                                    <div className="">
                                          {
                                            item.album.images && <img className='h-12 w-12 object-fit' src={item.album.images[0].url} alt="" />
                                          }
                                    </div>
                                  <div className="flex flex-col flex-1">
                                    <h6 className="text-base mb-1">{item?.name}</h6>
    
                                    <div className="flex items-center flex-wrap gap-x-1">
                                      {
                                        item.artists.map((artist)=>{
                                          return <p  className='text-sm text-[rgba(255,255,255,0.4)]' key={artist.id}>{artist.name} </p>
                                        })
                                      }
                                    </div>
                                  </div>
              
                                  <span>
                                    < IoHeartOutline className='text-[20px] text-spotify-900'/>
                                  </span>
                              </div>
                                })
                            }
                            
                          </div>
                          ) 
                          
                          :
    
                          <div className="px-2 md:mx-4">
                              <div className="relative overflow-x-auto">
                                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                      <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                                          <tr>
                                              <th scope="col" className="px-6 py-3">
                                                  #
                                              </th>
                                              <th scope="col" className="px-6 py-3">
                                                  Cover 
                                              </th>
                                              <th scope="col" className="px-6 py-3">
                                                  Song 
                                              </th>
                                              <th scope="col" className="px-6 py-3">
                                                
                                              </th>
                                              <th scope="col" className="px-6 py-3">
                                                  Artist
                                              </th>
                                              <th scope="col" className="px-6 py-3">
                                                Popularity
                                              </th>
    
                                              <th scope="col" className="px-6 py-3">
                                                  <span>
                                                    <CiTimer className='text-spotify-900 text-[18px]'/>
                                                  </span>
                                              </th>
    
                                          </tr>
                                      </thead>
                                      <tbody>
                                        {
                                        tracks?.map((item,index)=>{
                                            return <tr onClick={()=>handlePlay()} className="hover:cursor-pointer hover:bg-light" key={item.id}>
                                                  <td className="px-6 py-4">
                                                      {index + 1}
                                                  </td>
                                                  <td scope="row" className="flex items-center gap-x-1 px-6 py-4 font-medium whitespace-nowrap text-white">
                                                          {
                                                            item.album.images && <img className='h-12 w-12 object-fit' src={item.album.images[0].url} alt="" />
                                                          }
                                                      {item?.name}   
                                                  </td>
                                                  <td>
                                                        <span>
                                                          < IoHeartOutline className='text-[20px] text-spotify-900'/>
                                                      </span>
                                                  </td>
                                                  <td className="px-6 py-4 ">
                                                    <div className="flex items-center flex-wrap gap-x-1">
                                                      {
                                                        item.artists.map((artist)=>{
                                                          return <span className='text-base' key={artist.id}>{artist.name} </span>
                                                        })
                                                      }
                                                    </div>
                                                    
                                                  </td>
                                                  <td className="px-6 py-4 text-center">
                                                    {item.popularity}
                                                  </td>
                                                  
                                              </tr>
                                          })
                                        }
                                          
    
                                      </tbody>
                                  </table>
                              </div>
                            </div>
                        
                       )
                    }
                    
                </>
              ) :

              (
              <>
               {notfound ? <p className='text-base md:text-xl'>no tracks found</p> : <p className='text-base md:text-xl'>Browse for songs</p>}
              </>
              )
            }
              
         </div>
    </div>
  )
}

export default Search