import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { NavLink } from "react-router-dom";
import logo from '../../../assets/logo.gif'
import './Topbar.css'


const Topbar = () => {
  return (
    <div className='topbar flex justify-between'>
      <div className="left flex items-center gap-4">
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <img src={logo} alt="" className='logo' />
        </NavLink>
        <HomeOutlinedIcon/>
        <DarkModeOutlinedIcon/>
        <GridViewOutlinedIcon/>
        <div className="search flex items-center gap-3">
          <SearchOutlinedIcon/>
          <input type="text" placeholder="Search..." className='input w-96' />
        </div>
      </div>
      <div className="right flex items-center gap-4">
        <PersonOutlinedIcon/>
        <EmailOutlinedIcon/>
        <NotificationsOutlinedIcon/>
        <div className="user flex items-center gap-2">
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='userimage' />
          <span className='font-bold'>John</span>
        </div>
      </div>
    </div>
  )
}

export default Topbar