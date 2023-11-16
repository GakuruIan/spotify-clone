import React from 'react'
import Row from '../Row/Row'
import Topbar from '../TopBar/Topbar'

const Content = () => {
  return (
    <div className='relative w-full'>
        <Topbar/>
        <Row title="Top artist"/>
        <Row title="Top Album"/>
        <Row title="Genre"/>
    </div>
  )
}

export default Content