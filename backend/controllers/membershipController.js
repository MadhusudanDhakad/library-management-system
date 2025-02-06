const User = require("../models/User");

// Add membership
exports.addMembership = async (req, res) => {
  const { username, membershipType } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.membership.type = membershipType;
    user.membership.expiryDate = new Date(new Date().setMonth(new Date().getMonth() + (membershipType === "6 months" ? 6 : membershipType === "1 year" ? 12 : 24)));

    await user.save();
    res.status(200).json({ message: "Membership added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding membership", error: err.message });
  }
};

// Update membership
exports.updateMembership = async (req, res) => {
  const { membershipNumber, membershipType } = req.body;

  try {
    const user = await User.findById(membershipNumber);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.membership.type = membershipType;
    user.membership.expiryDate = new Date(new Date().setMonth(new Date().getMonth() + (membershipType === "6 months" ? 6 : membershipType === "1 year" ? 12 : 24)));

    await user.save();
    res.status(200).json({ message: "Membership updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating membership", error: err.message });
  }
};