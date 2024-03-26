import React from 'react'
import './OtherProfile.css'
import { useState, useEffect } from 'react';
import Post from '../Post/Post';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { NavLink, useNavigate } from 'react-router-dom';
import { OtherUserContext } from '../../../Context/OtherUserContext'
import Followers from './Followers/Followers';
import Followings from './Followings/Followings';

const OtherProfile = () => {
    const { userid } = useParams()
    const [post, setPost] = useState([])
    const [user, setUser] = useState("")

    const [followstatus, setFollowstatus] = useState(false)
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])

    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    const notifysignin = () => toast.info('Please sign in first!')
    const notifyunfollowed = () => toast.success('Unfollowed!')
    const notifyfollowed = () => toast.success('Followed!')
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/user/${userid}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            .then(res => res.json())
            .then(result => {
                const temp = result.followers.find(obj => obj._id == JSON.parse(localStorage.getItem("user"))._id);
                if (temp) {
                    setFollowstatus(true)
                }
                else {
                    setFollowstatus(false)
                }
                setUser(result.user)
                setPost(result.post)
                setFollowers(result.followers)
                setFollowing(result.following)
            })
    }, [])


    const follow = (userid) => {
        fetch("http://localhost:5000/follow", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error == "You must be logged in") {
                    notifysignin()
                    navigate('/signin')
                    return
                }
                setFollowstatus(true)
                setFollowers(data.followerArray)
                notifyfollowed()
            })
    }
    const unfollow = (userid) => {
        fetch("http://localhost:5000/unfollow", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                followId: userid
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error == "You must be logged in") {
                    notifysignin()
                    navigate('/signin')
                    return
                }
                setFollowstatus(false)
                setFollowers(data.followerArray)
                notifyunfollowed()
            })
    }

    return (
        <>
            <OtherUserContext.Provider value={{followers, setShowFollowers, following, setShowFollowing, userid}}>
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
                        <div className='followers flex flex-col cursor-pointer' onClick={e => setShowFollowers(true)}>
                            <div className='font-semibold text-xl'>{followers.length}</div>
                            <div>Followers</div>
                        </div>
                        <div className='following flex flex-col cursor-pointer' onClick={e => setShowFollowing(true)}> 
                            <div className='font-semibold text-xl'>{following.length}</div>
                            <div>Following</div>
                        </div>
                    </div>
                    <div className="bio">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae minima in nisi possimus, tempore sint blanditiis perspiciatis nihil error alias optio aut doloremque sunt mollitia nesciunt natus eum laudantium quae.</div>
                    <div className="editinfo">
                        {(followstatus) ?
                            <button onClick={e => unfollow(userid)} className='editbutton2 hover:font-bold'>Following</button>
                            :
                            <button onClick={e => follow(userid)} className='editbutton2 bg-blue-700 text-white hover:bg-blue-500 hover:font-bold'>Follow</button>
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
                {showFollowers && <Followers userid={userid} setShowFollowers={setShowFollowers} />}
                {showFollowing && <Followings setShowFollowing={setShowFollowing} userid={userid} />}
            </OtherUserContext.Provider>
        </>
    )
}

export default OtherProfile