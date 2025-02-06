const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
  role: { 
    type: String, 
    enum: ["admin", "user"], 
    default: "user" 
},
  // membership: {
  //   type: { 
  //       type: String, 
  //       enum: ["6 months", "1 year", "2 years"], 
  //       default: "6 months" 
  //   },
  //   expiryDate: { 
  //       type: Date 
  //   },
  // },
  // permissions: [{ type: String }],
  // isAdmin: {
    //   type: String,
    //   default: false
    // },
    
  bookRequests: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Book" 
  }],
  issuedBooks: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Book" }],
});

module.exports = mongoose.model("User", userSchema);