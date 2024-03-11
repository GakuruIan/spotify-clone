import React,{useState,useContext,useEffect} from 'react'
// images
import nophoto from '../../assets/nophoto.png'

// components
import LinkText from '../Link/LinkText';

// icons
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { PiFoldersLight } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci"

// Context
import { MenuContext } from '../../Context';

// redux
import {persistor} from '../../Redux/Store'
import { logout } from '../../Redux/UserReducer';
import { useDispatch ,useSelector} from 'react-redux';

import { Link } from 'react-router-dom';

const Topbar = () => {
    const[isopen,setIsOpen] =  useState(false)
    const[currentUser,setCurrentUser] = useState({})
    const [search,setSearch] = useState("")

    
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.user)
    
    useEffect(() => {
       setCurrentUser(user.currentuser)

    }, [currentUser]);

    const {toggleMenu} = useContext(MenuContext)

    const Logout = ()=>{
      dispatch(logout())
      persistor.purge()
    }
    
   
  return (

    
    <div className='sticky top-0 z-30 flex-1 w-full '
    style={{
          background:`linear-gradient(to left, #292929 , #222222 65%)`
      }} 
    >
        <div className="py-2 px-2  md:px-4 w-full flex items-center justify-between md:justify-end">
            {/* menu */}
             <span className='group mr-2 hover:cursor-pointer block lg:hidden' onClick={()=>toggleMenu(true)}>
                <CiMenuFries className='text-xl group-hover:text-spotify-900'/>
             </span>
             {/* search bar */}

              <div className="flex items-center gap-x-2">
                  
              <Link to='/search' className="">
                <CiSearch className='text-xl'/>
              </Link>

              <div className="relative flex gap-x-2 flex-col items-center">

                    <button onClick={()=>setIsOpen(!isopen)} id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" className="text-white    font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 text-center inline-flex items-center" type="button">
                          
                          {
                            currentUser?.images?.length > 0 ?
                            (<img src={currentUser?.images[0]} className='object-fit w-7 h-7 rounded-full'/>)
                            : 
                            (<img src={nophoto} className='object-fit w-7 h-7 rounded-full'/>)
                          }
                          

                          {/* image */}
                          <span className='mx-2 hidden md:block'>{currentUser?.display_name}</span>

                          <svg className="w-2.5 h-2.5 ml-3 md:ms-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                    </button>

                    <div id="dropdownDivider" className={`absolute shadow-lg z-50 bg-dark-400 top-14 right-0 divide-y divide-gray-100 rounded-lg  w-44 divide-gray-600 transition duration-75 ${isopen ? 'block' :'hidden'}`}>
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                            <li>
                                <LinkText Icon={CiUser} text={`Profile (${currentUser?.display_name})`} spacing_sm/>
                            </li>
                            <li>
                              <LinkText Icon={IoSettingsOutline} text="Settings" spacing_sm/>
                            </li>
                            <li>
                              <LinkText Icon={PiFoldersLight} text="Playlist" spacing_sm/>
                            </li>
                        </ul>
                        <div className='py-1'>
                            <span onClick={()=>Logout()}>
                              <LinkText Icon={IoIosLogOut} text="Logout" spacing_sm />
                            </span>
                        </div>
                    </div>
                    </div>

              </div>
             
           
        </div>
    </div>
  )
}

export default Topbar