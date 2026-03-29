const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


async function registerUser(req, res) {
    const { username, email, password, role } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });
    if (isUserAlreadyExists) {
        return res.status(409).json({ message: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({ username, email, password: hash  , role });
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 60 * 60 * 1000 });
    
    return res.status(201).json({
        message: "User registered successfully", user: {
            username: user.username,
            email: user.email,
            role: user.role,
            _id: user._id,
        }
    });
}


async function loginUser(req, res) {
    const { username, email, password } = req.body;
    
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 60 * 60 * 1000 });
    return res.status(200).json({
        message: "User logged in successfully", user: {
            username: user.username,
            email: user.email,
            role: user.role,
            _id: user._id,
        }
    });
}
module.exports = { registerUser, loginUser };