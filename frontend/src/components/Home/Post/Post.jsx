import React, { useState } from 'react'
import './Post.css'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { NavLink, useNavigate } from 'react-router-dom';
import Likes from './Likes/Likes';
import Dislikes from './Dislikes/Dislikes';
import { LoginContext } from '../../../Context/LoginContext';
import { RiCloseLine } from "react-icons/ri";
import { toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import DeletePost from './DeletePost/DeletePost';

const Post = ({ url, username, caption, content, post_id, liked, disliked, count_comments, count_likes, count_dislikes, data, deleteOption }) => {
  const [like, setLike] = useState(liked)
  const [dislike, setDislike] = useState(disliked)
  const [c_like, setC_like] = useState(count_likes)
  const [c_dislike, setC_dislike] = useState(count_dislikes)
  const [c_comments, setC_comments] = useState(count_comments)

  const temp1 = localStorage.getItem("jwt")
  let status = () => {
    if (temp1) {
      return true
    }
    return false
  }

  const [showLikes, setShowLikes] = useState(false)
  const [showDislikes, setShowDislikes] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showDeleteBox, setShowDeleteBox] = useState(false)

  const [comment, setComment] = useState("")
  const [commentList, setCommentList] = useState([])

  const makeComment = (text, id) => {
    if (text === "") {
      notifycomment()
      return
    }
    fetch("http://localhost:5000/makecomment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        postId: id,
        text: text
      })
    }).then(res => res.json())
      .then(result => {
        if (result.error == "You must be logged in") {
          notifysignin()
          navigate('/signin')
          return
        }
        setCommentList(result)
        setC_comments(c_comments + 1)
        setComment("")
      })
  }

  const getComments = (id) => {
    fetch("http://localhost:5000/showcomments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        postId: id,
      })
    }).then(res => res.json())
      .then(result => {
        if (result.error == "You must be logged in") {
          notifysignin()
          navigate('/signin')
          return
        }
        setCommentList(result)
      })
  }

  const navigate = useNavigate();
  const notifysignin = () => toast.info('Please sign in first!')
  const notifycomment = () => toast.info("Comment cannot be empty!")


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
      <LoginContext.Provider value={{ showLikes, setShowLikes, showDislikes, setShowDislikes, showDeleteBox, setShowDeleteBox }}>
        <div className='postcontainer flex flex-col'>
          <div className='header flex items-center justify-between'>
            <div className='left_header flex items-center'>
              {(status()) ?
                ((data.postedby._id != JSON.parse(localStorage.getItem("user"))._id) ? <NavLink to={`/profile/${data.postedby._id}`} draggable="false">
                  <div className='profile_pic flex'>
                    <img src={url} alt="" className='image' draggable="false" />
                  </div>
                </NavLink>
                  :
                  <NavLink to={`/profile`} draggable="false">
                    <div className='profile_pic flex'>
                      <img src={url} alt="" className='image' draggable="false" />
                    </div>
                  </NavLink>)
                :
                <NavLink to={`/signin`} onClick={() => notifysignin()} draggable="false">
                  <div className='profile_pic flex'>
                    <img src={url} alt="" className='image' draggable="false" />
                  </div>
                </NavLink>
              }
              {(status()) ?
                ((data.postedby._id != JSON.parse(localStorage.getItem("user"))._id) ?
                  <NavLink to={`/profile/${data.postedby._id}`} draggable="false">
                    <div className='username'>
                      {username}
                    </div>
                  </NavLink>
                  :
                  <NavLink to={`/profile`} draggable="false">
                    <div className='username'>
                      {username}
                    </div>
                  </NavLink>)
                :
                <NavLink to={`/signin`} onClick={() => notifysignin()} draggable="false">
                  <div className='username'>
                    {username}
                  </div>
                </NavLink>
              }
            </div>
            {(deleteOption) ? <div className="right_header flex items-center px-4 pb-2 cursor-pointer" onClick={() => setShowDeleteBox(true)} >
              <DeleteIcon fontSize='medium' className='hover:text-3xl' />
            </div> :
              null}
          </div>
          <div className="content">
            <div className='text-left'>{caption}</div>
            <img src={content} alt="" className='postimage' onDoubleClick={(e) => likePost(post_id)} draggable="false" />
          </div>
          <div className='footer flex gap-5'>
            <div className='likes flex flex-col justify-center items-center'>
              {(status()) ?
                <div className='cursor-pointer text-lg' onClick={() => setShowLikes(true)}>{c_like}</div>
                :
                <NavLink to={'/signin'} onClick={() => notifysignin()} draggable="false">
                  <div className='text-lg'>{c_like}</div>
                </NavLink>}
              {(like) ?
                <div className='cursor-pointer' onClick={(e) => removeLikePost(post_id)}>
                  <ThumbUpAltIcon fontSize='medium' />
                </div>
                :
                <div className='cursor-pointer' onClick={(e) => likePost(post_id)}>
                  <ThumbUpOffAltIcon fontSize='medium' />
                </div>}
            </div>
            <div className='Dislikes flex flex-col justify-center items-center'>
              {(status()) ?
                <div onClick={() => setShowDislikes(true)} className='cursor-pointer text-lg'>{c_dislike}</div>
                :
                <NavLink to={'/signin'} onClick={() => notifysignin()} draggable="false">
                  <div className='cursor-pointer text-lg'>{c_dislike}</div>
                </NavLink>
              }
              {(dislike) ? <div className='cursor-pointer' onClick={(e) => removeDislikePost(post_id)}>
                <ThumbDownAltIcon fontSize='medium' />
              </div>
                : <div className='cursor-pointer' onClick={(e) => dislikePost(post_id)}>
                  <ThumbDownOffAltIcon fontSize='medium' />
                </div>}
            </div>
            <div className='comments flex flex-col justify-center items-center'>
              <div onClick={() => {
                getComments(post_id)
                setShowComments(true)
              }} className='cursor-pointer text-lg'>{c_comments}</div>
              <div className='cursor-pointer' onClick={() => {
                getComments(post_id)
                setShowComments(true)
              }}>
                <ChatBubbleOutlineOutlinedIcon fontSize='medium' />
              </div>
            </div>
          </div>
          <div className="commentinput flex py-4 px-2 gap-2">
            <textarea className='input_comment' draggable="false" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            <button className='post_button hover:font-bold py-3' onClick={() => makeComment(comment, post_id)}>Post</button>
          </div>
        </div>
        {showLikes && <Likes post_id={post_id} setShowLikes={setShowLikes} />}
        {showDislikes && <Dislikes post_id={post_id} setShowDislikes={setShowDislikes} />}
        {showDeleteBox && <DeletePost post_id={post_id} setShowDeleteBox={setShowDeleteBox} />}
      </LoginContext.Provider>
      {/* show comment */}
      {(showComments) ?
        <>
          <div className="show_comments" onClick={() => setShowComments(false)}></div>
          <div className="center-div">
            <div className="container flex">
              <div className="closeBtn">
                <button onClick={() => setShowComments(false)}>
                  <RiCloseLine></RiCloseLine>
                </button>
              </div>
              <div className="postPic">
                <div className='text-left text-wrap overflow-scroll'>{caption}</div>
                <img src={content} alt="" draggable="false" className='postimage' />
              </div>
              <div className="details flex flex-col">
                <div className='header flex items-center'>
                  <div className='profile_pic flex'>
                    {(data.postedby._id == JSON.parse(localStorage.getItem("user"))._id) ?
                      <NavLink to={`/profile`} draggable="false">
                        <img src={url} alt="" className='image' draggable="false" />
                      </NavLink>
                      :
                      <NavLink to={`/profile/${data.postedby._id}`} draggable="false">
                        <img src={url} alt="" className='image' draggable="false" />
                      </NavLink>}
                  </div>
                  <div className='username'>
                    {(data.postedby._id == JSON.parse(localStorage.getItem("user"))._id) ?
                      <NavLink draggable="false" to={`/profile`}>{username}</NavLink>
                      :
                      <NavLink draggable="false" to={`/profile/${data.postedby._id}`}>{username}</NavLink>}
                  </div>
                </div>
                <div className="comment-section">
                  <div className="comm">
                    {commentList.map((item, index) => {
                      return (
                        <div key={index} className='comment flex gap-6 items-center justify-start'>
                          <span className="commenter font-bold w-1/4 overflow-hidden">
                            {(item.postedby._id == JSON.parse(localStorage.getItem("user"))._id) ?
                              <NavLink to={`/profile`} draggable="false">
                                {`@${item.postedby.userName}`}
                              </NavLink>
                              :
                              <NavLink to={`/profile/${item.postedby._id}`} draggable="false">
                                {`@${item.postedby.userName}`}
                              </NavLink>}
                          </span>
                          <span className="comment-text w-3/4">{item.comment}</span>
                        </div>
                      )
                    }
                    )}
                  </div>
                </div>
                <div className='footer flex gap-5 px-1'>
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
                </div>
                <div className="commentinput flex py-4 px-1 gap-1">
                  <textarea className='input_comment' draggable="false" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                  <button className='py-3 post_button hover:font-bold' onClick={() => makeComment(comment, post_id)}>Post</button>
                </div>
              </div>
            </div>

          </div>
        </> : null
      }
    </>
  )
}

export default Post