const { mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    postedby:{
        type: ObjectId,
        ref: "USER",
    },
    image:{
        type: String,
    },
    caption:{
        type: String,
    },
    likes: [{
        type: ObjectId,
        ref: "USER"
    }],
    dislikes: [{
        type: ObjectId,
        ref: "USER"
    }]
});
mongoose.model("POST", postSchema)