import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import './PostsPage.css'

const PostsPage = () => {
    // const temp = 2;
    const [postData, setPostData] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/")
            .then(res => res.json())
            .then(data => {
                setPostData(data)
            })
    }, [])
    return (
        <>
            <div className="container flex flex-col justify-start items-center gap-4">
                {postData.map((data) => {
                    return (
                        <Post url={`https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} username={`@${data.postedby.userName}`} caption={data.caption} content={data.image} post_id={data._id} key={data._id} liked={data.likes.includes(JSON.parse(localStorage.getItem("user"))._id)} disliked={data.dislikes.includes(JSON.parse(localStorage.getItem("user"))._id)} count_likes={data.likes.length} count_dislikes={data.dislikes.length} />
                    )
                })}
            </div>
        </>
    )
}

export default PostsPage