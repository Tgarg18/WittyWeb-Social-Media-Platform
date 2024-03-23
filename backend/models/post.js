const { mongoose } = require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    postedby:{
        type: ObjectId,
        ref: "USER",
        // required: true
    },
    image:{
        type: String,
        default: "no photo"
    },
    caption:{
        type: String,
        required: true
    }
});
mongoose.model("POST", postSchema)