const User = require("../model/userSchema");

const userUpdateController = async (req, res) => {
  try {
    const { username, email, address, dob } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (address) user.address = address;
    if (dob) user.dob = String(dob); 

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = userUpdateController;
