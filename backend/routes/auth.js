const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const USER = mongoose.model("USER");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../key");
const requireLogin = require("../middlewares/requireLogin");

router.post("/signup", (req, res) => {
    const userNameRegex = new RegExp("^[A-Za-z][A-Za-z0-9_]{7,29}$")
    const nameRegex = new RegExp("^[a-zA-Z]+(?:\s[a-zA-Z]+)*$")
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const { name, userName, email, password, cpassword } = req.body;
    if (!name || !userName || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    else if (!(userNameRegex.test(userName))) {
        return res.status(422).json({ error: "Invalid username" });
    }
    else if (!(nameRegex.test(name))) {
        return res.status(422).json({ error: "Invalid name" });
    }
    else if (!(passwordRegex.test(password))) {
        return res.status(422).json({ error: "Enter Strong Password" });
    }
    else if (password != cpassword) {
        return res.status(422).json({ error: "Passwords do not match" });
    } else {
        USER.findOne({ email: email }).then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with that email. Try loging in" });
            }
            else {
                USER.findOne({ userName: userName }).then((savedUser) => {
                    if (savedUser) {
                        return res.status(422).json({ error: "Username already exists. Try a different username." });
                    }
                    else {
                        bcrypt.hash(password, 10).then((hashedPwd) => {
                            const user = new USER({
                                name,
                                userName,
                                email,
                                password: hashedPwd,
                                cpassword: hashedPwd
                            })
                            user.save().then(() => {
                                res.send({ Status: "Sign Up Successful" });
                            }).catch((err) => {
                                console.log(err);
                            })
                        })
                    }
                })
            }
        })

    }
})

router.post("/signin", (req, res) => {
    const { userName, email, password } = req.body;
    if (!email || !password || !userName) {
        return res.status(422).json({ error: "Please fill all the fields" })
    }
    USER.findOne({ userName: userName }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid username" })
        }
        if (savedUser.email !== email) {
            return res.status(422).json({ error: "Invalid email" })
        }
        bcrypt.compare(password, savedUser.password)
            .then((doMatch) => {
                if (doMatch) {
                    const token = jwt.sign({ _id: savedUser._id }, jwt_secret)
                    const { _id, name, userName, email } = savedUser
                    res.json({ token, user: { _id, name, userName, email } })
                    return "Sign In Successfully"
                } else {
                    return res.status(422).json({ error: "Invalid password" })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    })
})

router.post("/changeuserdata", requireLogin, (req, res) => {
    const { userid, bio, gender, phone_number } = req.body
    USER.findOne({ _id: userid })
        .then(user => {
            user.bio = bio
            user.gender = gender
            user.phone_number = phone_number
            user.save()
                .then(() => {
                    res.json({ Status: "Data Updated Successfully" })
                }).catch(error => {
                    res.json(error)
                })
        })

})

router.post("/changeuserprofilephoto", requireLogin, (req, res) => {
    const { userid, profile_pic } = req.body
    USER.findOne({ _id: userid })
        .then(user => {
            user.profile_photo = profile_pic
            user.save()
                .then(() => {
                    res.json({ Status: "Profile Photo Updated Successfully" })
                }).catch(error => {
                    res.json(error)
                })
        })

})

router.post("/getuserdata", requireLogin, (req, res) => {
    USER.find({ _id: req.body.userid })
        .select("-password")
        .select("-cpassword")
        .select("-date")
        .select("-followers")
        .select("-following")
        .then(user => {
            res.json(user)
        })
        .catch(error => {
            res.json(error)
        })
})

router.post("/removephoto", requireLogin, (req, res) => {
    USER.findOne({ _id: req.body.userid })
        .then(user => {
            user.profile_photo = ""
            user.save()
                .then(() => {
                    res.json({ Status: "Profile Photo Removed Successfully" })
                }).catch(error => {
                    res.json(error)
                })
        })
})

router.post("/changePassword", requireLogin, (req, res) => {
    const { userid, newpassword, confirmnewpassword } = req.body
    USER.findOne({ _id: userid })
        .then(user => {

            bcrypt.hash(newpassword, 10).then((hashedPwd) => {
                user.password = hashedPwd
                user.cpassword = hashedPwd
                user.save()
                    .then(() => {
                        res.json({ Status: "Password Changed Successfully" })
                    }).catch(error => {
                        res.json(error)
                    })
            })

        })
})

module.exports = router;