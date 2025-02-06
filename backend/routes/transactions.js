const express = require("express");
const { returnBook, payFine } = require("../controllers/transactionController");

const router = express.Router();

// Return book
router.post("/return", returnBook);

// Pay fine
router.put("/:id/payfine", payFine);

module.exports = router;