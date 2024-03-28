import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'

const SavedPosts = () => {

  const [savedposts, setSavedposts] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/getsavedposts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        userid: JSON.parse(localStorage.getItem("user"))._id
      })
    }).then(res => res.json())
      .then(result => {
        setSavedposts(result)
      })
  },[])
  return (
    <>
      <div className="profile text-center flex flex-col gap-8">
        <h1 className='temp text-3xl font-bold'>Saved Posts</h1>
        <div className="container flex flex-col-reverse justify-end items-center gap-4 z-0 border-none">
          {console.log(savedposts)}
          {savedposts.map((data) => {
            return (
              <Post url={data.postedby.profile_photo} username={`@${data.postedby.userName}`} caption={data.caption} content={data.image} post_id={data._id} key={data._id} liked={(localStorage.getItem('jwt')) ?
                data.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                :
                false
              } disliked={(localStorage.getItem('jwt')) ?
                data.dislikes.includes(JSON.parse(localStorage.getItem("user"))._id)
                :
                false
              } count_likes={data.likes.length} count_dislikes={data.dislikes.length} data={data} count_comments={data.comments.length} deleteOption={false} />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default SavedPosts