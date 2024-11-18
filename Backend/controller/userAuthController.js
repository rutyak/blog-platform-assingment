const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCreateController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check for JWT secret
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables.");
            return res.status(500).json({ message: "Server error. Please try again later." });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "Login successful", token, user });

    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
    }
};

module.exports = userCreateController;
