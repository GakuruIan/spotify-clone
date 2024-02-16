import React from 'react'
import { Link } from 'react-router-dom'

const LinkText = ({text,Icon,spacing_sm}) => {
  return (
    <Link className={`flex items-center group gap-x-3 py-2  hover:bg-light pl-2 rounded-sm mb-${spacing_sm ? '2' : '4'}`}>
        {Icon &&  <Icon className="text-xl group-hover:text-spotify-900"/>}
        <span>{text}</span> 
    </Link>
  )
}

export default LinkText