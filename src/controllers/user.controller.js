const userModel = require("../models/user.model");

async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User fetched successfully",
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
                _id: user._id,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { getUserById };
