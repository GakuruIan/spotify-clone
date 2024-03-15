import React,{useState,useEffect} from 'react'

// react router
import { Link, useParams } from 'react-router-dom'

// spotify
import SpotifyWebApi from 'spotify-web-api-js'
import { colors } from '../../Spotify-Helpers/Spotify-helpers'

// components
import Wrapper from '../../Components/Wrapper/Wrapper'
import Spinner from '../../Components/LoadingTemplate/Spinner'
// icons
import { IoHeartOutline } from "react-icons/io5"
import { IoIosRemoveCircleOutline } from "react-icons/io"
import { CiTimer } from "react-icons/ci"

//redux
import { useSelector } from 'react-redux'


// notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// spotify  helpers
import { handlePlay } from '../../Spotify-Helpers/Spotify-helpers'

const Artist = () => {

  const user = useSelector(state=>state.user.currentuser)

   const SpotifyWeb = new SpotifyWebApi()
   const [artist,setArtist] = useState({})
   const [tracks,setTracks]= useState([])
   const [albums,setAlbums] = useState([])
   const [Following,setFollowing] = useState(false)
   const [loading,setLoading] = useState(false)

   const [relatedArtists,setRelatedArtists] = useState([])
   const [color,setColor] = useState("")

   const artistId = useParams().id;
     
   if(user){
    SpotifyWeb.setAccessToken(user.token)
   }

   const FetchArtistData = async (artistId) => {
    try {
      const artistResponse = await SpotifyWeb.getArtist(artistId);
      setArtist(artistResponse);
  
      const following = await SpotifyWeb.isFollowingArtists([artistId]);
      if (following[0] === true) {
        setFollowing(true);
      }
  
      const topTracksResponse = await SpotifyWeb.getArtistTopTracks(artistId, 'KE');
      setTracks(topTracksResponse.tracks);
  
      const albumsResponse = await SpotifyWeb.getArtistAlbums(artistId, { limit: 5, offset: 1 });
      setAlbums(albumsResponse.items);
  
      const relatedArtistsResponse = await SpotifyWeb.getArtistRelatedArtists(artistId, { limit: 5 });
      setRelatedArtists(relatedArtistsResponse.artists.slice(0, 5));

      setLoading(false)
    } catch (err) {

      setLoading(false)
      toast.error("An error occurred ")
      const {error} = JSON.parse(err.responseText)

      toast.error(error.message)
    }
  };

   useEffect(()=>{
    let colorIndex =  Math.floor((Math.random()*colors.length))
    setColor(colors[colorIndex])
     
    setLoading(true)
    if(user){ 
      FetchArtistData(artistId)
     }
      
   },[artistId,Following])

   const FollowArtist = (id,name) =>{
        SpotifyWeb.followArtists([id])
        .then((response)=>{
          setFollowing(true)
          toast.success(`Following ${name}`)
           console.log(response)
        })
        .catch((err)=>{
             toast.error("An error occurred. Try again later")
              console.log(err)
        })
   }

   const UnfollowArtist=(id,name)=>{
         SpotifyWeb.unfollowArtists([id])
         .then((response)=>{
          setFollowing(false)
          toast.success(`Unfollowed ${name}`)
         })
         .catch((err)=>{
             console.log(err)
         })
   }
   

  return (
    <>
     {/* toast notification */}
        <ToastContainer
                    theme="colored"
          />
       {
        loading ? <Spinner text="Getting artist..."/> :
              <div className="pb-20">

             
            {
              artist && artist.images && artist.images.length > 0 && 
                <div className="relative h-full w-full ">
                  <div className="flex md:items-center h-64 md:h-96 gap-x-4 py-4 px-2"
                    style={{
                      background:`linear-gradient(to bottom, rgba(239, 239, 238,0.15),rgba(239, 239, 238,0.1),rgba(239, 239, 238,0.05), #222222 )`
                      }}  
                  >
                    <img src={artist?.images[0]?.url} className='h-52 md:h-60 w-40 md:w-44 object-cover rounded-sm'/>
                    <div className="">
                        <h6 className="text-[40px] md:text-9xl mb-2">{artist.name}</h6>
                        
                        {/* ratings and followers */}
                        <div className='flex items-center flex-wrap gap-y-1 gap-x-2 mb-2 md:ml-2'>
                            <div className="flex items-center gap-x-1 md:gap-x-2">
                                <small className='text-sm md:text-base text-gray-300'>Followers :</small>
                                <span className="text-sm md:text-base text-gray-300">{artist?.followers?.total}</span>
                            </div>
                            <div className="flex items-center gap-x-1">
                                  <small className='text-sm md:text-base text-gray-300'>Popularity:</small>
                                  <span className="text-sm md:text-base text-gray-300">{artist?.popularity}</span>
                            </div>
                        </div>

                        {/* genres */}
                        <div className="md:ml-2">
                          <h6 className="text-base mb-1">Genres</h6>
                            <div className="flex flex-wrap gap-y-1 items-center gap-2">
                              {
                                artist?.genres.map((genre,index)=>{
                                  return <span key={index} className='text-sm md:text-base text-gray-400 hover:cursor-pointer hover:underline'>{genre}</span>
                                })
                              }
                            </div>
                        </div>
                    </div>
                  </div>
                  
                {/* follow button and play buttton */}
                <div className="relative px-2 mb-4 py-2">
                  <div className="absolute top-0 right-5 pb-2">
                        {
                        Following ? (
                            <button
                              onClick={()=>UnfollowArtist(artist.id,artist.name)}
                              className=" px-2 py-1.5 text-base text-center bg-spotify-900 w-24  hover:bg-spotify-900">
                              Following
                            </button>
                          ) 
                          : 
                          (
                            <button
                                onClick={()=>FollowArtist(artist.id,artist.name)}
                                className=" px-2 py-1.5 text-base text-center border border-spotify-900 w-24  hover:bg-spotify-900">
                                Follow
                            </button>
                          )
                        }
                        
                  </div>
                </div>

                {/* top tracks */}


                <div className="px-2 bg-dark-200">
                      <h6 className="text-2xl mb-2">Top songs</h6>
                      
                      <div className="">

                          <div className="relative overflow-x-auto">
                              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                  <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                                      <tr>
                                          <th scope="col" className="px-2 py-3">
                                              #
                                          </th>
                                          <th scope="col" className="px-3 py-3">
                                              Song 
                                          </th>
                                          <th scope="col" className="px-3 py-3">
                                            
                                          </th>

                                          <th scope="col" className="px-3 py-3">
                                              <span>
                                                <CiTimer className='text-spotify-900 text-[18px]'/>
                                              </span>
                                          </th>

                                      </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      tracks.map((track)=>{
                                        return <tr onClick={()=> handlePlay(user.token)} className="group hover:cursor-pointer hover:bg-light" key={track.id}>
                                              <td className="px-2 py-4">
                                                  {track?.track_number}
                                              </td>
                                  
                                              <th scope="row" className="flex items-center gap-x-4 px-3 py-4 font-medium whitespace-nowrap text-white">
                                                <img src={track.album.images[0].url} className="h-8 w-8 object-fit" alt="" />
                                                <span> {track?.name} </span>
                                              </th>
                                              
                                              <td className=''>
                                                <span className='hidden transition-all duration-300 ease-in group-hover:block'>
                                                < IoHeartOutline className='text-[20px] text-spotify-900 '/> 
                                                </span>
                                              </td>

                                              <td className="px-3 py-4">
                                                  3:45
                                              </td>
                                          </tr>
                                      })
                                    }
                                      

                                  </tbody>
                              </table>
                          </div>

            </div>
                {/* songs table */}
                </div>

                {/* top tracks */}

                {/* artist album */}
                  <div className="px-4 mt-4 py-4">
                    <h6 className="text-2xl mb-2">Artist's Album</h6>

                    <div className="grid grid-cols-2 gap-y-2 md:gap-y-0 md:grid-cols-5 gap-x-2">
                        {
                            albums.map((album)=>{
                              return  <Link to={`/album/${album.id}`} key={album.id} className="rounded-lg group bg-dark-800  px-2 py-3 transition duration-300 ease-in hover:bg-dark-950 hover:cursor-pointer">
                                    <div className="flex items-center justify-center mb-2">
                                      <img src={album.images[0].url} alt="" className='h-40 w-full object-fit rounded-md'/>
                                    </div>
                                    <p className="text-base text-center mb-1">{album.name}</p>
                                    <p className='text-sm text-gray-300 text-center'>{album?.artists[0].name}</p>
                              </Link>
                            })
                          }
                    </div>
                  </div>
                  {/* artist album */}


                  {/* related artists */}
                  <div className="px-4 mt-4 py-4">
                    <h6 className="text-2xl mb-2">Related Artists</h6>

                      <div className="grid grid-cols-2 gap-y-2 md:gap-y-0 md:grid-cols-5 gap-x-2">
                        {
                            relatedArtists.map((relatedArtist)=>{
                              return  <Link to={`/artist/${relatedArtist.id}`} key={relatedArtist.id} className="rounded-lg group bg-dark-800  px-2 py-3 transition duration-300 ease-in hover:bg-dark-950 hover:cursor-pointer">
                                    <div className="flex items-center justify-center mb-2">
                                      <img src={relatedArtist.images[0].url} alt="" className='h-40 w-40 object-fit rounded-full'/>
                                  </div>
                                  <p className="text-base text-center mb-1 group-hover:underline group-hover:cursor-pointer">{relatedArtist.name}</p>
                                  <p className='text-sm text-gray-300 text-center capitalize'>{relatedArtist?.type}</p>
                            </Link>
                          })
                        }
                    </div>
                  </div>
                  {/* related artists */}

              </div>
            }
            
          </div>
       }
    </>
   
  )
}

export default Artist