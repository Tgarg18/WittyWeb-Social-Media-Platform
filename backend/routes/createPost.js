const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST");


router.post("/createPost", requireLogin, (req, res) => {
    const { caption, content_pic } = req.body;
    if (!content_pic && !caption) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    console.log(req.user);
    console.log(content_pic);
    const post = new POST({
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
        .then(posts => { res.json(posts) })
        .catch(err => console.log(err))
})

router.get("/profile", requireLogin, (req, res) => {
    POST.find({ postedby: req.user._id })
        .populate("postedby", "_id userName name")
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
})

router.put("/like", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedby", "_id userName")
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(422).json({ error: err });
        })
})

router.put("/unlike", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedby", "_id userName")
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(422).json({ error: err });
        })
})

router.put("/dislike", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { dislikes: req.user._id }
    }, {
        new: true
    }).populate("postedby", "_id userName")
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(422).json({ error: err });
        })
})

router.put("/undislike", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { dislikes: req.user._id }
    }, {
        new: true
    }).populate("postedby", "_id userName")
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(422).json({ error: err });
        })
})

router.post('/getlikedby', requireLogin, (req, res) => {
    POST.find({ _id: req.body.postId })
        .populate("likes", "_id userName")
        .then(result => {
            res.json(result[0].likes);
        })
        .catch(err => {
            res.status(422).json({ error: err });
        })
})

router.post('/getdislikedby', requireLogin, (req, res) => {
    POST.find({ _id: req.body.postId })
        .populate("dislikes", "_id userName")
        .then(result => {
            res.json(result[0].dislikes);
        })
        .catch(err => {
            res.status(422).json({ error: err });
        })
})

router.put('/makecomment', requireLogin, (req, res) => {
    const comment = {
        comment: req.body.text,
        postedby: req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    }).populate("comments.postedby", "_id userName")
        .then(result => {
            console.log(result.comments);
            res.json(result.comments);
        }).catch(err => {
            res.status(422).json({ error: err });
        })
})

router.post('/showcomments', requireLogin, (req, res) => {
    POST.find({ _id: req.body.postId })
        .populate("comments.postedby", "_id userName")
        .then(result => {
            res.json(result[0].comments);
        }).catch(err => {
            res.status(422).json({ error: err });
        })
})

module.exports = router