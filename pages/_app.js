import '@/styles/globals.scss'

import { ConfigProvider, Layout, Skeleton } from 'antd'
import Head from 'next/head'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useRef, useState } from 'react'
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
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/theWayfarer logo_Round.png" />
          </Head>
          <main>
            {/* <Header /> */}

            <Component {...pageProps} />

            {/* <Footer /> */}
          </main>
        </Layout>
      </ConfigProvider>
    </>
  )
}
