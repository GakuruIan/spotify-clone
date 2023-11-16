import React,{useEffect,useState} from 'react'

import pic from '../../assets/one.png'
import pic2 from '../../assets/two.png'
import pic3 from '../../assets/three.png'

const Landing = () => {
   const[image,setImage]= useState(null)
   const images = [pic,pic2,pic3]

   useEffect(()=>{
     let num = Math.floor(Math.random() * images.length)
     setImage(images[num])
   },[])

   
  return (
   <div className='relative h-screen bg-dark-800  flex items-center justify-center'>
      <img src={image} className='bg-center bg-no-repeat h-full w-full object-cover mix-blend-overlay'/>
        <div className='absolute  inset-y-1/2  flex flex-col gap-2 justify-center items-center'>
          <h1 className="text-5xl md:text-7xl mb-4 text-center"> <span className='text-spotify-900'>Groove</span> Party</h1>
          <p className="text-base md:text-xl text-center mb-4"> Unveiling Today's Chart-Topping Beats!</p>
          <button className="px-4 py-2 text-base border border-spotify-900 w-full  hover:bg-spotify-900">Login</button>
        </div>
   </div>
  )
}

export default Landing