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

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])

    useEffect(() => {
        window.addEventListener("scroll", () => {
            const scrollPercent = (window.scrollY * 100) / 600
            const radius = scrollPercent*4
            const opacity = 1-(scrollPercent/100)

            if (scrollPercent != undefined) {
                setAddStyle({
                    transform: `scale(${100 - scrollPercent}%, ${100 - scrollPercent}%)`,
                    opacity: opacity,
                    top: scrollPercent<100? scrollPercent * 5:350,
                    transition:"transform 1s ease, top .5s ease"
                })

                setCorner({borderRadius:`${radius}px ${radius}px 0 0`})
            }
        })
    }, [])

    return (
        <div
            id='waveslider'
            style={{
                ...addStyle,
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
                                    height: isMobile ? 300 : "100vh",
                                    position: 'relative'
                                }}>

                                <Image
                                    src={item.image}
                                    fill
                                    loading='lazy'
                                    style={{ objectFit: 'cover', ...corner }}
                                />
                                <div style={{
                                    height: isMobile ? 300 :"100vh",
                                    backgroundImage: `linear-gradient(
                                                90deg,rgba(0,0,0, 0.9),
                                                rgba(0,0,0, .3),${isMobile ? null : "rgba(0,0,0, .2)"}
                                                ), 
                                                url('')`,
                                    position: 'absolute',
                                    width: '100%',
                                    
                                    ...corner
                                }}
                                />
                                <Row style={{ width: '95%', position: 'absolute', padding: "10%" }}>
                                    <Col span={isMobile ? 16 : 24} style={{}}>

                                        <h1 style={{ color: 'white', fontSize: "5.25em", fontWeight: 900 }}>{item.heading}</h1>
                                        <Space direction='vertical' style={{ gap: 20 }}>
                                            <p style={{ color: 'white', fontSize: "2.5em", fontWeight: 600, fontStyle: 'italic' }}>{item.subHeading}</p>
                                            <Link target='blank' style={{ background: style.primaryColor, padding: "10px 20px", borderRadius: 50, color: 'white', fontWeight: 700 }} href={"/contact-us"}>Contact Us</Link>
                                        </Space>
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
