import '@/styles/globals.scss'

import { ConfigProvider, Layout } from 'antd'
import Head from 'next/head'
import { Red_Hat_Display } from 'next/font/google'
import Header from '@/components/Header'

const redHat = Red_Hat_Display({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
})

export default function App({ Component, pageProps }) {
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
          <main className={redHat.className}>
          <div style={{ position: 'sticky', top: 0, zIndex: 5 }}>
            <Header />
          </div>
          
            <Component {...pageProps} />
          </main>
        </Layout>
      </ConfigProvider>
    </>
  )
}
