import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

const ChangePassword = () => {
    const [newpassword, setNewpassword] = useState("")
    const [confirmnewpassword, setConfirmnewpassword] = useState("")

    const notifyError = () => toast.error('Something went wrong!')
    const notifySame = () => toast.error('Both the passwords must be same!')
    const notifyPassword = () => toast.warning('Password must be atleast 8 character long and must contain alteast one uppercase letter, one lowercase letter, one number and one special character!')

    const notifySuccessfulChange = () => toast.success('Password Changed Successfully!')
    const navigate = useNavigate()

    const saveChangedPassword = () => {
        const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (newpassword != confirmnewpassword) {
            notifySame()
            setNewpassword("")
            setConfirmnewpassword("")
            return
        }
        else if (!(passwordRegex.test(newpassword))) {
            notifyPassword()
            setNewpassword("")
            setConfirmnewpassword("")
            return
        }
        else {
            fetch("http://localhost:5000/changePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                },
                body: JSON.stringify({
                    userid: JSON.parse(localStorage.getItem("user"))._id,
                    newpassword: newpassword,
                    confirmnewpassword: confirmnewpassword
                })
            }).then(res => res.json())
                .then((result) => {
                    if (result.Status == "Password Changed Successfully") {
                        notifySuccessfulChange()
                        navigate("/profile")
                    }
                    else {
                        notifyError()
                        setNewpassword("")
                        setConfirmnewpassword("")
                        return
                    }
                })
        }
    }

    return (
        <>
            <div className="profile text-center flex flex-col gap-8">
                <h1 className='temp text-3xl font-bold'>Change Your Password</h1>
                <div className='flex flex-col gap-6 min-w-min'>
                    <div className='flex items-center justify-around'>
                        <div className='text-lg font-semibold w-1/5 text-left'>New Password</div>
                        <input type='password' value={newpassword} onChange={(e) => setNewpassword(e.target.value)} className="bio2 mx-0 w-3/5 py-2 px-1" placeholder='Enter your new Password'></input>
                    </div>
                    <div className='flex items-center justify-around'>
                        <div className='text-lg font-semibold w-1/5 text-left'>Confirm Password</div>
                        <input type='password' value={confirmnewpassword} onChange={(e) => setConfirmnewpassword(e.target.value)} className="bio2 mx-0 w-3/5 py-2 px-1" placeholder='Re-enter your Password'></input>
                    </div>
                    <div className="flex gap-3 justify-center mt-4 px-4">
                        <div className='flex gap-2'>
                            <button className='editinfo editbutton w-60' onClick={() => saveChangedPassword()}>Save Password</button>
                            <NavLink to={"/profile"} draggable="false">
                                <button className='editinfo editbutton w-60 bg-red-600 text-white hover:bg-red-400'>Cancel</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword