const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST");


router.post("/createPost",requireLogin, (req, res) => {
    const { caption, content_pic } = req.body;
    if (!content_pic && !caption) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    console.log(req.user);
    console.log(content_pic);
    const post = new POST ({
        postedby: req.user,
        caption: caption,
        image: content_pic
    })
    post.save().then((result) => {
        return res.json({ post: result })
    }).catch(err => {
        console.log(err);
    })
}) 

router.get("/", (req, res) => {
    POST.find()
    .populate("postedby", "_id userName name")
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

module.exports = router