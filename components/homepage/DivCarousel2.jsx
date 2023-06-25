import Link from 'next/link'
import React, { useRef, useState } from 'react'
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



export default function DivCarousel({ lightHead, darkHead, backgroundImage, sliderContent, button }) {

    const [containerStyle, setContainerStyle] = useState({ width: "90%" })
    const [subHeadStyle, setsubHeadStyle] = useState({ display: 'flex' })
    const [sliderStyle, setSliderStyle] = useState({ width: '100%' })
    const [titleStyle, setTitleStyle] = useState({})

    const [activeIndex, setActiveIndex] = useState(0)

    const [buttonFocus, setButtonFocus] = useState(false)

    const slideRef = useRef()
    const containerRef = useRef()

    console.log(activeIndex)

    return (
        <div
            ref={containerRef}
            style={{
                ...containerStyle,
                // backgroundColor: 'grey',
                float: 'right',
                // height:400,
                // background:'red'
                // marginLeft: 100,
                position: 'relative',
                marginBottom: "3.5rem"
            }}
        >
            <div style={{...titleStyle}}>
                <Title red={"Sustainability"}/>
            </div>
            <div
                style={{ width: '100%', position: 'relative' }}
            >

                {/* for carousel */}
                <div
                    style={sliderStyle}

                >
                    <Swiper
                        style={{ "--swiper-navigation-color": "#fff"}}
                        ref={slideRef}
                        effect={"coverflow"}
                        grabCursor={true}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        // centeredSlides={center}
                        slidesPerView={"auto"}
                        spaceBetween={30}
                        // loop={true}
                        onSlideChange={(e) => {
                            setActiveIndex(e.activeIndex)
                            console.log(e)
                            if (e.activeIndex > 0) {
                                setContainerStyle({ width: '100%'})
                                setTitleStyle({marginLeft:"4.5rem"})
                            } else {
                                setContainerStyle({ width: '90%'})
                                setTitleStyle({})
                            }
                        }}
                    >
                        {sliderImages.map((item, index) => (
                            <SwiperSlide style={{ width: 600, height: 460, transition:"width .5s",  }} key={index}>
                                <div style={{ height: 460 }}>
                                    <Image src={item.thumbnail} alt={item.name} fill style={{ objectFit: 'cover', borderRadius: 50, position: 'absolute', zIndex: -1 }} />
                                    <div style={{position:'absolute',bottom:0, background:"linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)", width:'100%', borderRadius:"0 0 50px 50px", padding:40}}>
                                    <h1 style={{
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: "2.5rem",
                                        // background:'yellow',
                                        marginBottom:10
                                    }}
                                    >
                                        Outdoor Nature
                                    </h1>
                                    <p style={{fontWeight:400, fontSize:"1.2rem", color:'white'}}>Become an Explorer of Magninficant nature</p>
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
