const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");


async function createMusic(req, res) {
    try {
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

        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (!req.files || !req.files.audioFile) {
            return res.status(400).json({ message: "Audio file is required" });
        }

        const file = req.files.audioFile;

        // Use file.data for express-fileupload
        const result = await uploadFile(file.data.toString("base64"), file.name);

        if (!result || !result.url) {
            return res.status(500).json({ message: "File upload failed" });
        }

        const music = await musicModel.create({ title, artist: id, uri: result.url });

        return res.status(201).json({
            message: "Music created successfully", music: {
                title: music.title,
                artist: music.artist,
                uri: music.uri,
                _id: music._id,
            }
        });
    } catch (error) {
        console.error("Error creating music:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function createAlbum(req, res) {
    try {
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

        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        if (!req.files || !req.files.audioFile) {
            return res.status(400).json({ message: "Audio file is required" });
        }

        const file = req.files.audioFile;

        // Use file.data for express-fileupload
        const result = await uploadFile(file.data.toString("base64"), file.name);

        if (!result || !result.url) {
            return res.status(500).json({ message: "File upload failed" });
        }

        const music = await musicModel.create({ title, artist: id, uri: result.url });

        return res.status(201).json({
            message: "Music created successfully", music: {
                title: music.title,
                artist: music.artist,
                uri: music.uri,
                _id: music._id,
            }
        });
    } catch (error) {
        console.error("Error creating music:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
module.exports = { createMusic };