const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST");


router.post("/createPost",requireLogin, (req, res) => {
    const { caption, image } = req.body;
    if (!image && !caption) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    req.user
    const post = new POST ({
        postedby: req.user,
        caption,
        image
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => {
        console.log(err);
    })
}) 

module.exports = router