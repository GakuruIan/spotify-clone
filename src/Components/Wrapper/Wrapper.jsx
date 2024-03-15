import React,{useEffect,useState} from 'react'


const Wrapper = ({data}) => {

    useEffect(()=>{
       
    },[])
  return (
    <>
         <div className='flex md:items-center h-64 md:h-96 gap-x-4 py-4 px-2' 
          style={{
            background:`linear-gradient(to bottom, rgba(239, 239, 238,0.15),rgba(239, 239, 238,0.1),rgba(239, 239, 238,0.05), #222222 )`
        }} >
          {
            data && data?.images && <img src={data?.images[0]?.url} className='h-52 md:h-60 w-40 md:w-44 object-cover rounded-sm'/>
          }
              <div className="">
                   <h6 className="text-3xl md:text-7xl mb-2">{data.name}</h6>

                   {
                    data.description && <>
                        <p className='text-base'>{data.description}</p>
                      </>
                   }
                   
                   {/* information about the item */}
                   <div className='flex items-center flex-wrap gap-y-1 gap-x-2 mb-2 md:ml-2'>
                    {
                      data?.label &&  <>
                            <div className="flex items-center gap-x-1 md:gap-x-2">
                              <small className='text-sm md:text-base text-gray-300'>Label :</small>
                              <span className="text-sm md:text-base text-gray-300">{data?.label}</span>
                            </div>
                      </>
                    }

                      {
                          data?.popularity &&  
                          (<div className="flex items-center gap-x-1">
                              <small className='text-sm md:text-base text-gray-300'>Popularity:</small>
                              <span className="text-sm md:text-base text-gray-300">{data?.popularity}</span>
                           </div>)
                      }
                     
                   </div>

                   {/* genres */}
                   <div className="md:ml-2">
                    <h6 className="text-base mb-1">Genres</h6>
                      <div className="flex flex-wrap gap-y-1 items-center gap-2">
                        {
                            data.genres &&  data?.genres.map((genre,index)=>{
                              return <span key={index} className='text-sm md:text-base text-gray-400 hover:cursor-pointer hover:underline'>{genre}</span>
                            })
                        }
                      </div>
                   </div>
              </div>
            </div>
    </>
   
  )
}

export default Wrapper