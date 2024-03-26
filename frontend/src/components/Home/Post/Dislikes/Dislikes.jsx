import React, { useState, useEffect } from 'react'
import './Dislikes.css'
import { RiCloseLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

const Dislikes = ({ post_id, setShowDislikes }) => {
  const [dislikedData, setDislikedData] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/getdislikedby", {
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
        setDislikedData(data)
      })
  }, [])
  return (
    <div className="darkBg" onClick={() => setShowDislikes(false)}>
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h1 className="heading font-bold">Disliked by: {dislikedData.length}</h1>
          </div>
          <div className="closeBtn">
            <button onClick={() => setShowDislikes(false)}>
              <RiCloseLine></RiCloseLine>
            </button>
          </div>
          <div className="modalContent">
            {dislikedData.map((item) => {
              return (
                <div className="likedBy" key={item._id}>
                  <p className="font-bold text-left">
                    {(item._id == JSON.parse(localStorage.getItem("user"))._id) ?
                      <NavLink draggable="false" to={`/profile`}>
                        {item.userName}
                      </NavLink>
                      :
                      <NavLink draggable="false" to={`/profile/${item._id}`}>
                        {item.userName}
                      </NavLink>}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dislikes