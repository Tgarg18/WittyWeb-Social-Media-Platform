import React, { useEffect, useState } from 'react'
import './Likes.css'
import { RiCloseLine } from "react-icons/ri";


const Likes = ({ setShowLikes, post_id }) => {
  const [likedData, setLikedData] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/getlikedby", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        postId: post_id
      })
    })
      .then(res => res.json())
      .then(data => {
        setLikedData(data)
      })
  }, [])

  return (
    <div className="darkBg" onClick={() => setShowLikes(false)}>
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h1 className="heading font-bold">Liked by: </h1>
          </div>
          <div className="closeBtn">
            <button onClick={() => setShowLikes(false)}>
              <RiCloseLine></RiCloseLine>
            </button>
          </div>
          <div className="modalContent">
            {likedData.map((item) => {
              return (
                <div className="likedBy" key={item._id}>
                  <p className="font-bold text-left">{item.userName}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Likes