import React from "react";

// react router dom
import { Link } from "react-router-dom";

// image
import not1 from '../../assets/404.png'


const NotFound =()=>{
    return <>
      <div className="h-screen w-full flex items-center justify-center flex-col gap-y-10 bg-dark-200">
             <img src={not1} alt="" srcset="" className="h-96 w-96 object-fit"/>
              <h6 className="text-center text-4xl">Page not Found</h6>
              <Link to="/" className="px-4 py-2 text-base text-center border border-spotify-900 w-64  hover:bg-spotify-900">Go home</Link>
      </div>
    </>
}

export default NotFound