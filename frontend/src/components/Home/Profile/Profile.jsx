import React from 'react'
import './Profile.css'
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Post from '../Post/Post';
import { useNavigate, NavLink } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext'
import Followers from './Followers/Followers';
import Followings from './Followings/Followings';

const Profile = () => {
  const gender = "male";
  const [pic, setPic] = useState([])
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)

  const navigate = useNavigate();
  const notifysignin = () => toast.info('Please sign in first!')

  useEffect(() => {
    fetch("http://localhost:5000/profile",
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      })
      .then(res => res.json())
      .then(result => {
        if (result.error == "You must be logged in") {
          notifysignin()
          navigate('/signin')
          return
        }
        setPic(result.posts)
        setFollowers(result.followers)
        setFollowing(result.following)
      })
  }, [])

  return (
    <>
      <UserContext.Provider value={{ followers, setShowFollowers, following, setShowFollowing }}>
        <div className="profile text-center flex flex-col gap-8">
          <h1 className='temp text-3xl font-bold'>My Profile</h1>
          <div className='flex items-center justify-center gap-6'>
            <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='myimage' draggable="false" />
            <div className='flex flex-col items-center justify-center'>
              <h1 className='name text-3xl '>{JSON.parse(localStorage.getItem("user")).name}</h1>
              <h1 className='username text-xl'>@{JSON.parse(localStorage.getItem("user")).userName}</h1>
              {(gender == "male") ? <h2 className='gender text-lg'>He/Him</h2>
                :
                (gender == "female") ? <h2 className='gender text-lg'>She/Her</h2> : null}
            </div>
          </div>
          <div className="follow flex gap-11 justify-center items-center">
            <div className='followers flex flex-col cursor-pointer' onClick={() => setShowFollowers(true)}>
              <div className='font-semibold text-xl'>{followers.length}</div>
              <div>Followers</div>
            </div>
            <div className='following flex flex-col cursor-pointer' onClick={() => setShowFollowing(true)}>
              <div className='font-semibold text-xl'>{following.length}</div>
              <div>Following</div>
            </div>
            <div className="savedposts flex flex-col items-center justify-center">
              <BookmarksIcon fontSize='small' className='icon' />
              <div>Saved Posts</div>
            </div>
          </div>
          <div className="bio">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae minima in nisi possimus, tempore sint blanditiis perspiciatis nihil error alias optio aut doloremque sunt mollitia nesciunt natus eum laudantium quae.</div>
          <div className="editinfo">
            <NavLink to={"/profile/editinfo"} draggable="false">
            <button className='editbutton'>Edit Profile</button>
            </NavLink>
          </div>
          <div className="post_bar">
            <div className=' text-xl font-bold'>My Posts</div>
          </div>
          <div className='post-container gap-4'>
            {pic.map((data) => {
              return (
                <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@${data.postedby.userName}`} caption={data.caption} content={data.image} post_id={data._id} key={data._id} liked={data.likes.includes(JSON.parse(localStorage.getItem("user"))._id)} disliked={data.dislikes.includes(JSON.parse(localStorage.getItem("user"))._id)} count_likes={data.likes.length} count_dislikes={data.dislikes.length} data={data} count_comments={data.comments.length} deleteOption={true} />
              )
            })}
          </div>
        </div>
        {showFollowers && <Followers setShowFollowers={setShowFollowers} userid={JSON.parse(localStorage.getItem("user"))._id} />}
        {showFollowing && <Followings setShowFollowing={setShowFollowing} userid={JSON.parse(localStorage.getItem("user"))._id} />}
      </UserContext.Provider>
    </>
  )
}

export default Profile