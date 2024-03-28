import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import './PostsPage.css'

const PostsPage = () => {
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
            <div className="container flex flex-col-reverse justify-start items-center gap-4 z-0">
                {postData.map((data) => {
                    return (
                        <Post url={data.postedby.profile_photo} username={`@${data.postedby.userName}`} caption={data.caption} content={data.image} post_id={data._id} key={data._id} liked={(localStorage.getItem('jwt'))?
                        data.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                        :
                        false
                } disliked={(localStorage.getItem('jwt'))?
                        data.dislikes.includes(JSON.parse(localStorage.getItem("user"))._id)
                        :
                        false
                } count_likes={data.likes.length} count_dislikes={data.dislikes.length} data={data} count_comments={data.comments.length} deleteOption={false} />
                    )
                })}
            </div>
        </>
    )
}

export default PostsPage