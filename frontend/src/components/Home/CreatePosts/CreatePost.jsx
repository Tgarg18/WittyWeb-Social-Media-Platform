import React from 'react'
import './CreatePost.css'
import { NavLink } from "react-router-dom";
import imageicon from '../../../assets/image_icon.png'

const CreatePost = () => {
  const loadFile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src)
    }
  }
  return (
    <>
      <div className="createpost text-center flex flex-col gap-8">
        <h1 className='temp text-3xl font-bold'>Create Post</h1>
        <div className='main-div flex flex-col '>
          <div className="card-pic flex gap-2 items-center justify-center">
            <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='userimage' />
            <h5>Nancy</h5>
            <textarea className='text' placeholder='Write your caption here...'></textarea>
          </div>
          {/* <img src={imageicon} alt="" id='output' /> */}
          <img src={`https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/picture-512.png`} alt="" id='output' />
          <input type="file" accept='image/*' onChange={(e) => loadFile(e)} className='fileinput' />
        </div>
        <NavLink to={`/`}>
          <button className='postbutton'>Post</button>
        </NavLink>
      </div>
    </>
  )
}

export default CreatePost