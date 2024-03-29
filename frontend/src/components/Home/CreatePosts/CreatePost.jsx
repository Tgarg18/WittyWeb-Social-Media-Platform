import React, { useState,useEffect } from 'react'
import { toast } from "react-toastify";
import './CreatePost.css'
import { useNavigate } from "react-router-dom";
import imageicon from '../../../assets/pic_icon.webp'
import usericon from '../../../assets/usericon.png'

const CreatePost = () => {
  const [caption, setCaption] = useState("")
  const [image, setImage] = useState("")
  const [profilephotocreatebar, setProfilephotocreatebar] = useState("")

  const navigate = useNavigate()

  const notifyError = () => toast.error('Something went wrong while posting!')
  const notifyFields = () => toast.error('Either post image or caption!')
  const notifySuccess = () => toast.success('Posted Successfully!')
  const notifysignin = () => toast.info('Please sign in first!')

  function postDetails() {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "wittyweb")
    data.append("cloud_name", "wittywebcloud")
    fetch("https://api.cloudinary.com/v1_1/wittywebcloud/image/upload", {
      method: "POST",
      body: data
    }).then((res) => res.json())
      .then((data) => {
        fetch("http://localhost:5000/createPost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
          },
          body: JSON.stringify({
            caption: caption,
            content_pic: data.url
          })
        }).then(res => res.json())
          .then(data => {
            if (data.error == "Please add all the fields") {
              notifyFields()
              return
            }
            if (data.error == "You must be logged in") {
              notifysignin()
              navigate("/signin")
              return
            }
            else {
              notifySuccess()
              navigate("/")
              return
            }
          })
          .catch(err => {
            notifyError()
            return
          })
      })
      .catch(err => {
        notifyError()
        return
      })

  }
  const loadFile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);

    output.onload = function () {
      URL.revokeObjectURL(output.src)
    }
  }

  useEffect(() => {
    fetch("http://localhost:5000/getuserdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        userid: JSON.parse(localStorage.getItem("user"))._id
      })
    }).then(res => res.json())
      .then(data => {
        setProfilephotocreatebar(data[0].profile_photo)
      })
  }, [])

  return (
    <>
      <div className="createpost text-center flex flex-col gap-8">
        <h1 className='temp text-3xl font-bold'>Create Post</h1>
        <div className='main-div flex flex-col '>
          <div className="card-pic flex gap-2 items-center justify-center">
            {(profilephotocreatebar && profilephotocreatebar != "") ?
              <img src={profilephotocreatebar} alt="" className='userimage h-20 w-20' draggable="false" />
              :
              <img src={usericon} alt="" className='userimage h-20 w-20' draggable="false" />
            }
            <h5>{JSON.parse(localStorage.getItem("user")).name}</h5>
            <textarea className='text' value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='Write your caption here...'></textarea>
          </div>
          <img src={imageicon} alt="" id='output' className='preview' draggable="false" />
          <input type="file" accept='image/*' onChange={(e) => {
            loadFile(e)
            setImage(e.target.files[0])
          }} className='fileinput' />
        </div>
        <button className='postbutton' onClick={() => postDetails()}>Post</button>
      </div>
    </>
  )
}

export default CreatePost