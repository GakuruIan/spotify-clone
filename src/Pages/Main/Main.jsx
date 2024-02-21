import React,{useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar'

import {useSelector} from 'react-redux'

const Main = () => {
  const user = useSelector(state=>state.user)

   useEffect(()=>{
      if(!user.currentuser){
        window.location.href = '/login'
      }
   },[user.currentuser])
 
  return (
    <div className='min-h-screen bg-dark-200 w-full'>
       <div className="flex relative">
          <Sidebar/>

          <div className="flex-1 w-full relative">
            <Outlet/>
          </div>
          
       </div>
    </div>
  )
}

export default Main