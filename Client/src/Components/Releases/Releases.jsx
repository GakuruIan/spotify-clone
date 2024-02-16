import React from 'react'

import pic from '../../assets/two.png'
import ReleaseTemplate from '../LoadingTemplate/ReleaseTemplate'

const Releases = () => {
  let items = [1,2,3,4]
  return (
        
    <ReleaseTemplate/>
    // <div className='py-4 px-2 md:px-0'>
    //     <h6 className="text-xl mb-4">New Releases</h6>
    //      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
    //       {
    //         items.map((item)=>{
    //           return   <div className="flex  gap-x-2 bg-dark-700 p-2 rounded-md" key={item}>
    //               <img src={pic} className='h-20 w-20 object-cover rounded-sm'/>
    //               <div className="">
    //                   <p className="text-base">Title</p>
    //                   <p className="text-sm text-gray-400">Tracks: 40</p>
    //               </div>
    //       </div>
    //         })
    //       }
              
    //      </div>
    // </div>
  )
}

export default Releases