import React,{useState} from 'react'

import pic from '../../assets/one.png'

import LinkText from '../Link/LinkText';

// icons
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { PiFoldersLight } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";

const Topbar = () => {
    const[isopen,setIsOpen] =  useState(false)


  return (
    <div className='flex-1 mt-2 w-full'>
        <div className="py-2 px-2 md:px-4 w-full flex items-center justify-between">
            <form action="" className="flex gap-x-2 bg-light md:w-1/2 pl-2 pr-4 rounded-sm">
                <input type="text" className="w-full bg-transparent px-2 py-2 outline-none placeholder:text-gray-400" placeholder='search by song or artist'/>
                <button className='px-2'><CiSearch/></button>
            </form>
            <div className="relative flex gap-x-2 flex-col items-center">

                <button onClick={()=>setIsOpen(!isopen)} id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" className="text-white    font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
                       <img src={pic} className='object-fit w-7 h-7 rounded-full'/>
                       <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                </button>

                <div id="dropdownDivider" className={`absolute shadow-lg z-10 bg-dark-400 top-14 right-0 divide-y divide-gray-100 rounded-lg  w-44 divide-gray-600 transition duration-75 ${isopen ? 'block' :'hidden'}`}>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                        <li>
                            <LinkText Icon={CiUser} text="Profile" spacing_sm/>
                        </li>
                        <li>
                           <LinkText Icon={IoSettingsOutline} text="Settings" spacing_sm/>
                        </li>
                        <li>
                           <LinkText Icon={PiFoldersLight} text="Playlist" spacing_sm/>
                        </li>
                     </ul>
                    <div className='py-1'>
                        <LinkText Icon={IoIosLogOut} text="Logout" spacing_sm/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Topbar