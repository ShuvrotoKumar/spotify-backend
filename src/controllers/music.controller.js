const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.service");
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
    const { title} = req.body;

    const file = req.files.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({ title, artist:id,uri:result.url });

    return res.status(201).json({ message: "Music created successfully", music:{
        title:music.title,
        artist:music.artist,
        uri:music.uri,
        _id:music._id,
    } });
}