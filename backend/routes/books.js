const express = require("express");
const { listBooks, requestBook, listBookRequests, issueBook, addBook } = require("../controllers/bookController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// List all books
router.get("/", authMiddleware, listBooks);

// Add a new book (Admin only)
router.post("/", authMiddleware, addBook);

// Request a book
router.post("/request", authMiddleware, requestBook);

// List all book requests (Admin only)
router.get("/requests", authMiddleware, listBookRequests);

// Issue a book to a user (Admin only)
router.post("/issue", authMiddleware, issueBook);

module.exports = router;