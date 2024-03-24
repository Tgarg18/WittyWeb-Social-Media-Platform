import React, { useContext } from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { NavLink } from "react-router-dom";
import logo from '../../../assets/logo.gif'
import './Topbar.css'
import DarkMode from '../../DarkMode/DarkMode';
import hamburger from '../../navbar/svg/hamburger.svg';
import { useState } from 'react';
import { LoginContext } from '../../../Context/LoginContext';


const Topbar = () => {
  const [sidebar, setSidebar] = useState(true)
  const { setModalOpen } = useContext(LoginContext)


  const loginStatus = () => {
    const token = localStorage.getItem("jwt")
    if (token) {
      return true
    }
    else {
      return false
    }
  }

  const change = () => {
    setSidebar(!sidebar)
    if (sidebar) {
      document.body.querySelector('.topbar').style.left = "0"
      document.body.querySelector('.topbar').classList.add('entry')
      document.body.querySelector('.topbar').classList.remove('exit')
      document.body.querySelector('.hamburger').style.left = "43vw"
      document.body.querySelector('.hamburger').classList.add('entry')
      document.body.querySelector('.hamburger').classList.remove('exit')
    }
    else {
      document.body.querySelector('.topbar').style.left = "-42vw"
      document.body.querySelector('.topbar').classList.remove('entry')
      document.body.querySelector('.topbar').classList.add('exit')
      document.body.querySelector('.hamburger').style.left = "0vw"
    }
  }
  return (
    <>
      <div className='topbar flex justify-between'>
        <div className="menu left flex items-center gap-4">
          <NavLink to='/' style={{ textDecoration: 'none' }} draggable="false">
            <img src={logo} alt="" className='logo' draggable="false" />
          </NavLink>
          <NavLink to='/' style={{ textDecoration: 'none' }} draggable="false">
            <HomeOutlinedIcon />
          </NavLink>
          <DarkMode />
          <div className="search flex items-center gap-3">
            <SearchOutlinedIcon />
            <input type="text" placeholder="Search..." className='input w-48  ' />
          </div>
        </div>
        <div className="menu right flex items-center gap-4">
          {(loginStatus()) ? <><div className='flex items-center gap-1'>
            <NavLink to='/createpost' style={{ textDecoration: 'none' }} draggable="false">
              <AddCircleOutlineRoundedIcon />
            </NavLink>
            <NavLink to='/createpost' style={{ textDecoration: 'none' }} draggable="false">
              <h3>Create Post</h3>
            </NavLink>
          </div>
            <div className="user flex items-center gap-2">
              <NavLink style={{ textDecoration: 'none' }} className={`logout_button`} onClick={() => setModalOpen(true)} draggable="false">
                <span className='font-bold'>Logout</span>
              </NavLink>
              <div className='userprofile'>
              <NavLink to='/profile' style={{ textDecoration: 'none' }} draggable="false">
                <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='userimage' draggable="false" />
              </NavLink>
              <NavLink to='/profile' style={{ textDecoration: 'none' }} draggable="false">
                <span className='font-bold'>Nancy</span>
              </NavLink>
              </div>
            </div></> : <><div className='flex items-center gap-1'>
              <NavLink to='/signup' style={{ textDecoration: 'none' }} draggable="false">
                <h3>Sign Up</h3>
              </NavLink>
            </div>
            <div className="user flex items-center gap-2">
              <NavLink to='/signin' style={{ textDecoration: 'none' }} draggable="false">
                <h3>Sign In</h3>
              </NavLink>
            </div></>}

        </div>
      </div >
      <button value={sidebar} onClick={change} className='hamburger mx-1'>
        <img src={hamburger} alt="" id='temp' draggable="false" />
      </button>
    </>
  )
}

export default Topbar