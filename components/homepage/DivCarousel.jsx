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
import { mobile } from '../variables';



export default function DivCarousel2({ lightHead, darkHead, backgroundImage, sliderContent, button }) {

  const [containerStyle, setContainerStyle] = useState({ width: "90%", borderRadius: "100px 0 0 100px", })
  const [subHeadStyle, setsubHeadStyle] = useState({ display: 'flex' })
  const [sliderStyle, setSliderStyle] = useState({ width: '100%' })
  const [slides, setSlides] = useState(4.5)
  const [center, setcenter] = useState(true)

  const [buttonFocus, setButtonFocus] = useState(false)

  const slideRef = useRef()
  const containerRef = useRef()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])


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
        position: 'relative',
        marginBottom: "3.5rem",
        transition: 'all .5s'

      }}
    >
      <div
        style={{ display: isMobile ? "block" : 'flex', width: '100%', position: 'relative' }}
      >

        <div
          style={{
            ...subHeadStyle,
            width: isMobile ? "50%" : '35%',
            height: '100%',
            // backgroundColor: 'yellow',
            paddingLeft: isMobile ? "2.5rem" : '4.5rem',
            position: isMobile ? "relative" : 'absolute',
            alignItems: 'center',
            zIndex: 2,

          }}
        >
          <div>

            <h1
              data-aos="fade-up"
              data-aos-duration="2000"
              style={{ color: 'white', fontWeight: 900, fontSize: isMobile ? "2.2rem" : "3.2rem", lineHeight: 1.1, marginBottom: isMobile ? 25 : 40 }}>
              {lightHead} <span style={{ color: 'white' }}>{darkHead}</span>
            </h1>

            <Link
              data-aos="fade-up"
              data-aos-duration="2000"
              target='blank'
              onMouseOver={() => setButtonFocus(true)}
              onMouseOut={() => setButtonFocus(false)}
              style={{
                background: style.primaryColor,
                padding: "10px 20px",
                borderRadius: 50,
                color: 'white',
                fontWeight: 700,
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
            style={{ padding: isMobile ? "3rem 0 1.5rem 10px" : "2.5rem 0", "--swiper-navigation-color": "#fff", transition: ".5s" }}
            ref={slideRef}
            effect={"coverflow"}
            grabCursor={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            centeredSlides={isMobile ? false : center}
            slidesPerView={isMobile ? 2.1 : slides}
            spaceBetween={isMobile ? 10 : 30}
            onSlideChange={(e) => {
              if (e.activeIndex > 0) {
                setcenter(false)
                setContainerStyle({ width: '100%', borderRadius: "0px", })
                setsubHeadStyle({ display: isMobile ? "block" : "none" })

              } else {
                setContainerStyle({ width: '90%', borderRadius: "100px 0 0 100px" })
                setsubHeadStyle({ display: "flex" })
                setcenter(true)
              }
            }}
          >
            {sliderImages.map((item, index) => (
              <SwiperSlide style={{ width: 210, height: isMobile ? 250 : 350 }} key={index} className='singleSwiper'>
                <div style={{ width: 210, height: isMobile ? 250 : 350 }}>
                  <Image src={item.thumbnail} alt={item.name} fill style={{ objectFit: 'cover', borderRadius: isMobile ? 25 : 50, position: 'absolute', zIndex: -1 }} />
                  <h1 style={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: isMobile ? "1.5rem" : "2.2rem",
                    writingMode: 'vertical-lr',
                    transform: 'rotate(-180deg)',
                    float: 'bottom',
                    // background:'yellow',
                    height: '100%',
                    paddingTop: 20,
                    marginLeft: 10
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
