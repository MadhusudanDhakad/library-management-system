const express = require("express");
const { addMembership, updateMembership } = require("../controllers/membershipController");

const router = express.Router();

// Add membership
router.post("/add", addMembership);

// Update membership
router.put("/update", updateMembership);

module.exports = router;