import React, { useEffect, useState } from 'react'
import style from '@/styles/Home.module.scss'
import { mobile } from '../variables'

export default function Title({ red, blue, isdark = false, extra }) {

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])


    return (
        <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="2000"
            style={{ marginBottom: 30, width:'100%' }}
            
            >
            <div>
            <h1 style={{ padding: isMobile?'0 5%':0, marginBottom: 10, fontWeight: 700, fontSize: "3.2rem"}}>
                <span style={{ color: style.primaryColor }}>{red}</span>
                {" "}
                <span style={{ color: isdark ? "white" : "grey" }}>{blue}</span>
            </h1>
            </div>
            {extra}
            
        </div>
    )
}
