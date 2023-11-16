import React,{useRef} from 'react'

import pic from '../../assets/two.png'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Row = ({url,title}) => {

    const SliderRef = useRef(null)

    const slides = [1,2,3,4,1,2,3,4]

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        arrows:false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
          ]
      };

  return (
    <div className='py-4 px-2 md:px-0'>
        <h6 className="text-xl mb-4">{title}</h6>

            <div className="md:w-[calc(100vw-200px)]">
                <Slider ref={SliderRef} {...settings} className=" px-0 ">
                        {
                            slides.map((slide,key)=>{

                                return <div className="max-w-sm  mt-5 px-2 overflow-hidden" key={key}>
                                    <div className="flex flex-col gap-y-1 " key={key}>
                                        <img src={pic} alt="" className='object-fit h-44 rounded-sm'/>
                                        <p>artist name</p>
                                    </div> 
                                </div>
                            })
                        }
                </Slider>
 
            </div>
          
    </div>
  )
}

export default Row