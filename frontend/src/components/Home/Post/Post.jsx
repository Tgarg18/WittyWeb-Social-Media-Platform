import React from 'react'
import './Post.css'

const Post = ({username,content}) => {
  return (
    <>
    <div className='container flex flex-col'>
        <div className='header flex'>
            <div className='profile_pic'>{`jhgbhj`}</div>
            <div className='username'>{username}</div>
        </div>
        <div className="content">
            {content}
        </div>
        <div className='footer'>
            <div className='likes'></div>
            <div className='comments'></div>
            <div className='share'></div>
        </div>
    </div>
    </>
  )
}

export default Post