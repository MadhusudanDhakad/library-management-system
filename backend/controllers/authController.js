const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  const { username, password, role, permissions } = req.body;

  try {
    console.log("Incoming request data:", req.body);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({ username, password: hashedPassword, role, permissions });
    await user.save();

    console.log("User Registered:", user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ 
        id: user._id, 
        role: user.role 
    }, 
    process.env.JWT_SECRET, { 
        expiresIn: "1h" 
    });

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

