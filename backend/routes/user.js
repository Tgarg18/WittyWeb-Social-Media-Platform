const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const POST = mongoose.model("POST");
const USER = mongoose.model("USER");

router.get("/user/:userid", requireLogin, (req, res) => {
    USER.findOne({ _id: req.params.userid })
        .select("-password")
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "user not found" })
            }
            POST.find({ postedby: req.params.userid })
                .populate("postedby", "_id userName name ")
                .exec()
                .then(post => {
                    res.json({ user, post })
                })
                .catch(err => {
                    res.status(422).json({ error: err })
                })
        })
})

module.exports = router