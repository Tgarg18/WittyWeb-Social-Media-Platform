import React from 'react'
import Post from './Post/Post'
import Topbar from './Topbar/Topbar'
import Leftbar from './Leftbar/Leftbar'
import { Outlet } from 'react-router-dom'
import Rightbar from './Rightbar/Rightbar'

const Home = () => {

  return (
    <>
      <Topbar />
      <div className='flex'>
        <Leftbar />
        <Outlet />
        <Rightbar />
      </div>
    </>
  )
}

export default Home