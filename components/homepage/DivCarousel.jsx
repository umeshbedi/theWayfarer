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



export default function DivCarousel2({lightHead, darkHead, backgroundImage, sliderContent, button}) {

  const [containerStyle, setContainerStyle] = useState({ width: "90%", borderRadius: "100px 0 0 100px", })
  const [subHeadStyle, setsubHeadStyle] = useState({ display: 'flex' })
  const [sliderStyle, setSliderStyle] = useState({ width: '100%' })
  const [slides, setSlides] = useState(4.5)
  const [center, setcenter] = useState(true)

  const [buttonFocus, setButtonFocus] = useState(false)

  const slideRef = useRef()
  const containerRef = useRef()

  return (
    <div
      ref={containerRef}
      style={{
        ...containerStyle,
        backgroundImage: `linear-gradient(90deg, #000000 0%, rgba(190,190,190,0) 50%, #000000 100%), 
                          url(${backgroundImage})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: "center bottom",
        padding: '2.8rem 0',
        backgroundRepeat: 'no-repeat',
        float: 'right',
        // height:400,
        // background:'red'
        // marginLeft: 100,
        position: 'relative',
        marginBottom:"3.5rem"
      }}
    >
      <div
        style={{ display: 'flex', width: '100%', position: 'relative' }}
      >

        <div
          style={{
            ...subHeadStyle,
            width: '35%',
            height: '100%',
            // backgroundColor: 'yellow',
            paddingLeft: '4.5rem',
            position: 'absolute',
            alignItems: 'center',
            zIndex: 2
          }}
        >
          <div>

            <h1 style={{ color: 'white', fontWeight: 700, fontSize: "3.2rem", lineHeight: 1.1, marginBottom: 40 }}>
              {lightHead} <span style={{ color: 'white' }}>{darkHead}</span>
            </h1>

            <Link target='blank'
              onMouseOver={() => setButtonFocus(true)}
              onMouseOut={() => setButtonFocus(false)}
              style={{
                background: style.primaryColor,
                padding: "10px 20px",
                borderRadius: 50,
                color: 'white',
                fontWeight: 700,
                marginTop: 20,
                cursor: 'pointer',

              }}
              href={button.slug}>
              {button.name} {buttonFocus ? <ArrowRightOutlined /> : null}
            </Link>
          </div>
        </div>

        {/* for carousel */}
        <div
          style={sliderStyle}

        >
          <Swiper
            style={{ padding: "2.5rem 0",  "--swiper-navigation-color": "#fff", }}
            ref={slideRef}
            effect={"coverflow"}
            grabCursor={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            centeredSlides={center}
            slidesPerView={slides}
            spaceBetween={30}
            onSlideChange={(e) => {
              if (e.activeIndex > 0) {
                setcenter(false)
                setContainerStyle({ width: '100%', borderRadius: "0px", })
                setsubHeadStyle({ display: "none" })

              } else {
                setContainerStyle({ width: '90%', borderRadius: "100px 0 0 100px" })
                setsubHeadStyle({ display: "flex" })
                setcenter(true)
              }
            }}
          >
            {sliderImages.map((item, index) => (
              <SwiperSlide style={{ width: 210, height: 350 }} key={index}>
                <div style={{ width: 210, height: 350 }}>
                  <Image src={item.thumbnail} alt={item.name} fill style={{ objectFit: 'cover', borderRadius: 50, position: 'absolute',zIndex:-1 }} />
                  <h1 style={{ 
                    color: 'white', 
                    fontWeight: 700, 
                    fontSize: "2.2rem", 
                    writingMode:'vertical-lr',
                    transform:'rotate(-180deg)',
                    float:'bottom',
                    // background:'yellow',
                    height:'100%',
                    paddingTop:20,
                    marginLeft:10
                  }}
                    >
                    Place
                  </h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
