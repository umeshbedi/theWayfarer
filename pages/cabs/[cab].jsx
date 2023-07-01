import { boxShadow, mobile } from '@/components/variables'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from '@/styles/Home.module.scss'
import { Col, Row } from 'antd'
import Image from 'next/image'
import { FaMap, FaUser } from 'react-icons/fa'
import { CarFilled } from '@ant-design/icons'

export default function Cab() {

    const [isMobile, setIsMobile] = useState(false)
    const query = useRouter().query

    console.log(query)
    const [size, setSize] = useState(115)

    const cabName = query.cab != undefined ? query.cab.split("-").join(" ") : null

    useEffect(() => {
        setIsMobile(mobile())

    }, [isMobile])

    useEffect(() => {
        setSize(100)
    }, [])

    function Wave() {
        return (
            <svg id="wave"
                style={{ position: 'absolute', bottom: 0 }}
                viewBox="0 0 1440 200" version="1.1" xmlns="http://www.w3.org/2000/svg">

                <path style={{ transform: "translate(0, 20px)" }}
                    fill="#f1f1f1"
                    d="M0,120L40,103.3C80,87,160,53,240,60C320,67,400,113,480,116.7C560,120,640,80,720,83.3C800,87,880,133,960,153.3C1040,173,1120,167,1200,156.7C1280,147,1360,133,1440,130C1520,127,1600,133,1680,143.3C1760,153,1840,167,1920,166.7C2000,167,2080,153,2160,140C2240,127,2320,113,2400,113.3C2480,113,2560,127,2640,140C2720,153,2800,167,2880,150C2960,133,3040,87,3120,60C3200,33,3280,27,3360,20C3440,13,3520,7,3600,10C3680,13,3760,27,3840,46.7C3920,67,4000,93,4080,106.7C4160,120,4240,120,4320,100C4400,80,4480,40,4560,30C4640,20,4720,40,4800,40C4880,40,4960,20,5040,23.3C5120,27,5200,53,5280,66.7C5360,80,5440,80,5520,90C5600,100,5680,120,5720,130L5760,140L5760,200L5720,200C5680,200,5600,200,5520,200C5440,200,5360,200,5280,200C5200,200,5120,200,5040,200C4960,200,4880,200,4800,200C4720,200,4640,200,4560,200C4480,200,4400,200,4320,200C4240,200,4160,200,4080,200C4000,200,3920,200,3840,200C3760,200,3680,200,3600,200C3520,200,3440,200,3360,200C3280,200,3200,200,3120,200C3040,200,2960,200,2880,200C2800,200,2720,200,2640,200C2560,200,2480,200,2400,200C2320,200,2240,200,2160,200C2080,200,2000,200,1920,200C1840,200,1760,200,1680,200C1600,200,1520,200,1440,200C1360,200,1280,200,1200,200C1120,200,1040,200,960,200C880,200,800,200,720,200C640,200,560,200,480,200C400,200,320,200,240,200C160,200,80,200,40,200L0,200Z">
                </path>
            </svg>
        )
    }

    function SingleCab() {
        return (
            <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="2000"
                style={{ backgroundColor: 'white', borderRadius: 30, boxShadow: boxShadow, }}>
                <div
                    style={{
                        width: "100%",
                        display: 'flex',
                        gap: "3%",
                        padding: "20px 0 0 20px"
                    }}
                >
                    <div style={{ width: "15%" }}>
                        <div style={{ width: "7rem", position: 'relative', height: "6rem" }}>
                            <Image src={"/images/cabimage2.jpg"} fill style={{ objectFit: 'cover', borderRadius: 20 }} />
                        </div>

                    </div>

                    <div style={{ width: "60%" }}>
                        <h2 style={{ fontWeight: 600, fontSize: "1.3rem" }}>Airport Pick, Hotel Transfer Later, Cellular Jail visit, Cover Beach Cellular Jail, Light and Sound Show</h2>

                        <div style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow', marginTop: "2rem" }}>
                            <div style={{ width: "90%", height: 1, background: '#98a6b3', position: 'absolute' }} />
                            <p style={{ position: 'absolute', alignSelf: 'center', background: 'white', border: "1px solid #98a6b3", borderRadius: 50, padding: "1px 15px", color: 'grey' }}>Distance: 6 kms</p>
                        </div>
                    </div>

                    <div style={{ width: "25%", flexDirection: 'column', display: "flex", justifyContent: 'space-between', borderLeft: "1px solid #e2e8ee" }}>
                        <div style={{ flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
                            <h3>Offer Price:</h3>
                            <h1>₹400</h1>
                        </div>
                        <div style={{ height: "3rem", width: '100%', background: style.primaryColor, marginTop: "1.5rem", display: 'flex', alignItems: "center", justifyContent: 'center', cursor: 'pointer' }}>
                            <p style={{ fontSize: "1.2rem", color: "white" }}>Enquire Now</p>
                        </div>

                    </div>
                </div>

                <div style={{ width: "75%", height: 1, background: '#e2e8ee', margin: "1rem 0" }} />
                <div style={{ display: "flex", gap: ".5rem", marginBottom: "1rem", marginLeft: "1rem" }}>
                    <p style={{ background: 'white', border: "1px solid #e2e8ee", borderRadius: 50, padding: "5px 15px", color: 'grey' }}><FaMap /> Pickup/Drop</p>
                    <p style={{ background: 'white', border: "1px solid #e2e8ee", borderRadius: 50, padding: "5px 15px", color: 'grey' }}><CarFilled /> Cab</p>
                    <p style={{ background: 'white', border: "1px solid #e2e8ee", borderRadius: 50, padding: "5px 15px", color: 'grey' }}><FaUser /> Travel Executive</p>
                </div>
            </div>
        )
    }

    const cabArr = [1, 1, 1, 1]

    return (
        <div>
            <div
                className={style.hotelBanner}
                style={{
                    backgroundImage: `linear-gradient(
                        90deg,rgba(0,0,0, 0.75),
                        rgba(0,0,0, 0),rgba(0,0,0, 0)
                        ), url('/images/taxi service.avif')`,
                    height: 500,
                    backgroundSize: `${size}%`,
                    backgroundPosition: "bottom right",
                    transition: 'background-size 10s',
                    position: 'relative',
                    padding: 0
                }}
            >
                <Row style={{ width: '95%', paddingLeft: '5%' }}>
                    <Col span={isMobile ? 18 : 10} style={{}}>
                        <h1 style={{ fontSize: isMobile ? 35 : 45, color: 'white', fontWeight: 800 }}>{cabName}</h1>
                        <br />
                        <p style={{ color: 'white', fontWeight: 400, fontSize: "1.2rem" }}>Find {cabName} with Best Experience</p>
                    </Col>
                </Row>
                <Wave />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom:"3rem"}}>

                <div style={{ width: '90%', display: "flex", gap: '3%', marginTop: '3%' }}>
                    <div style={{ width: "65%", display: 'flex', flexDirection: 'column', gap: "2rem" }}>
                        {cabArr.map((item, index) => (
                            <SingleCab key={index}/>
                        ))}
                    </div>

                    <div style={{ width: '35%', height: 'fit-content' }} id='ticketCollapse'>
                        <h2 style={{ marginBottom: '5%', textAlign: 'center' }}>Popular Cruises</h2>
                    </div>

                </div>
            </div>


        </div>
    )
}
