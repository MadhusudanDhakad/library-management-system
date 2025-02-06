const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  book: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Book", 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], default: "pending" 
  },
});

module.exports = mongoose.model("Request", requestSchema);
