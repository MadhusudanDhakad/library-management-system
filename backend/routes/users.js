const express = require("express");
const { listUsers, getUserDetails } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// List all users (Admin only)
router.get("/", authMiddleware, listUsers);

// Fetch logged-in user details
router.get("/me", authMiddleware, getUserDetails);

module.exports = router;