import React from 'react'
import './Post.css'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const Post = ({ url, username, caption, content }) => {
  return (
    <>
      <div className='postcontainer flex flex-col'>
        <div className='header flex items-center'>
          <div className='profile_pic flex'>
            <img src={url} alt="" className='image' />
          </div>
          <div className='username'>
            {username}
          </div>
        </div>
        <div className="content">
          {caption}
          <img src={content} alt="" className='postimage' />
        </div>
        <div className='footer flex gap-5'>
          <div className='likes flex flex-col justify-center items-center'>
            <div>10</div>
            {(false)?<ThumbUpAltIcon fontSize='small' />:<ThumbUpOffAltIcon fontSize='small' />}
          </div>
          <div className='Dislikes flex flex-col justify-center items-center'>
            <div>10</div>
            {(false)?<ThumbDownAltIcon fontSize='small' />:<ThumbDownOffAltIcon fontSize='small' />}
          </div>
          <div className='comments flex flex-col justify-center items-center'>
            <div>20</div>
            <ChatBubbleOutlineOutlinedIcon fontSize='small' />
          </div>
          <div className='share'></div>
        </div>
      </div>
    </>
  )
}

export default Post