const User = require("../model/userSchema");
const bcrypt = require("bcrypt");

const userCreateController = async (req, res) => {
    try {
        const { username, email, password, address,  dob, } = req.body;

        console.log("Received data - Username:", username, ", Email:", email, ", Password:", password,  "address:", address,  "dob",  dob);

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User created successfully!",
            user: newUser
        });

    } catch (error) {
        console.error("Error creating user:", error);  
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = userCreateController;
