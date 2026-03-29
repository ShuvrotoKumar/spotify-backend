const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");


async function createMusic(req, res) {
    

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { id, role } = decodedToken;
    if (role !== "artist") {
        return res.status(403).json({ message: "Forbidden" });
    }
    const { title, artist,uri} = req.body;
    const music = await musicModel.create({ title, artist,uri });
    return res.status(201).json({ message: "Music created successfully", music });
}