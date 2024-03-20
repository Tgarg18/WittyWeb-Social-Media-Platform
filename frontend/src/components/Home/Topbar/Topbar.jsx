import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { NavLink } from "react-router-dom";
import logo from '../../../assets/logo.gif'
import './Topbar.css'
import DarkMode from '../../DarkMode/DarkMode';


const Topbar = () => {
  return (
    <div className='topbar flex justify-between'>
      <div className="left flex items-center gap-4">
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <img src={logo} alt="" className='logo' />
        </NavLink>
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <HomeOutlinedIcon />
        </NavLink>
        <DarkMode />
        <GridViewOutlinedIcon />
        <div className="search flex items-center gap-3">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." className='input w-96' />
        </div>
      </div>
      <div className="right flex items-center gap-4">
        {/* <PersonOutlinedIcon /> */}
        <div className='flex items-center gap-1'>
          <NavLink to='/createpost' style={{ textDecoration: 'none' }}>
            <AddCircleOutlineRoundedIcon />
          </NavLink>
          <NavLink to='/createpost' style={{ textDecoration: 'none' }}>
            <h3>Create Post</h3>
          </NavLink>
        </div>
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user flex items-center gap-2">
          <NavLink to='/profile' style={{ textDecoration: 'none' }}>
            <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='userimage' />
          </NavLink>
          <NavLink to='/profile' style={{ textDecoration: 'none' }}>
            <span className='font-bold'>Nancy</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Topbar