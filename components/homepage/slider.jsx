import React, { useEffect, useState } from 'react'
import { Carousel, Row, Col, Space, Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'
import { Wave, mobile } from '../variables'
import style from '@/styles/Home.module.scss'


export default function Slider({ banner }) {
    const [isMobile, setIsMobile] = useState(false)

    const [addStyle, setAddStyle] = useState({})

    const [corner, setCorner] = useState({})

    const [height, setHeight] = useState(null)
    const [headPos, setHeadPos] = useState(null)

    useEffect(() => {
        setIsMobile(mobile())
        setHeight(document.documentElement.clientHeight - 50)
    }, [isMobile])

    useEffect(() => {

        // function scrolling() {
        //     const scrollHeight = isMobile ? height : 600;
        //     const scrollPercent = (window.scrollY * 100) / scrollHeight
        //     const radius = scrollPercent * 2
        //     const opacity = 1 - (scrollPercent / 100)
        //     var scale = 100

        //     // console.log(scrollPercent)
        //     if (scrollPercent < 50) {
        //         if (scrollPercent <= 10) {
        //             scale = 100
        //         }
        //         else if (scrollPercent > 10 && scrollPercent <= 20) {
        //             scale = 80
        //         }
        //         else if (scrollPercent > 20 && scrollPercent <= 30) {
        //             scale = 70
        //         }
        //         else if (scrollPercent > 30 && scrollPercent <= 40) {
        //             scale = 60
        //         }
        //         else if (scrollPercent > 40 && scrollPercent <= 50) {
        //             scale = 50
        //         }




        //     } else { scale = 50 }

        //     if (scrollPercent != undefined) {
        //         setAddStyle({
        //             transform: `scale(${scale}%, ${scale}%)`,
        //             opacity: opacity,
        //             top: scrollPercent < 100 ? scrollPercent * 5 : 350,
        //             transition: "transform 1.5s, top .5s ease"
        //         })

        //         setCorner({ borderRadius: `${radius}px ${radius}px 0 0` })
        //     }
        // }


        // window.addEventListener("scroll", scrolling)
    }, [])

    return (
        <div
            id='waveslider'
            style={{
                // ...addStyle,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',

            }}
        >

            <div
                style={{ transform: "rotate(180deg)", position: 'absolute', zIndex: 2, width: '100%', }}>
                <Wave />
            </div>
            <Carousel
                autoplay arrows dots={false} draggable speed={3000}
                prevArrow={<LeftOutlined />}
                nextArrow={<RightOutlined />}
                
            >
                {
                    banner.map((item, index) => (
                        <div key={index}>
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: height,
                                    position: 'relative',

                                }}>

                                <Image
                                    src={item.image}
                                    fill
                                    loading='lazy'
                                    style={{ objectFit: 'cover', ...corner, }}
                                />
                                <div style={{
                                    height: height,
                                    // backgroundImage: `linear-gradient(0deg,rgba(0,0,0, 0.9),rgba(0,0,0, .3),rgba(0,0,0, 0))`,
                                    position: 'absolute',
                                    width: '100%',

                                    ...corner
                                }}
                                />
                                
                                    <Row style={{ width: '100%', position: 'absolute', padding: "10%" }}>
                                        <Col span={24} style={{}}>
                                            <div style={{ textAlign: isMobile ? 'center' : null }}>
                                                <h1 style={{ color: 'white', fontSize: isMobile ? "2.5rem" : "4rem", fontWeight: 900 }}>{item.heading}</h1>
                                                <p style={{ color: 'white', fontSize: isMobile ? "1.5rem" : "2.5em", fontWeight: 600, fontStyle: 'italic', marginBottom: 30 }}>{item.subHeading}</p>
                                                <Link target='blank' style={{ background: style.primaryColor, padding: "10px 20px", borderRadius: 50, color: 'white', fontWeight: 700 }} href={"/contact-us"}>Contact Us</Link>
                                            </div>

                                        </Col>
                                    </Row>

                            </div>
                        </div>
                    ))
                }

            </Carousel>
        </div>
    )
}
