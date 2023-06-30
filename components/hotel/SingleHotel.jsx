import React, { useState, useEffect } from 'react';
import { mobile, images } from '../variables';
// import ImageGallery from 'react-image-gallery';
import style from '@/styles/Home.module.scss';
import { Button, Rate } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';


export default function SingleHotel({ hotelData }) {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        setIsMobile(mobile())
    }, [isMobile])
    const [images, setImages] = useState([])
    // const hotel = hotelData.hotel
    const { push } = useRouter()
    useEffect(() => {
        // setTimeout(() => {
        //     const imageData = hotelData.images.map((img) => {
        //         return ({
        //             original: img,
        //             thumbnail: img
        //         })
        //     })
        //     setImages(imageData.slice(0, 4))
        // }, 1000)
    }, [])
    return (
        <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="2000"
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: 15,
                    borderRadius: 30,
                    boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.07)',
                    display: isMobile ? 'block' : 'flex',

                }}
            >

                {/* Image container */}
                <div style={{ width: isMobile ? '100%' : '50%' }}>
                    <div
                        style={{
                            position: 'absolute',
                            backgroundColor: style.primaryColor,
                            zIndex: 1,
                            padding: "5px 20px",
                            color: 'white',
                            borderTopLeftRadius:30,
                            borderBottomRightRadius:30
                        }}
                    >
                        <p>
                            {/* {(100 - ((hotel.primary_price * 100) / hotel.primary_price_offer)).toFixed(0)} */}
                            20% Off
                        </p>
                    </div>
                    
                    <div style={{width:"100%", height:"100%", position:'relative'}}>
                        <Image src={"/images/samplehotel.jpg"} fill style={{objectFit:"cover", borderRadius:30}}/>
                    </div>
                    {/* <ImageGallery 
                        items={images.length==0 ?
                            [{original:"/images/Loading_icon.gif", 
                            thumbnail:"/images/Loading_icon.gif", originalWidth:'100%'}]:
                            images}

                        lazyLoad={true}
                        showPlayButton={false}
                        useTranslate3D={true}
                        showFullscreenButton={false}

                    /> */}
                </div>

                {/* Hotels Details container */}
                <div style={{ marginLeft: isMobile ? 0 : 20, marginTop: isMobile ? 15 : 0, display: 'flex', flexDirection: 'column', gap: 15 }}>
                    <h1>Dedeman Konforu</h1>
                    <p>1 Night - 1 Adult</p>
                    <Rate style={{ fontSize: 14 }} disabled allowHalf defaultValue={4.5} />
                    <p>{"Dedeman Hotels & Resorts International 50 yılı aşkın kazandığı deneyimini dünyanın her yerinden ağırladığı misafirleriyle paylaşmaya devam ediyor."}...(<Link target='blank' style={{ color: style.primaryColor }} href={"#"}>more</Link>)</p>
                    <h1><span style={{ fontSize: 16, textDecoration: 'line-through', marginRight: 5 }}>₹10000</span>₹8000/<span style={{ fontSize: 16 }}>per night</span></h1>
                    <div>
                        <Button type='primary' style={{ borderRadius: 50 }} size='large' onClick={() => window.open("#", "_blank")} >Book Hotel</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
