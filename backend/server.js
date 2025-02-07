const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth")
const bookRoutes = require("./routes/books")
const userRoutes = require("./routes/users")
const membershipRoutes = require("./routes/membership")


dotenv.config()
connectDB();

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
const cors = require('cors');
app.use(cors())
app.use(express.json())

// Routes 
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/memberships", membershipRoutes);


app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
