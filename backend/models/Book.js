const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: {
         type: String, 
         required: true 
    },
    type: { 
        type: String, 
        enum: ["fiction", "non-fiction", "self-help", "education-academic", "poetry-drama", "childrens-youth", "comic-graphic"], 
        default: "fiction" 
    },
    serialNo: {
         type: String, 
         required: true, 
         unique: true 
    },
    isAvailable: { 
        type: Boolean, 
        default: true 
    },
    requestedBy: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User" 
    },
    issuedTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
  });

module.exports = mongoose.model("Book", bookSchema)

