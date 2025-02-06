const User = require("../models/User");

// List all users
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password from the response
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

// Fetch the logged-in user's issued books
// Fetch logged-in user details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("issuedBooks", "title author");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // res.status(200).json(user);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      issuedBooks: user.issuedBooks,  // Ensure this field exists
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user details", error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, role, permissions } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username;
    user.role = role;
    user.permissions = permissions;

    await user.save();
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};


