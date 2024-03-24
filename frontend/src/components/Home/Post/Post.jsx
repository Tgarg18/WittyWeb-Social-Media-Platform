import React, { useState, useContext } from 'react'
import './Post.css'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Likes from './Likes/Likes';
import Dislikes from './Dislikes/Dislikes';
import { LoginContext } from '../../../Context/LoginContext';


const Post = ({ url, username, caption, content, post_id, liked, disliked, count_likes, count_dislikes, data }) => {
  const [like, setLike] = useState(liked)
  const [dislike, setDislike] = useState(disliked)
  const [c_like, setC_like] = useState(count_likes)
  const [c_dislike, setC_dislike] = useState(count_dislikes)

  const [showLikes, setShowLikes] = useState(false)
  const [showDislikes, setShowDislikes] = useState(false)

  const navigate = useNavigate();

  const notifysignin = () => toast.info('Please sign in first!')

  const likePost = (post_id) => {
    if (dislike) {
      removeDislikePost(post_id)
    }
    // setLike(true)
    fetch("http://localhost:5000/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        postId: post_id
      })
    }).then(res => res.json())
      .then(result => {
        if (result.error == "You must be logged in") {
          notifysignin()
          navigate('/signin')
          return
        }
        setLike(true)
        setC_like(c_like + 1)
      })
  }
  const dislikePost = (post_id) => {
    if (like) {
      removeLikePost(post_id)
    }
    // setDislike(true)
    fetch("http://localhost:5000/dislike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        postId: post_id
      })
    }).then(res => res.json())
      .then(result => {
        if (result.error == "You must be logged in") {
          notifysignin()
          navigate('/signin')
          return
        }
        setDislike(true)
        setC_dislike(c_dislike + 1)
      })
  }
  const removeLikePost = (post_id) => {
    // setLike(false)
    fetch("http://localhost:5000/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        postId: post_id
      })
    }).then(res => res.json())
      .then(result => {
        if (result.error == "You must be logged in") {
          notifysignin()
          navigate('/signin')
          return
        }
        setLike(false)
        setC_like(c_like - 1)
      })
  }
  const removeDislikePost = (post_id) => {
    // setDislike(false)
    fetch("http://localhost:5000/undislike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        postId: post_id
      })
    }).then(res => res.json())
      .then(result => {
        if (result.error == "You must be logged in") {
          notifysignin()
          navigate('/signin')
          return
        }
        setDislike(false)
        setC_dislike(c_dislike - 1)
      })
  }

  return (
    <>
    <LoginContext.Provider value={{showLikes, setShowLikes, showDislikes, setShowDislikes}}>
      <div className='postcontainer flex flex-col'>
        <div className='header flex items-center'>
          <div className='profile_pic flex'>
            <img src={url} alt="" className='image' draggable="false" />
          </div>
          <div className='username'>
            {username}
          </div>
        </div>
        <div className="content">
          <div className='text-left'>{caption}</div>
          <img src={content} alt="" className='postimage' onDoubleClick={(e) => likePost(post_id)} draggable="false" />
        </div>
        <div className='footer flex gap-5'>
          <div className='likes flex flex-col justify-center items-center'>
            <div className='cursor-pointer' onClick={() => setShowLikes(true)}>{c_like}</div>
            {(like) ? <div className='cursor-pointer' onClick={(e) => removeLikePost(post_id)}>
              <ThumbUpAltIcon fontSize='medium' />
            </div>
              : <div className='cursor-pointer' onClick={(e) => likePost(post_id)}>
                <ThumbUpOffAltIcon fontSize='medium' />
              </div>}
          </div>
          <div className='Dislikes flex flex-col justify-center items-center'>
            <div onClick={() => setShowDislikes(true)} className='cursor-pointer'>{c_dislike}</div>
            {(dislike) ? <div className='cursor-pointer' onClick={(e) => removeDislikePost(post_id)}>
              <ThumbDownAltIcon fontSize='medium' />
            </div>
              : <div className='cursor-pointer' onClick={(e) => dislikePost(post_id)}>
                <ThumbDownOffAltIcon fontSize='medium' />
              </div>}
          </div>
          <div className='comments flex flex-col justify-center items-center'>
            <div>20</div>
            <ChatBubbleOutlineOutlinedIcon fontSize='medium' />
          </div>
          <div className='share'></div>
        </div>
      </div>
      {/* {showLikes && <LogoutBox setModalOpen={setModalOpen}></LogoutBox>} */}
      {/* {(showLikes) ? <Likes/> : null}
      {(showDislikes) ? <Dislikes/> : null} */}
      {showLikes && <Likes post_id={post_id} setShowLikes={setShowLikes} />}
      {showDislikes && <Dislikes post_id={post_id} setShowDislikes={setShowDislikes}/>}
      </LoginContext.Provider>
    </>
  )
}

export default Post