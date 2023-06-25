import React, { useEffect, useState } from 'react'
import { Menu, Col, Row, Button, Drawer, Space, Divider } from 'antd'
import { } from 'react-icons/fi'
import Link from 'next/link';
import { mobile } from './variables';
import { FaAngleDown, FaYenSign } from 'react-icons/fa'
import { IoIosMenu } from 'react-icons/io'
import style from '@/styles/Home.module.scss'
import { db } from '@/firebase';
import Image from 'next/image'

import { menu } from './localdb';

import hstyle from './Header.module.scss'

export default function Header({ }) {

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false)
  const [active, setActive] = useState('home')
  const [packages, setPackages] = useState([])

  const [ferryList, setFerryList] = useState([])
  const [islandList, setIslandList] = useState([])
  const [activity, setActivity] = useState([])

  useEffect(() => {
    setIsMobile(mobile())
    console.log()
  }, [isMobile])

  useEffect(() => {
    db.collection("package")
      .orderBy("order", "asc")
      .onSnapshot((snap) => {
        const packageTemp = []
        snap.forEach((sndata => {
          const data = sndata.data()
          const singlePackageTemp = []
          db.doc(`package/${sndata.id}`)
            .collection('singlePackage')
            .where("status", '==', 'published')
            .orderBy("order", "asc")
            .get()
            .then((newpkg => {
              newpkg.forEach((pkg) => {
                singlePackageTemp.push({ name: pkg.data().name, slug: pkg.data().slug })
              })
            }))

          packageTemp.push({ name: data.name, slug: data.slug, singlePackage: singlePackageTemp })

        }))

        setPackages(packageTemp)

      })
  }, [])

  useEffect(() => {
    db.collection('ferry').onSnapshot((snap) => {
      const tempFerry = []
      snap.forEach((sndata) => {
        tempFerry.push({ name: sndata.data().name, slug: sndata.data().slug })
      })
      setFerryList(tempFerry)
    })
  }, [])

  useEffect(() => {
    db.collection("island")
      .orderBy("order", "asc")
      .onSnapshot((snap) => {
        const tempIsland = []
        snap.forEach((sndata) => {
          tempIsland.push({ slug: sndata.data().slug, name: sndata.data().name })
        })
        setIslandList(tempIsland)
      })
  }, [])

  useEffect(() => {
    db.collection("activity")
      .orderBy("order", "asc")
      .onSnapshot((snap) => {
        const tempActivity = []
        snap.forEach((sndata) => {
          tempActivity.push({ slug: sndata.data().slug, name: sndata.data().name })
        })
        setActivity(tempActivity)
      })
  }, [])




  function MegaMenu({ content }) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: "repeat(4, 250px)", gridGap: 10, width: '100%', paddingTop: 10 }}>
        {menu.activity.map((item, index) => (
          <div id={hstyle.actMenuContainer} key={index}>
            <div
              id={hstyle.actMenuHeader}
              style={{ display: 'flex', fontWeight: '700', gap: 10, alignItems: 'center', padding: 5, borderRadius: "0 50px 0 50px" }}>
              <div style={{ height: 50, position: 'relative', width: 50, marginLeft: 10 }}>
                <Image src={item.icon} fill style={{ objectFit: 'fill' }} />
              </div>
              <p>{item.name}</p>
            </div>
            <ul style={{ marginLeft: 10 }}>
              {item.items.map((li, index) => (
                <li key={index}>
                  <span style={{ display: 'flex', fontWeight: '600', gap: 10, alignItems: 'center', padding: 5, borderRadius: 10 }}>
                      <div style={{ height: 30, position: 'relative', width: 30 }}>
                        <Image src={li.icon} fill style={{ objectFit: 'fill', borderRadius: 50 }} />
                      </div>
                      {li.name}
                    </span>
                  
                </li>
              ))}
            </ul>
          </div>
        ))

        }
      </div>
    )
  }


  function RespMenu() {
    return (
      <Menu
        mode={isMobile ? 'inline' : 'horizontal'}
        style={{
          fontWeight: 'bold',
          float: 'right',
          width: isMobile ? '100%' : 'auto',
          borderBottom: 0,
          backgroundColor: style.primaryColor,
          color: 'white',
          transition: 'none !important'
        }}
        disabledOverflow
        onClick={(e) => { setActive(e.key); setOpen(false) }}
        activeKey={active}

      >

        <Menu.Item key={'home'} >
          <Link href={'/'}><p>Home</p></Link>
        </Menu.Item>
        <Menu.SubMenu title={<p >Know{isMobile ? null : <FaAngleDown />}</p>}>
          {menu.know.map((item, index) => (
            <Menu.Item key={item.name}>
              <Link target='blank' href={item.slug}>{item.name}</Link>
            </Menu.Item>
          ))
          }
        </Menu.SubMenu>


        <Menu.SubMenu title={<p >Hotels{isMobile ? null : <FaAngleDown />}</p>}>
          {
            menu.hotels.map((name, key) => (
              <Menu.Item key={name.name + key}>
                <Link target='blank' href={name.slug}>{name.name}</Link>
              </Menu.Item>
            ))
          }
        </Menu.SubMenu>


        <Menu.SubMenu title={<p >Rentals{isMobile ? null : <FaAngleDown />}</p>}>
          {
            menu.rentals.map((name, key) => (
              <Menu.Item key={name.name + key}>
                <Link target='blank' href={name.slug}>{name.name}</Link>
              </Menu.Item>
            ))
          }
        </Menu.SubMenu>

        <Menu.Item key={'home'} >
          <Link href={'/boat-tickets'}><p>Boat Tickets</p></Link>
        </Menu.Item>

        <Menu.SubMenu
          popupOffset={[200, 0]}
          title={<p >Package{isMobile ? null : <FaAngleDown />}</p>}
        >
          <Menu.Item key={'package'} style={{ height: 'fit-content', backgroundColor: 'white' }}>
            {packages.length != 0 &&
              <MegaMenu />
            }
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          popupOffset={[200, 0]}
          title={<p >Activity{isMobile ? null : <FaAngleDown />}</p>}
        >
          <Menu.Item key={'package'} style={{ height: 'fit-content', backgroundColor: 'white' }}>
            {packages.length != 0 &&
              <MegaMenu />
            }
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu title={<p >Ferry{isMobile ? null : <FaAngleDown />}</p>}>
          {
            ferryList.map((ferry, key) => (
              <Menu.Item key={key}>
                <Link target='blank' href={ferry.slug}>{ferry.name}</Link>
              </Menu.Item>
            ))
          }
        </Menu.SubMenu>
        <Menu.Item key={'blog'}>
          <Link target='blank' href={'#'}><p>Blog</p></Link>
        </Menu.Item>
      </Menu>
    )
  }

  return (
    <div style={{
      padding: '2% 5% 1% 5%',
      backgroundColor: style.primaryColor,

    }}
      id='menuDiv'
    >

      <Drawer
        placement='right'
        width={'70%'}
        open={open}
        onClose={() => setOpen(false)}


      >
        <RespMenu />
      </Drawer>

      <Row>
        <Col span={18} push={6}>
          {isMobile ?
            (
              <p
                style={{ float: 'right', fontSize: 35, color: style.primaryColor }}
                onClick={() => setOpen(true)}
              >
                <IoIosMenu style={{ fontSize: 35 }} />
              </p>
            ) :
            <RespMenu />
          }
        </Col>
        <Col span={6} pull={18} style={{}}>
          <Link href={'/'}>
            <Image src='/theWayfarer logo_Final.png'
              height={45}
              width={200}
              loading='lazy'
              style={{}}
              alt='ronitholidays Logo Final' />
          </Link>
        </Col>
      </Row>



    </div>
  )
}
