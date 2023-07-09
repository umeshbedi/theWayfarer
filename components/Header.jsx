import React, { useEffect, useState } from 'react'
import { Menu, Col, Row, Button, Drawer, Space, Divider, Dropdown } from 'antd'
import { } from 'react-icons/fi'
import Link from 'next/link';
import { mobile } from './variables';
import { FaAngleDown, FaUserAlt, FaYenSign } from 'react-icons/fa'
import { IoIosMenu } from 'react-icons/io'
import style from '@/styles/Home.module.scss'
import { db } from '@/firebase';
import Image from 'next/image'

import { menu } from './localdb';

import hstyle from './Header.module.scss'
import { LoginOutlined, UserAddOutlined, UserOutlined, FacebookFilled, FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeFilled } from '@ant-design/icons';

export default function Header({ }) {

  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false)
  const [active, setActive] = useState('home')
  const [packages, setPackages] = useState([])

  const [ferryList, setFerryList] = useState([])
  const [islandList, setIslandList] = useState([])
  const [activity, setActivity] = useState([])

  const items = [
    {
      label: (
        <a target="_blank" href="/login">
          Login
        </a>
      ),
      key: 'email',
      icon: <LoginOutlined />,
    },
    {
      label: (
        <a target="_blank" href="/register">
          Sign Up
        </a>
      ),
      key: 'email',
      icon: <UserAddOutlined />,
    },
  ];

  const socialArr = [
    { icon: <InstagramOutlined /> },
    { icon: <FacebookFilled /> },
    { icon: <TwitterOutlined /> },
    { icon: <YoutubeFilled /> }
  ]

  function Social({ media }) {
    return (
      <a style={{ fontSize: "1.5rem", color: 'white' }}>
        {media}
      </a>
    )
  }


  useEffect(() => {
    setIsMobile(mobile())

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
              <p style={{ textTransform: 'uppercase' }}>{item.name}</p>
            </div>
            <ul style={{ marginLeft: 10 }}>
              {item.items.map((li, index) => (
                <li key={index} style={{ textTransform: 'uppercase' }}>
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

  function ActMenuMobile({ content }) {
    return (
      <>
        <Menu.SubMenu title="test bhai" key={"test1"}>
          <Menu.Item>
            <Link target='blank' href={"/sdf"}>abc test</Link>
          </Menu.Item>
          <Menu.Item>
            <Link target='blank' href={"/sdf"}>abc test</Link>
          </Menu.Item>
          <Menu.Item>
            <Link target='blank' href={"/sdf"}>abc test</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="test bhai 2" key={"test2"}>
          <Menu.Item>
            <Link target='blank' href={"/sdf"}>abc test</Link>
          </Menu.Item>
          <Menu.Item>
            <Link target='blank' href={"/sdf"}>abc test</Link>
          </Menu.Item>
          <Menu.Item>
            <Link target='blank' href={"/sdf"}>abc test</Link>
          </Menu.Item>
        </Menu.SubMenu>
        {/* {menu.activity.map((item, index)=>(
                <Menu.SubMenu key={item.name+Math.random(100,1000)} title={item.name}>
                  {item.items.map((subitem, ind)=>(
                    <Menu.Item key={subitem.name+Math.random(100,1000)}>
                      <Link target='blank' href={subitem.slug}>{subitem.name}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))} */}

      </>
    )
  }

  function RespMenu() {
    return (
      <>
      <Menu
        mode={isMobile ? 'inline' : 'horizontal'}
        style={{
          fontWeight: 'bold',
          float: 'right',
          width: isMobile ? '100%' : 'auto',
          borderBottom: 0,
          backgroundColor: style.primaryColor,
          color: 'white',
          textTransform: 'uppercase',

        }}
        disabledOverflow
        onClick={(e) => { setActive(e.key); setOpen(false) }}
        activeKey={active}
        // forceSubMenuRender
      >

        <Menu.Item key={'home'} >
          <Link href={'/'}><p style={{fontWeight:'bold'}}>Home</p></Link>
        </Menu.Item>
        <Menu.SubMenu title={<p >Know{isMobile ? null : <FaAngleDown />}</p>}>
          {menu.know.map((item, index) => (
            <Menu.Item key={item.name}>
              <Link style={{ textTransform: 'uppercase' }} target='blank' href={item.slug}>{item.name}</Link>
            </Menu.Item>
          ))
          }
          <Divider style={{ margin: "5px 0" }} />
          <Menu.Item key={'blog'}>
            <Link style={{ textTransform: 'uppercase' }} target='blank' href={'#'}><p>Blog</p></Link>
          </Menu.Item>
        </Menu.SubMenu>


        <Menu.SubMenu title={<p >Hotels{isMobile ? null : <FaAngleDown />}</p>}>
          {
            menu.hotels.map((name, key) => (
              <Menu.Item key={name.name + key}>
                <Link target='blank' style={{ textTransform: 'uppercase' }}
                  href={`/search?location=Andaman and Nicobar Islands&category=${name.name}`}>{name.name}</Link>
              </Menu.Item>
            ))
          }
        </Menu.SubMenu>


        <Menu.SubMenu title={<p >Rentals{isMobile ? null : <FaAngleDown />}</p>}>
          {
            menu.rentals.map((name, key) => (
              <Menu.Item key={name.name + key}>
                <Link style={{ textTransform: 'uppercase' }} target='blank' href={name.slug}>{name.name}</Link>
              </Menu.Item>
            ))
          }
        </Menu.SubMenu>

        <Menu.Item key={'home'} >
          <Link href={'/boat-tickets'}><p style={{fontWeight:'bold'}}>Boat Tickets</p></Link>
        </Menu.Item>

        <Menu.SubMenu
          popupOffset={[200, 0]}
          title={<p >Package{isMobile ? null : <FaAngleDown />}</p>}
        >
          {!isMobile &&
            <Menu.Item key={'package'} style={{ height: 'fit-content', backgroundColor: 'white' }}>
              {packages.length != 0 &&
                <MegaMenu />
              }
            </Menu.Item>
          }

          {isMobile &&
            <>
              {menu.activity.map((item, index)=>(
                <Menu.SubMenu key={item.name+Math.random(100,1000)} title={item.name}>
                  {item.items.map((subitem, ind)=>(
                    <Menu.Item key={subitem.name+Math.random(100,1000)}>
                      <Link target='blank' href={subitem.slug}>{subitem.name}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ))} 
            </>
          }

        </Menu.SubMenu>

        <Menu.SubMenu
          popupOffset={[100, 0]}
          title={<p >Activity{isMobile ? null : <FaAngleDown />}</p>}
        >
          {!isMobile &&
            <Menu.Item key={'package'} style={{ height: 'fit-content', backgroundColor: 'white' }}>
              {packages.length != 0 &&
                <MegaMenu />
              }
            </Menu.Item>
          }

          {isMobile && 
          <>
          {menu.activity.map((item, index)=>(
            <Menu.SubMenu key={item.name+Math.random(100,1000)} title={item.name}>
              {item.items.map((subitem, ind)=>(
                <Menu.Item key={subitem.name+Math.random(100,1000)}>
                  <Link target='blank' href={subitem.slug}>{subitem.name}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))} 
        </>
          }

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
        {!isMobile &&
          <Menu.SubMenu title={<p ><FaUserAlt /> User{isMobile ? null : <FaAngleDown />}</p>}>
            <Menu.Item>
              <Link target='blank' href={"/login"}> <LoginOutlined /> Login</Link>
            </Menu.Item>
            <Menu.Item>
              <Link target='blank' href={"/register"}> <UserAddOutlined /> Sign Up</Link>
            </Menu.Item>
          </Menu.SubMenu>
        }

      </Menu>
      {isMobile&&
       <div style={{  width: "100%", height:"30%", display:"flex", justifyContent:"center", alignItems:"center" }}>
       <div style={{display:'flex', gap:"1.5rem"}}>
            {socialArr.map((item, index) => (
              <Social key={index} media={item.icon} />
            ))}
          </div>
        </div>
      }
      </>
    )
  }

  return (
    <div style={{
      padding: '1% 5% .5% 5%',
      backgroundColor: style.primaryColor,

    }}
      id='menuDiv'
    >

      <Drawer
        placement='right'
        width={'100%'}
        open={open}
        onClose={() => setOpen(false)}
        style={{ background: style.primaryColor, position: 'relative' }}

      >
        <RespMenu />
       
      </Drawer>

      <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '10px' }}>
        <div>
          <Link href={'/'}>
            <div style={{ width: isMobile ? 150 : 200, height: "100%", position: 'relative', }}>
              <Image src='/theWayfarer logo_Final.png'
                fill
                loading='lazy'
                style={{ objectFit: 'contain' }}
                alt='ronitholidays Logo Final' />
            </div>
          </Link>
        </div>

        <div>
          {isMobile ?
            (
              <div
                style={{ float: 'right', fontSize: 35, color: "white", display: 'flex', alignItems: 'center', gap: 10, padding: "5px 0" }}
              >
                <Dropdown
                  menu={{ items }}
                  placement='bottomRight'
                  arrow

                >
                  <UserOutlined style={{ fontSize: 25 }} />
                </Dropdown>
                <IoIosMenu onClick={() => setOpen(true)} />
              </div>
            ) :
            <RespMenu />
          }
        </div>


      </div>



    </div>
  )
}
