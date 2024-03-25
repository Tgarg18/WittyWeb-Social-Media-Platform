import React from 'react'
import './OtherProfile.css'
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { useState, useEffect } from 'react';
import Post from '../Post/Post';
import { useParams } from 'react-router-dom';

const OtherProfile = () => {
    const {userid} = useParams()
    const [post, setPost] = useState([])
    const [user, setUser] = useState("")
    useEffect(() => {
        fetch(`http://localhost:5000/user/${userid}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            .then(res => res.json())
            .then(result => {
                setUser(result.user)
                setPost(result.post)
            })
    }, [])

    return (
        <>
            <div className="profile text-center flex flex-col gap-8">
                <h1 className='temp text-3xl font-bold'></h1>
                <div className='flex items-center justify-center gap-6'>
                    <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='myimage' draggable="false" />
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='name text-3xl '>{user.name}</h1>
                        <h1 className='username text-xl'>@{user.userName}</h1>
                        <h2 className='gender text-lg'>She/Her</h2>
                    </div>
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
                </div>
                <div className="bio">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae minima in nisi possimus, tempore sint blanditiis perspiciatis nihil error alias optio aut doloremque sunt mollitia nesciunt natus eum laudantium quae.</div>
                <div className="editinfo">
                    {(true) ?
                        <button className='editbutton2'>Follow</button>
                        :
                        <button className='editbutton2'>Following</button>
                    }
                </div>
                <div className="post_bar">
                    <div className=' text-xl font-bold'>Posts</div>
                </div>
                <div className='post-container gap-4'>
                    {post.map((data) => {
                        return (
                            <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@${data.postedby.userName}`} caption={data.caption} content={data.image} post_id={data._id} key={data._id} liked={data.likes.includes(JSON.parse(localStorage.getItem("user"))._id)} disliked={data.dislikes.includes(JSON.parse(localStorage.getItem("user"))._id)} count_likes={data.likes.length} count_dislikes={data.dislikes.length} data={data} count_comments={data.comments.length} deleteOption={true} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default OtherProfile