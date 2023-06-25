import Head from 'next/head'
import style from '@/styles/Home.module.scss'
import dynamic from 'next/dynamic'
import { db } from '@/firebase'
import DivCarousel from '@/components/homepage/DivCarousel'
import Authorities from '@/components/homepage/Authorities'
import DivCarousel2 from '@/components/homepage/DivCarousel2'
import Testimonials from '@/components/homepage/Testimonials'
import Package from '@/components/homepage/Package'
import ActivityType from '@/components/homepage/ActivityType'

const Slider = dynamic(() => import('../components/homepage/slider'))


export default function Home({
  data,
  packageList,
  activityData,
  ferryData,
  islandData,
  testimonials
}) {
  return (
    <>
      <Head>
        <title>The WayFarer</title>
        <meta name="description" content="this is homepage" />
      </Head>

      <main>
        <div style={{ overflowX: 'hidden'}}>
          <Slider banner={data.banner} />
          
          <DivCarousel 
          lightHead={"Sustainable "} 
          darkHead={"destinations"} 
          button={{name:"All Destination", slug:"/destination"}}
          backgroundImage={'/divcarousel/bg-1.jpg'}
          />

          <DivCarousel 
          lightHead={"Sustainable "} 
          darkHead={"experience"} 
          button={{name:"All Experinces", slug:"/destination"}}
          backgroundImage={'/divcarousel/bg-2.jpg'}
          />

          <DivCarousel 
          lightHead={"Sustainable "} 
          darkHead={"hotels"} 
          button={{name:"All Hotels", slug:"/destination"}}
          backgroundImage={'/divcarousel/bg-3.jpg'}
          />
    
          <DivCarousel2
          lightHead={"This is something om"} 
          darkHead={"hotels"} 
          button={{name:"All Hotels", slug:"/destination"}}
          backgroundImage={'/divcarousel/bg-3.jpg'}
          />

          <Package
          lightHead={"Trending"} 
          darkHead={"Activities"}
          button={{name:"All Activities", slug:"/activities"}}
          
          />

        </div>
          <ActivityType/>
          <Testimonials/>
          <Authorities/>

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
