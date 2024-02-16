import React,{useContext} from 'react'
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

// context 
import {MenuContext} from "../../Context"

const Sidebar = () => {
  
 const {isOpen,toggleMenu} = useContext(MenuContext)

  return (
      <div className={`fixed transition-all ease-in-out duration-700 w-full  z-40 lg:left-0 md:relative min-h-screen bg-dark-100 md:w-0 lg:w-56 ${isOpen ? 'left-[0px] ': 'left-[-1000px]'}`}>
        <div className={`fixed lg:w-56 ${isOpen ? 'md:w-56 bg-dark-100 min-h-screen' : ''}`}>

        <div className="px-2 py-2">
            <header className=" relative my-2 py-2 flex items-center justify-between">
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
                     <LinkText Icon={CiSearch} text="Search"/>
                     <LinkText Icon={IoSettingsOutline} text="Settings"/>
                </div>
            </div>

            <div className="pl-2 mb-4">
                <h6 className="text-base mb-2 text-gray-400">Your music</h6>
                <div className="pl-1">
                    <LinkText Icon={PiFoldersLight} text="Playlist"/>
                    <LinkText Icon={MdOutlineFavoriteBorder} text="Favorite"/>
                    <LinkText Icon={GoHistory} text="History" />
                    <LinkText Icon={AiOutlineShareAlt} text="Share"/>
                </div>
            </div>

            <div className="pl-2 mb-4">
                <h6 className="text-base mb-2 text-gray-400">Playlist</h6>
                <div className="pl-1">
                    <LinkText  text="Rhumba"/>
                    <LinkText  text="OldSkul Hiphop"/>
                    <LinkText  text="Kenyan 2000s" />
                    <LinkText  text="Afrobeats"/>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Sidebar