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



export default function Search({cruizeData, activityData}) {

  const [isMobile, setIsMobile] = useState(false)
  const query = useRouter().query

  const [size, setSize] = useState(115)

  useEffect(() => {
    setIsMobile(mobile())

  }, [isMobile])

  useEffect(()=>{
    setTimeout(() => {
      setSize(100)
    }, 1000);
  },[size])

  return (
    <main>
      <Head>
        <title>search hotels</title>
      </Head>
      <div>
        <div
          className={style.hotelBanner}
          style={{
            backgroundImage: `linear-gradient(
            90deg,rgba(0,0,0, 0.75),
            rgba(0,0,0, 0),rgba(0,0,0, 0)
            ), 
            url('/images/water_villas_fotor.jpg')`,
            height: 500,
            backgroundSize:`${size}%`,
            backgroundPosition:"center bottom",
            transition:'background-size 10s'
          }}
        >
          <Row style={{ width: '95%' }}>
            <Col span={isMobile ? 18 : 10} style={{}}>
              <h1 style={{ fontSize: isMobile ? 35 : 45, color: 'white' }}>Hotels in {query.location}</h1>
              <br />
              <p style={{ color: 'white' }}>Find {query.category} Hotels/Resorts in {query.location} with Best Experience</p>
            </Col>
          </Row>

        </div>

          <SearchDiv />
        

        <div style={{ display: 'flex', alignItems: 'center', margin: '50px 0', flexDirection: 'column' }}>
        <SearchPage query={query} />
        </div>

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
