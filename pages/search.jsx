import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { mobile } from '@/components/variables'
import { Row, Col, Skeleton, Button } from 'antd'

import { db } from '@/firebase'
import SearchDiv from '@/components/searchHotels/SearchDiv'
import SearchPage from '@/components/searchHotels/SearchPage'
import style from '@/styles/Home.module.scss'
import dynamic from 'next/dynamic'
import Butter from '@/components/utils/smoothScroll'
import SHeader from '@/components/skeleton/SHeader'
import Waves from '@/components/Waves'
const Header = dynamic(import("@/components/Header"), { ssr: false, loading: () => <SHeader /> })
const Footer =  dynamic(()=>import('@/components/Footer') )

export default function Search({cruizeData, activityData}) {

  const [isMobile, setIsMobile] = useState(false)
  const query = useRouter().query
  const [height, setHeight] = useState(null)

  const [size, setSize] = useState(115)

  useEffect(() => {
    setIsMobile(mobile())
    const heightMobile = document.documentElement.clientWidth
    const heightDesktop = document.documentElement.clientHeight 
    setHeight(isMobile ? heightMobile : heightDesktop)
  }, [isMobile])

  useEffect(()=>{
    setSize(100)
  },[size])

  const [menuheight, setMenuheight] = useState(null)
  useEffect(()=>{
    var menuel = document.querySelector('.menuheight')
    var height = menuel.clientHeight
    setMenuheight(height)
  },[])

  return (
    <main>
      <Head>
        <title>search hotels</title>
      </Head>
      <div>
      <div className='menuheight' style={{position:'fixed', width:'100%',top:0, zIndex:10}}><Header/></div>
        
        <Butter wrapperId={"searchdiv"} >
        <div
          className={style.hotelBanner}
          style={{
            backgroundImage: isMobile
            ?
            `linear-gradient(0deg,rgba(0,0,0, 0),rgba(0,0,0, 0.5),rgba(0,0,0, 0)), url('/images/water_villas_fotor.jpg')`
            :
            `linear-gradient(90deg,rgba(0,0,0, 0.75),rgba(0,0,0, 0),rgba(0,0,0, 0)), url('/images/water_villas_fotor.jpg')`,
            height: height,
            backgroundSize:isMobile?"cover":`${size}%`,
            backgroundPosition:"center bottom",
            transition:'background-size 10s',
            backgroundRepeat:"no-repeat",
            position:'relative',
            paddingLeft:0
          }}
        >
          <Row style={{ width: '100%', padding:'5%', textAlign:isMobile?'center':"left"}}>
            <Col span={isMobile ? 24 : 10} style={{}}>
              <h1 style={{ fontSize: isMobile ? "1.5rem" : "2.5rem", color: 'white', fontWeight:800 }}>Hotels in {query.location}</h1>
              <br />
              <p style={{ color: 'white', fontSize:"1.2rem" }}>Find {query.category} Hotels/Resorts in {query.location} with Best Experience</p>
            </Col>
          </Row>
          <Waves/>

        </div>

          <SearchDiv />
        
        {/* {isMobile&&
        <div style={{padding:"10% 10% 0 10%"}}>
        <h1 style={{ fontSize: isMobile ? 35 : 45, fontWeight:800 }}>Hotels in {query.location}</h1>
              <br />
              <p style={{ fontSize:"1.2rem" }}>Find {query.category} Hotels/Resorts in {query.location} with Best Experience</p>
        </div>
        } */}

        <div style={{ display: 'flex', alignItems: 'center', margin: '50px 0', flexDirection: 'column' }}>
        <SearchPage query={query} />
        </div>
        <Footer/>
        
        </Butter>
        </div>
    </main>
  )
}

// export const getStaticProps = async (context) => {
  
//   //Getting Cruize Data
//   const cruize = await db.collection("ferry").get()
//   const cruizeData = cruize.docs.map((item, i) => {
//     const data = item.data()
//     return { name: data.name, slug: data.slug, image: data.image }
//   })

//   //Getting Activity Data

//   const activity = await db.collection("activity").get()
//   const activityData = activity.docs.map((item, i) => {
//     const data = item.data()
//     return { name: data.name, slug: data.slug, thumbnail: data.thumbnail }
//   })

//   return {
//     props: {
//       cruizeData, activityData
//     },
//     revalidate: 60,

//   }

// }
