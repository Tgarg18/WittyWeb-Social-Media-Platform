import React, { useEffect, useState } from 'react'
import "./EditInfo.css"
import { NavLink, useNavigate } from 'react-router-dom'
import usericon from '../../../assets/usericon.png'
import { toast } from "react-toastify";

const EditInfo = () => {
    const [flag, setFlag] = useState(true)
    const [profilePhoto, setProfilePhoto] = useState("")
    const [profileBio, setProfileBio] = useState("")
    const [profileGender, setProfileGender] = useState("")
    const [profilePhone, setProfilePhone] = useState("")

    const notifyError = () => toast.error('Something went wrong!')
    const notifySuccessfulChange = () => toast.success('Profile Updated Successfully!')
    const navigate = useNavigate()


    const loadFile = (event) => {
        var output10 = document.getElementById('output10');
        output10.src = URL.createObjectURL(event.target.files[0]);

        output10.onload = function () {
            URL.revokeObjectURL(output10.src)
        }
    }

    useEffect(() => {
        fetch("http://localhost:5000/getuserdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                userid: JSON.parse(localStorage.getItem("user"))._id
            })
        }).then((res) => res.json())
            .then((data) => {
                setProfileBio(data[0].bio)
                setProfileGender(data[0].gender)
                setProfilePhone(data[0].phone_number)
                if (data[0].profile_photo != "") {
                    setProfilePhoto(data[0].profile_photo)
                }
                else {
                    setProfilePhoto(usericon)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const changeDetails = () => {
        fetch("http://localhost:5000/changeuserdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                userid: JSON.parse(localStorage.getItem("user"))._id,
                bio: profileBio,
                gender: profileGender,
                phone_number: profilePhone
            })
        }).then(res => res.json())
            .then(data => {
                if (data.Status == "Data Updated Successfully") {
                    const data2 = new FormData()
                    data2.append("file", profilePhoto)
                    data2.append("upload_preset", "wittyweb")
                    data2.append("cloud_name", "wittywebcloud")
                    fetch("https://api.cloudinary.com/v1_1/wittywebcloud/image/upload", {
                        method: "POST",
                        body: data2
                    }).then((res) => res.json())
                        .then(data => {
                            fetch("http://localhost:5000/changeuserprofilephoto", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                                },
                                body: JSON.stringify({
                                    userid: JSON.parse(localStorage.getItem("user"))._id,
                                    profile_pic: data.url
                                })
                            }).then(res => res.json())
                                .then(data => {
                                    if (data.Status == "Profile Photo Updated Successfully") {
                                        navigate("/profile")
                                        window.location.reload()
                                        notifySuccessfulChange()
                                    }
                                    else {
                                        notifyError()
                                    }
                                })
                        })
                }
                else {
                    notifyError()
                }
            })
    }

    const removePhoto = () => {
        fetch("http://localhost:5000/removephoto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify({
                userid: JSON.parse(localStorage.getItem("user"))._id
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.Status == "Profile Photo Removed Successfully") {
                    navigate("/profile")
                    window.location.reload()
                    notifySuccessfulChange()
                }
                else {
                    notifyError()
                }
            })
    }

    return (
        <>
            <div className="profile text-center flex flex-col gap-8">
                <h1 className='temp text-3xl font-bold'>Edit Your Profile</h1>
                <div className='flex flex-col gap-6 min-w-min'>
                    <div className='flex items-center justify-evenly gap-6'>
                        <div className='flex flex-col gap-3'>
                            <div className='text-2xl font-bold'>Change your Profile Photo</div>
                            <div><input type="file" accept='image/*' onChange={(e) => {
                                setFlag(false)
                                loadFile(e)
                                setProfilePhoto(e.target.files[0])
                            }} className='fileinput' /></div>
                            <div className="mt-7">
                                <button className='editinfo editbutton w-60' onClick={() => removePhoto()}>Remove Profile Photo</button>
                            </div>
                        </div>
                        <div className='qwerty'>
                            {(flag == true) ?
                                <img src={profilePhoto} id='output10' alt="" className={`myimage2 `} draggable="false" />
                                :
                                <img src={URL.createObjectURL(profilePhoto)} id='output10' alt="" className={`myimage2 `} draggable="false" />
                            }
                        </div>
                    </div>
                    <div className='flex items-center justify-around'>
                        <div className='text-lg font-semibold w-1/5 text-left'>Bio</div>
                        <textarea value={profileBio} onChange={(e) => setProfileBio(e.target.value)} className="bio bio2 mx-0 w-3/5 pt-1 px-1" placeholder='Write you bio'></textarea>
                    </div>
                    <div className='flex items-center justify-around'>
                        <div className='text-lg font-semibold w-1/5 text-left'>Gender</div>
                        <select value={profileGender} onChange={(e) => setProfileGender(e.target.value)} name="gender" id="gender" className='bio2 w-3/5 py-2'>
                            <option value="dummy" hidden>Choose the Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className='flex items-center justify-around'>
                        <div className='text-lg font-semibold w-1/5 text-left'>Phone Number</div>
                        <input type='text' value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} className="bio2 mx-0 w-3/5 py-2 px-1" placeholder='Write you Phone Number'></input>
                    </div>
                    <div className="flex gap-3 justify-between mt-4 px-4">
                        <div className='flex gap-2'>
                            <NavLink to={"/profile/editinfo"} draggable="false">
                                <button className='editinfo editbutton w-60' onClick={() => changeDetails()}>Save</button>
                            </NavLink>
                            <NavLink to={"/profile"} draggable="false">
                                <button className='editinfo editbutton w-60 bg-red-600 text-white hover:bg-red-400'>Cancel</button>
                            </NavLink>
                        </div>
                        <div>
                            <NavLink to={"/profile/editinfo/changepassword"} draggable="false">
                                <button className='editinfo editbutton w-60 bg-green-500 text-white hover:bg-green-300'>Change Password</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditInfo