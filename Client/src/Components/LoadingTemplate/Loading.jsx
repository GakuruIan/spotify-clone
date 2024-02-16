import React from 'react'

const Loading = () => {
    const items = [1,2,3,4]
  return (
    <div className='animate-pulse '>
        <div className="w-full flex items-center justify-between pr-2">
           <h6 className="h-3 w-24 ml-2 my-3 rounded-sm bg-dark-800"></h6>
           <p className="h-2 w-24 ml-2 my-3 rounded-sm bg-dark-800"></p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">

         {
            items.map((item)=>{
                return  <div key={item} className="max-w-sm  mt-2 px-2 overflow-hidden" >
                    <div>
                        <div className='h-44 w-full bg-dark-800 rounded-sm'>
                            {/* image */}
                        </div>
                        <p className='h-2 w-20 mt-3 rounded-sm bg-dark-800'>
                            {/* artist name */}
                        </p>
                    </div> 
               </div>
            })
         }
        

           
        </div>
    </div>
  )
}

export default Loading