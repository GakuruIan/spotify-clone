import React,{useEffect,useState} from 'react'

import { colors } from '../../Spotify-Helpers/Spotify-helpers'

const Wrapper = ({children}) => {

    const [color,setColor] = useState("")

    useEffect(()=>{
        let colorIndex =  Math.floor((Math.random()*colors.length))
        setColor(colors[colorIndex])
    },[])
  return (
    <div className='h-full w-full relative' 
          style={{
            background:`linear-gradient(to bottom, ${color} , #222222 45%)`
        }} >
        {children}
    </div>
  )
}

export default Wrapper