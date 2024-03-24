import React, { useState } from 'react'
import './Signin.css'
import logo from '../../assets/logo.gif'
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from '../navbar/Navbar';
const Signin = () => {

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [passsword, setPassword] = useState("")

  const navigate = useNavigate()

  const notifyIncorrectUserName = () => toast.error('Invalid username!')
  const notifyIncorrectEmail = () => toast.error('Invalid email!')
  const notifyIncorrectPassword = () => toast.error('Invalid password!')
  const notifyError = () => toast.error('Something went wrong!')
  const notifyFields = () => toast.info('Fill all the fields!')
  const notifySuccess = () => toast.success('Sign In Successfully!')

  const checkLoginData = () => {
    // console.log(userName, email, passsword);
    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName: userName,
        email: email,
        password: passsword
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.user) {
          notifySuccess()
          // console.log(data.token);
          localStorage.setItem('jwt', data.token)
          localStorage.setItem('user',JSON.stringify(data.user))
          navigate('/')
        }
        else if (data.error == "Invalid username") {
          notifyIncorrectUserName()
        }
        else if (data.error == "Please fill all the fields") {
          notifyFields()
        }
        else if (data.error == "Invalid email") {
          notifyIncorrectEmail()
        }
        else if (data.error == "Invalid password") {
          notifyIncorrectPassword()
        }
        else {
          notifyError()
        }
      })
  }

  return (
    <>
    <Navbar/>
      <div className="signin flex justify-evenly items-center">
        <div className='form-info rounded-xl flex flex-col items-center'>
          <img src={logo} alt="" className='side w-2/4 object-contain rounded-2xl mb-8' draggable="false" />
          <p className='para text-center my-1'>Welcome Back to WittyWeb</p>
          <p className='para text-center my-1'>Was Waiting for you</p>
          <p className='para text-center my-1'>Sign In Now!</p>
        </div>
        <div className='form rounded-xl py-10 px-9 flex flex-col gap-5 items-stretch text-xl'>
          <h1 className='text-3xl font-extrabold text-center'>SIGN IN</h1>
          <div>
            <input className='px-5 py-2 text-lg' type="text" name="username" id="username" placeholder='Enter Username' value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div>
            <input className='px-5 py-2 text-lg' type="email" name="email" id="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input className='px-5 py-2 text-lg' type="password" name="password" id="password" placeholder='Enter Password' value={passsword} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <button>
              <input type="submit" value="SIGN IN" className='button_top border-2 border-black rounded-xl bg-black text-white p-5' onClick={checkLoginData} />
            </button>
          </div>
          <div>
            <NavLink to="/signup" className={`font-semibold text-center hover:underline text-white`} draggable="false"><p>Don't have an account? Sign Up</p></NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin