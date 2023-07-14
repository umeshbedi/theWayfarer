import React from 'react'
import style from '@/styles/Home.module.scss'
import Image from 'next/image'
import { FacebookFilled, FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeFilled } from '@ant-design/icons'

export default function Footer() {

  const socialArr = [
  {icon:<InstagramOutlined />}, 
  {icon:<FacebookFilled />}, 
  {icon:<TwitterOutlined />}, 
  {icon:<YoutubeFilled />}
]

  function Social({ media }) {
    return (
      <a style={{ fontSize: "1.5rem", color: 'white' }}>
        {media}
      </a>
    )
  }

  return (
    <div
      style={{
        // height: 400,
        backgroundColor: `${style.primaryColor}`,
        display: 'flex',
        flexDirection: 'column',
        gap: "1rem",
        paddingBottom:50
      }}
    >

      <div style={{ height: 80, position: 'relative', marginTop: "3.5rem" }}>
        <Image src={"/theWayfarer logo_Final.png"} fill style={{ objectFit: 'contain' }} />
      </div>

      <div style={{ display: 'flex', gap: '4.5rem', justifyContent: 'center', marginTop: '2rem' }}>
        <a style={{ fontSize: "1.2rem", fontWeight: 500, color: 'white' }}>Blogs</a>
        <a style={{ fontSize: "1.2rem", fontWeight: 500, color: 'white' }}>Contact Us</a>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        {socialArr.map((item, index) => (
          <Social key={index} media={item.icon} />
        ))}
      </div>
      
      
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem', textAlign:'center', padding:'0 10%' }}>
        <a style={{ fontSize: "1rem", fontWeight: 500, color: 'white' }}>Copyright ©️ 2023 theWayfarer. All Rights Reserved TGA</a>
        
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        <a style={{ fontSize: "1rem", fontWeight: 500, color: 'white' }}>Privacy Policy</a>
        <a style={{ fontSize: "1rem", fontWeight: 500, color: 'white' }}>|</a>
        <a style={{ fontSize: "1rem", fontWeight: 500, color: 'white' }}>Cookie Policy</a>
      </div>
    </div>
  )
}
