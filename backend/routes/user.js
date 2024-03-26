const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const POST = mongoose.model("POST");
const USER = mongoose.model("USER");

router.get("/user/:userid", requireLogin, (req, res) => {
    USER.findOne({ _id: req.params.userid })
        .select("-password")
        .select("-cpassword")
        .populate("followers", "_id userName name profile_photo")
        .populate("following", "_id userName name profile_photo")
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "user not found" })
            }
            POST.find({ postedby: req.params.userid })
                .populate("postedby", "_id userName name ")
                .then(post => {
                    const followers = user.followers
                    const following = user.following
                    const profilephoto = user.profile_photo
                    const profilegender = user.gender
                    const profilebio = user.bio
                    res.json({ user, post, followers,following,profilephoto,profilegender,profilebio })
                })
                .catch(err => {
                    res.status(422).json({ error: err })
                })
        })
})

router.put("/follow", requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    }).populate("followers","_id userName name")
    .then(updatedUser=>{
        if(!updatedUser){
            return res.status(422).json({error:"user not found"})
        }
        USER.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, {
            new: true
        }).populate("following", "_id userName name followers")
        .populate("followers", "_id userName name")
        .then(result => {
            const followerArray = updatedUser.followers
            res.json({result,followerArray})
        }).catch(err => {
            res.status(422).json({ error: err })
        })
    }).catch(err => {
        res.status(422).json({ error: err })
    })
})

router.put("/unfollow", requireLogin, (req, res) => {
    USER.findByIdAndUpdate(req.body.followId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    }).populate("followers","_id userName name")
    .then(updatedUser=>{
        if(!updatedUser){
            return res.status(422).json({error:"user not found"})
        }
        USER.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.followId }
        }, {
            new: true
        }).populate("following", "_id userName name followers")
        .populate("followers", "_id userName name")
        .then(result => {
            const followerArray = updatedUser.followers
            res.json({result,followerArray})
        }).catch(err => {
            res.status(422).json({ error: err })
        })
    }).catch(err => {
        res.status(422).json({ error: err })
    })
})

router.post("/getfollowdata",requireLogin,(req,res)=>{
    USER.findById(req.body._id)
    .populate("following","_id userName name profile_photo")
    .populate("followers","_id userName name profile_photo")
    .select("-password")
    .select("-cpassword")
    .then(result=>{
        const followerList = result.followers
        const followingList = result.following
        res.json({followerList,followingList})
    }).catch(err=>{
        res.status(422).json({error:err})
    })
})

module.exports = router