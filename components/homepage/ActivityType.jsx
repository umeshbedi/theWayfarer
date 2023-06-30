import React, { useEffect, useRef, useState } from 'react'

import style from '@/styles/Home.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightOutlined } from '@ant-design/icons'

export default function ActivityType() {

    const [source, setSource] = useState("/activities/water-swashing.mp3")
    const audioRef = useRef()
    const Icons = [
        { name: "Book Scuba Diving", icon: "/activities/scuba-diving.png", sound: "/activities/water-swashing.mp3" },
        { name: "Book Scuba Diving", icon: "/activities/light-and-sound-shows.png", sound: "/activities/water-swashing.mp3" },
        { name: "Book Scuba Diving", icon: "/activities/sea-walk.png", sound: "/activities/water-swashing.mp3" },
        { name: "Book Scuba Diving", icon: "/activities/glass-bottom-boat-ride.png", sound: "/activities/water-swashing.mp3" },
        { name: "Book Scuba Diving", icon: "/activities/island-tours.png", sound: "/activities/water-swashing.mp3" },
        { name: "Book Scuba Diving", icon: "/activities/dinner-cruise.png", sound: "/activities/water-swashing.mp3" },
        { name: "Book Scuba Diving", icon: "/activities/kayaking.png", sound: "/activities/water-swashing.mp3" },
        { name: "Book Scuba Diving", icon: "/activities/parasailing.png", sound: "/activities/water-swashing.mp3" },
    ]

    function playSound(action, url) {
        var audio = document.createElement("audio")
        audio.type = "audio/mpeg"
        audio.src = url
        if (action == "play") {
            audio.play()
        }
        else {
            audio.pause()
        }
    }


    function Button({ name, slug }) {
        const [buttonFocus, setButtonFocus] = useState(false)
        const [display, setDisplay] = useState('none')
        const [padding, setPadding] = useState("10px 20px")
        return (
            <Link target='blank'
                onMouseOver={() => { setDisplay("inline-block"); setPadding("10px 35px 10px 20px") }}
                onMouseOut={() => { setDisplay("none"); setPadding("10px 20px") }}
                style={{
                    background: style.primaryColor,
                    padding: padding,
                    borderRadius: 50,
                    color: 'white',
                    fontWeight: 700,
                    marginTop: 20,
                    cursor: 'pointer',
                    position: 'relative',
                    transition: "padding .5s",
                    display: 'flex',
                    alignItems: 'center',

                }}
                href={slug}>
                {name} <ArrowRightOutlined style={{ display: display, position: 'absolute', right: 10 }} />
            </Link>
        )
    }
    return (
        <div style={{ marginBottom: "4.5rem" }}>
            <h1 style={{ color: style.primaryColor, fontWeight: 700, fontSize: "3.2rem", lineHeight: 1.1, marginBottom: 20, paddingLeft: '4.5rem' }}>
                Types of <span style={{ color: 'grey' }}>Activities</span>
            </h1>
            
            <div style={{ display: "flex", justifyContent: 'center', marginTop: "1.5rem" }}>
                <div style={{ display: 'grid', gridTemplateColumns: "repeat(4, auto)", gridColumnGap: "6.5rem", gridRowGap: "2.5rem" }}>
                    {Icons.map((item, index) => (
                        <div 
                        data-aos-anchor-placement="top-bottom"
                        data-aos="fade-up"
                        data-aos-duration="2000"
                        key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: 120, height: 120, position: 'relative', opacity: .7, cursor: 'pointer' }}
                                onMouseOver={() => {
                                    playSound("play", item.sound)
                                   
                                }}
                                onMouseOut={() => {
                                    // var song = document.getElementById("actaudio")
                                    // song.pause()
                                    // playSound("pause", item.sound)
                                    // audioRef.current.pause()
                                }}
                            >
                                <Image src={item.icon} alt={item.name} fill style={{ objectFit: 'contain' }} />
                            </div>
                            <Button name={item.name} slug={"#"} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
