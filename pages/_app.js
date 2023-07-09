import '@/styles/globals.scss'

import { ConfigProvider, Layout, Skeleton } from 'antd'
import Head from 'next/head'
import { Red_Hat_Display } from 'next/font/google'
// import Header from '@/components/Header'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'
import SHeader from '@/components/skeleton/SHeader'
const Header = dynamic(import("@/components/Header"), { ssr: false, loading: () => <SHeader /> })

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react'
import { mobile } from '@/components/variables'




export default function App({ Component, pageProps }) {
  const [isMobile, setIsMobile] = useState(false)
  const [path, setPath] = useState("/")
  useEffect(() => {
    AOS.init();
    setPath(window.location.pathname)
    setIsMobile(mobile())
  }, [])

  
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ff0000',
            borderRadius: 50,

          }
        }}
      >
        <Layout>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/theWayfarer logo_Round.png" />
          </Head>
          <main >
            <div style={{ position: "sticky", top: 0, zIndex: 5, width:"100%" }}>
              <Header />
            </div>
           
            <Component {...pageProps} />

            <Footer />
           
          </main>
        </Layout>
      </ConfigProvider>
    </>
  )
}
