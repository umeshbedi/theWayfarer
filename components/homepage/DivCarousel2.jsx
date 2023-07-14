import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import style from '@/styles/Home.module.scss'

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { sliderImages } from '../localdb';
import Image from 'next/image';
import { ArrowRightOutlined } from '@ant-design/icons';
import Title from './Title';
import { mobile } from '../variables';



export default function DivCarousel({ lightHead, darkHead, backgroundImage, sliderContent, button }) {

    const [containerStyle, setContainerStyle] = useState({ width: "90%" })
    const [subHeadStyle, setsubHeadStyle] = useState({ display: 'flex' })
    const [sliderStyle, setSliderStyle] = useState({ width: '100%' })
    const [titleStyle, setTitleStyle] = useState({})

    const [activeIndex, setActiveIndex] = useState(0)

    const [buttonFocus, setButtonFocus] = useState(false)

    const slideRef = useRef()
    const containerRef = useRef()

    // console.log(activeIndex)
    const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
    
  }, [isMobile])
  

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                marginBottom: "3.5rem",
                
            }}
        >
            <div 
            data-aos="fade-up"
            data-aos-duration="2000"
            style={{marginLeft:isMobile?"2.5rem":"4.5rem"}}>
                <Title red={"Sustain"} blue={"ability"}/>
            </div>
            <div
                style={{ width: '100%', position: 'relative' }}
            >

                {/* for carousel */}
                <div
                    style={sliderStyle}
                    id='hompagebigslider'
                >
                    <Swiper
                        style={{ "--swiper-navigation-color": "#fff", padding:isMobile?"0 20px":"0 30% 0 0" }}
                        ref={slideRef}
                        // effect={"coverflow"}
                        grabCursor={true}
                        navigation={isMobile?false:true}
                        modules={[Pagination, Navigation]}
                        // centeredSlides={center}
                        slidesPerView={isMobile?2:3}
                        spaceBetween={isMobile?10:30}
                        loop={true}
                        
                       
                    >
                        {sliderImages.map((item, index) => (
                            <SwiperSlide 
                            className='singleSwiper'
                            style={{ width: isMobile?"100%":"30%", height: isMobile?"70vh":460, transition:"width 1s ease",  }} key={index}>
                                <div style={{ height: 460 }}>
                                    <Image src={item.thumbnail} alt={item.name} fill style={{ objectFit: 'cover', borderRadius: 50, position: 'absolute', zIndex: -1 }} />
                                    <div style={{position:'absolute',bottom:0, background:"linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)", width:'100%', borderRadius:"0 0 50px 50px", padding:40}}>
                                    <h1 style={{
                                        color: 'white',
                                        fontWeight: 800,
                                        fontSize: isMobile?"1.6rem":"2rem",
                                        // background:'yellow',
                                        marginBottom:10,
                                        transition:"font-size 1.5s"
                                    }}
                                    >
                                        Outdoor Nature
                                    </h1>
                                    <p className='paragraph' style={{fontWeight:400, fontSize:"1.2rem", color:'white', display:'none'}}>Become an Explorer of Magninficant nature</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
