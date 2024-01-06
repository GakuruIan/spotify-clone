import React from 'react'
import Releases from '../Releases/Releases'
import Row from '../Row/Row'
import Topbar from '../TopBar/Topbar'

const Content = () => {
  return (
    <div className='relative w-full'
    style={{
      background:`linear-gradient(to bottom left, rgba(255,255,255,0.1) , #222222 25%)`
  }} 
      >
        <Topbar/>
        <Releases/>
        <Row title="Top artist"/>
        <Row title="Top Album"/>
        <Row title="Genre"/>
    </div>
  )
}

export default Content