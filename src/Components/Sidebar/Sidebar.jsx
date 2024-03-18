import React,{useContext,useState,useEffect} from 'react'
// Component
import LinkText from '../Link/LinkText';

// icons
import { CiHome } from "react-icons/ci";
import { IoRocketOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { PiFoldersLight } from "react-icons/pi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { GoHistory } from "react-icons/go"
import { AiOutlineShareAlt } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { MdOutlineCreateNewFolder } from "react-icons/md";

// context 
import {MenuContext} from "../../Context"

// spotify
import SpotifyWebApi from 'spotify-web-api-js';

// redux
import { useSelector } from 'react-redux';

const Sidebar = () => {
  
 const {isOpen,toggleMenu} = useContext(MenuContext)
 const [playlist,setPlayList] =  useState([])
 const SpotifyWeb = new SpotifyWebApi();
 const user = useSelector(state => state.user.currentuser)

 useEffect(()=>{

    if(user){
        SpotifyWeb.setAccessToken(user.token)
        SpotifyWeb.getUserPlaylists({limit:5})
        .then((data)=>{
            setPlayList(data.items)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

 },[])

  return (
      <div className={`fixed transition-all ease-in-out duration-700 w-full  z-40 lg:left-0 md:relative min-h-screen bg-dark-100 md:w-0 lg:w-56 ${isOpen ? 'left-[0px] ': 'left-[-1000px]'}`}>
        <div className={`fixed w-full lg:w-56 ${isOpen ? 'md:w-56 bg-dark-100 min-h-screen' : ''}`}>

        <div className="px-2 py-2">
            <header className=" relative my-2 py-2 flex items-center justify-between w-full">
                <h6 className="text-xl text-center">Groove Party</h6>

                <span className='group p-1 block lg:hidden hover:cursor-pointer border-2 border-gray-400 rounded-full hover:border-spotify-900' onClick={()=>toggleMenu(false)}>
                    <MdClose className='group-hover:text-spotify-900'/>
                </span>
            </header>

            <div className="pl-2 mb-4">
                <h6 className="text-base mb-2 text-gray-400">Menu</h6>
                <div className="pl-1">
                     <LinkText Icon={CiHome} text="Home"/>
                     <LinkText Icon={IoRocketOutline} text="Explore"/>
                     <LinkText link={'/search'} Icon={CiSearch} text="Search"/>
                     <LinkText Icon={IoSettingsOutline} text="Settings"/>
                </div>
            </div>

            <div className="pl-2 mb-4">
                <h6 className="text-base mb-2 text-gray-400">Your music</h6>
                <div className="pl-1">
                    <LinkText link={`/me/playlist`} Icon={PiFoldersLight} text="Playlist"/>
                    <LinkText Icon={MdOutlineFavoriteBorder} text="Favorite"/>
                    <LinkText Icon={GoHistory} text="History" />
                    <LinkText Icon={AiOutlineShareAlt} text="Share"/>
                </div>
            </div>

            <div className="pl-2 mb-4">
                <h6 className="text-base mb-2 text-gray-400">Playlist</h6>
                <div className="pl-1">
                    {
                        playlist.length > 0 ? (
                            playlist.map((item)=>{
                             return <LinkText link={`/playlist/${item.id}`} key={item.id} text={item.name}/>
                            })
                         ):
                         (
                            <> 
                                <button className="group rounded-sm px-2 py-2 text-center  bg-spotify-100 w-full mt-4 flex items-center justify-center gap-x-2 transition-all delay-200 hover:bg-[rgba(255,255,255,0.15)]">
                                    <MdOutlineCreateNewFolder className='text-xl transition-all delay-200 group-hover:text-spotify-900'/>
                                    Create Playlist
                                </button>
                            </>
                        )
                    }
                    
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Sidebar