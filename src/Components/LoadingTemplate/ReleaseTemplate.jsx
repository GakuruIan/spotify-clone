import React from 'react'

const ReleaseTemplate = () => {
    const items = [1,2,3,4]
  return (
    <div className='animate-pulse '>
         <h6 className="h-3 w-24 ml-2 my-3 rounded-sm bg-dark-800"></h6>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">

         {
            items.map((item)=>{
                return  <div key={item} className="max-w-sm  mt-2 px-2 overflow-hidden" >
                    <div>
                        <div className='h-20 w-full bg-dark-800 rounded-sm'>
                            {/* content */}
                        </div>
                    </div> 
               </div>
            })
         }
        

           
        </div>
    </div>
  )
}

export default ReleaseTemplate