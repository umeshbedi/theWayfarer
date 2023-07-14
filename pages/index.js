import Head from 'next/head'
import style from '@/styles/Home.module.scss'
import dynamic from 'next/dynamic'
import { db } from '@/firebase'
// import DivCarousel from '@/components/homepage/DivCarousel'
import Authorities from '@/components/homepage/Authorities'
import Testimonials from '@/components/homepage/Testimonials'
import ActivityType from '@/components/homepage/ActivityType'
import SHome from '@/components/skeleton/SHome'
import Butter from '@/components/utils/smoothScroll'
import SHeader from '@/components/skeleton/SHeader'
import { useEffect, useState } from 'react'
import { mobile } from '@/components/variables'

const Slider = dynamic(() => import('../components/homepage/slider'), { ssr: false, loading: () => <SHome /> })
const DivCarousel = dynamic(() => import('@/components/homepage/DivCarousel'), { ssr: false, loading: () => <SHome /> })
const Header = dynamic(import("@/components/Header"), { ssr: false, loading: () => <SHeader /> })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false, loading: () => <SHome /> })
const Package = dynamic(() => import("@/components/homepage/Package"), { ssr: false, loading: () => <SHome /> })
const DivCarousel2 = dynamic(() => import("@/components/homepage/DivCarousel2"), { ssr: false, loading: () => <SHome /> })
const Counter = dynamic(() => import('@/components/homepage/Counter'), { ssr: false, loading: () => <SHome /> })

export default function Home({
  data,
  packageList,
  activityData,
  ferryData,
  islandData,
  testimonials
}) {

  const [menuheight, setMenuheight] = useState(null)
  useEffect(() => {
    var menuel = document.querySelector('.menuheight')
    var height = menuel.clientHeight
    setMenuheight(height)
  }, [])

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(mobile())
  }, [isMobile])



  return (
    <>
      <Head>
        <title>The WayFarer</title>
        <meta name="description" content="this is homepage" />
      </Head>

      <main>
        <div className='menuheight' style={{ position: 'fixed', width: '100%', top: 0, zIndex: 10 }}><Header /></div>
        <Butter wrapperId={"homepagescroll"} >
          <div style={{ marginTop: menuheight }}>
            <Slider banner={data.banner} />

            {isMobile ? (
              <Package
                lightHead={"Sustainable "}
                darkHead={"destinations"}
                button={{ name: "All Destination", slug: "/destination" }}

              />
            ) : (
              <DivCarousel
                lightHead={"Sustainable "}
                darkHead={"destinations"}
                button={{ name: "All Destination", slug: "/destination" }}
                backgroundImage={'/divcarousel/bg-1.jpg'}
              />

            )}


            {isMobile ? (
              <Package
                lightHead={"Sustainable "}
                darkHead={"experience"}
                button={{ name: "All Experinces", slug: "/destination" }}

              />
            ) : (
              <DivCarousel
                lightHead={"Sustainable "}
                darkHead={"experience"}
                button={{ name: "All Experinces", slug: "/destination" }}
                backgroundImage={'/divcarousel/bg-2.jpg'}
              />

            )}


            {isMobile ? (
              <Package
                lightHead={"Sustainable "}
                darkHead={"hotels"}
                button={{ name: "All Hotels", slug: "/destination" }}

              />
            ) : (
              <DivCarousel
                lightHead={"Sustainable "}
                darkHead={"hotels"}
                button={{ name: "All Hotels", slug: "/destination" }}
                backgroundImage={'/divcarousel/bg-3.jpg'}
              />

            )}


            <DivCarousel2
              button={{ name: "All Hotels", slug: "/destination" }}
            />

            <Package
              lightHead={"Trending"}
              darkHead={"Activities"}
              button={{ name: "All Activities", slug: "/activities" }}

            />

          </div>
          <ActivityType />
          <Testimonials />
          <Counter />
          <Authorities />
          <Footer />
        
        </Butter>

      </main>
    </>
  )
}



export const getStaticProps = async () => {

  const res = await db.doc(`pages/homepage`).get();

  //Getting Package Data
  const pkg = await db.collection("package").get();
  const pkgId = pkg.docs.map((pkg, i) => {
    return { id: pkg.id }
  })

  let packageList = []

  for (let i = 0; i < pkgId.length; i++) {
    const pkgd = await db.doc(`package/${pkgId[i].id}`).collection("singlePackage").limit(4).get();
    const pkgdata = pkgd.docs.map((d) => {
      const data = d.data()
      return { title: data.title, thumbnail: data.thumbnail, slug: data.slug }
    })
    packageList.push(pkgdata)
  }

  //Getting Island Data
  const island = await db.collection("island").get();
  const islandData = island.docs.map((isl) => {
    const data = isl.data()
    return { name: data.name, slug: data.slug, thumbnail: data.thumbnail }
  })

  //Getting Activity
  const actvty = await db.collection("activity").get();
  const activityData = actvty.docs.map((act) => {
    const data = act.data()
    return { name: data.name, thumbnail: data.thumbnail, slug: data.slug }
  })

  //Getting Ferry
  const ferry = await db.collection("ferry").get();
  const ferryData = ferry.docs.map((fer) => {
    const data = fer.data()
    return { name: data.name, thumbnail: data.image, slug: data.slug }
  })

  //Getting Testimonials
  const testimonials = await db.doc(`pages/testimonials`).get()


  // console.log(testimonials.data().testimonials)

  return {
    props: {
      data: res.data(),
      packageList,
      islandData,
      activityData,
      ferryData,
      testimonials: testimonials.data().testimonials
    },
    revalidate: 60,

  }

}
