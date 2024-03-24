import React from 'react'
import './Profile.css'
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { useState, useEffect } from 'react';
import Post from '../Post/Post';
const Profile = () => {
  const [pic, setPic] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/profile",
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      })
      .then(res => res.json())
      .then(result => {
        setPic(result)
      })
  }, [])

  return (
    <>
      <div className="profile text-center flex flex-col gap-8">
        <h1 className='temp text-3xl font-bold'>My Profile</h1>
        <div className='flex flex-col items-center'>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='image' />
          <h1 className='name text-2xl '>Nancy</h1>
          <h1 className='username text-xl'>@nancy_2727</h1>
          <h2 className='gender text-lg'>She/Her</h2>
        </div>
        <div className="follow flex gap-11 justify-center items-center">
          <div className='followers flex flex-col'>
            <div className='font-semibold text-xl'>100</div>
            <div>Followers</div>
          </div>
          <div className='following flex flex-col'>
            <div className='font-semibold text-xl'>10</div>
            <div>Following</div>
          </div>
          <div className="savedposts flex flex-col items-center justify-center">
            <BookmarksIcon fontSize='small' className='icon' />
            <div>Saved Posts</div>
          </div>
        </div>
        <div className="bio">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae minima in nisi possimus, tempore sint blanditiis perspiciatis nihil error alias optio aut doloremque sunt mollitia nesciunt natus eum laudantium quae.</div>
        <div className="editinfo">
          <button className='editbutton'>Edit Profile</button>
        </div>
        <div className="post_bar">
          <div className=' text-xl font-bold'>My Posts</div>
        </div>
        <div className='post-container gap-4'>
            {pic.map((data,index)=>{
              return (
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@${data.postedby.userName}`} caption={data.caption} content={data.image} key={index} />
              )
            })}
        </div>
      </div>
    </>
  )
}

export default Profile