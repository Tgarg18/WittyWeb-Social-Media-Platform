import React, { useState, useEffect } from 'react'
import './Signup.css'
import logo from '../../assets/logo.png'
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from '../navbar/Navbar';

const Signup = () => {

  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")

  const notifySuccess = () => toast.success('Signup is Successfull!')
  const notifyUserName = () => toast.error('Username already exists. Try a different username!')
  const notifyEmail = () => toast.error('Email already Registered! Try Signing In!')
  const notifyInvalidEmail = () => toast.error('Enter correct Email!')
  const notifyInvalidUserName = () => toast.error('Invalid Username. Username must start with an alphabet, all other characters can be alphabets, numbers or an underscore and length should be between 8-30 characters')
  const notifyInvalidName = () => toast.error('Please enter your correct name in alphabets')
  const notifyPassword = () => toast.warning('Password must be atleast 8 character long and must contain alteast one uppercase letter, one lowercase letter, one number and one special character!')
  const notifyCPassword = () => toast.error('Passwords do not match!')
  const notifyFields = () => toast.info('Fill all the fields!')
  const notifyError = () => toast.error('Something went wrong!')

  const navigate = useNavigate();


  const postData = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!(emailRegex.test(email))) {
      notifyInvalidEmail()
      return
    }
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        userName: userName,
        email: email,
        password: password,
        cpassword: cpassword,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.Status == "Sign Up Successful") {
          notifySuccess()
          navigate('/signin')
        }
        else if (data.error == "User already exists with that email. Try loging in")
          notifyEmail()
        else if (data.error == "Invalid username")
          notifyInvalidUserName()
        else if (data.error == "Invalid name")
          notifyInvalidName()
        else if (data.error == "Username already exists. Try a different username.")
          notifyUserName()
        else if (data.error == "Passwords do not match")
          notifyCPassword()
        else if (data.error == "Enter Strong Password")
          notifyPassword()
        else if (data.error == "Please fill all the fields")
          notifyFields()
        else
          notifyError()
      })
  }
  return (
    <>
    <Navbar/>
      <div className="signup flex items-center justify-evenly">
        <div className='form-info rounded-xl flex flex-col items-center px-3'>
          {/* <img src={logo} alt="" className='side object-contain rounded-2xl mb-8' draggable="false" /> */}
          <p className='para text-center my-1'>Sign Up to WittyWeb to</p>
          <p className='para text-center my-1'>Connect with your Friends</p>
          <p className='para text-center my-1'>and Share your Thoughts!</p>
        </div>
        <div className='form rounded-xl py-10 px-9 flex flex-col gap-5 items-stretch text-xl'>
          <h1 className='text-3xl font-extrabold text-center'>SIGN UP</h1>
          <div>
            <input className='px-5 py-2 text-lg' type="email" name="email" id="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input className='px-5 py-2 text-lg' type="text" name="username" id="username" placeholder='Enter Username' value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div>
            <input className='px-5 py-2 text-lg' type="text" name="fullname" id="fname" placeholder='Enter Full Name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <input className='px-5 py-2 text-lg' type="password" name="password" id="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <input className='px-5 py-2 text-lg' type="password" name="cpassword" id="cpassword" placeholder='Enter Password to confirm' value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
          </div>
          <div>
            <button>
              <input type="submit" value="SIGN UP" className='button_top border-2 border-black rounded-xl bg-black text-white p-5' onClick={postData} />
            </button>
          </div>
          <div className='move'>
            <NavLink to="/signin" className={`font-semibold text-center hover:underline text-white`} draggable="false"><p>Already have an account? Sign In</p></NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup