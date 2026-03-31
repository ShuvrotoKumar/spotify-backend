const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");


async function createMusic(req, res) {
    try {
        const { id } = req.user;

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
        const { id } = req.user;

        const { title, musicIds, musics } = req.body;
        const ids = musicIds || musics;

        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: "Music IDs (musicIds or musics) must be provided as an array" });
        }

        const album = await albumModel.create({ title, artist: id, musics: ids });

        return res.status(201).json({
            message: "Album created successfully",
            album: {
                title: album.title,
                artist: album.artist,
                musics: album.musics,
                _id: album._id,
            }
        });
    } catch (error) {
        console.error("Error creating music:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function getAllMusic(req, res) {
    try {
        const musics = await musicModel.find();
        return res.status(200).json({ message: "All music fetched successfully", musics: musics });
    } catch (error) {
        console.error("Error getting all music:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
module.exports = { createMusic, createAlbum, getAllMusic };