import React, { useState, useEffect } from 'react'
import { RiCloseLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';


const Followers = ({ setShowFollowers, userid }) => {

  const [follower_array, setFollower_array] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/getfollowdata",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify({
        _id: userid
      })
    }).then(res => res.json())
    .then(result => {
      setFollower_array(result.followerList)
    })
  }, [])

  return (
    <>
      <div className="darkBg" onClick={() => setShowFollowers(false)}></div>
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h1 className="heading font-bold">Followers: {follower_array.length}</h1>
          </div>
          <div className="closeBtn">
            <button onClick={() => setShowLikes(false)}>
              <RiCloseLine></RiCloseLine>
            </button>
          </div>
          <div className="modalContent">
            {follower_array.map((item) => {
              return (
                <div className="likedBy" key={item._id}>
                  <p className="font-bold text-left">
                    {item._id == JSON.parse(localStorage.getItem("user"))._id ?
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
    </>
  );
}

export default Followers