import React from 'react'

// component
import Releases from '../Releases/Releases'
import Row from '../Row/Row'
import Category from '../Category/Category'
import FeaturedPlayList from '../FeaturePlaylist/FeaturePlaylist'
import Albums from '../Albums/Albums'


const Content = () => {
 
  return (
    <div className='relative w-full'
    style={{
      background:`linear-gradient(to bottom left, rgba(255,255,255,0.1) , #222222 25%)`
  }} 
      >
        <Releases/>
        <Row/> 
        <Category  /> 
        <FeaturedPlayList/>
        <Albums/>
    </div>
  )
}

export default Content