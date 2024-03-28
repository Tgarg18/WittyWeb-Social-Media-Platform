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
        {/* <div className='flex flex-col gap-6 min-w-min'>
          <div className='flex items-center justify-around'>
            <div className='text-lg font-semibold w-1/5 text-left'>New Password</div>
            <div className='relative flex items-center w-3/5'>
              {(showpassword) ?
                <>
                  <input type='text' value={newpassword} onChange={(e) => setNewpassword(e.target.value)} className="bio2 mx-0 w-full py-2 px-1 pr-11" placeholder='Enter your new Password' />
                  <VisibilityIcon className="me absolute right-3" style={{ cursor: 'pointer' }} onClick={() => setShowpassword(!showpassword)} />
                </>
                :
                <>
                  <input type='password' value={newpassword} onChange={(e) => setNewpassword(e.target.value)} className="bio2 mx-0 w-full py-2 pr-11 px-1" placeholder='Enter your new Password' />
                  <VisibilityOffIcon className="me absolute right-3" style={{ cursor: 'pointer' }} onClick={() => setShowpassword(!showpassword)} />
                </>
              }
            </div>
          </div>
          <div className='flex items-center justify-around'>
            <div className='text-lg font-semibold w-1/5 text-left'>Confirm Password</div>
            <div className='relative flex items-center w-3/5'>
              {(showcpassword) ?
                <>
                  <input type='text' value={confirmnewpassword} onChange={(e) => setConfirmnewpassword(e.target.value)} className="bio2 mx-0 w-full py-2 px-1 pr-11" placeholder='Re-enter your Password' />
                  <VisibilityIcon className="me absolute right-3" style={{ cursor: 'pointer' }} onClick={() => setShowcpassword(!showcpassword)} />
                </>
                :
                <>
                  <input type='password' value={confirmnewpassword} onChange={(e) => setConfirmnewpassword(e.target.value)} className="bio2 mx-0 w-full py-2 px-1 pr-11" placeholder='Re-enter your Password' />
                  <VisibilityOffIcon className="me absolute right-3" style={{ cursor: 'pointer' }} onClick={() => setShowcpassword(!showcpassword)} />
                </>
              }
            </div>
          </div>
          <div className="flex gap-3 justify-center mt-4 px-4">
            <div className='flex gap-2'>
              <button className='editinfo editbutton w-60' onClick={() => saveChangedPassword()}>Save Password</button>
              <NavLink to={"/profile"} draggable="false">
                <button className='editinfo editbutton w-60 bg-red-600 text-white hover:bg-red-400'>Cancel</button>
              </NavLink>
            </div>
          </div>
        </div> */}
        <div className="container flex flex-col-reverse justify-start items-center gap-4 z-0">
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