const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // album: {
    //     type: String,
    //     required: true,
    // },
    // genre: {
    //     type: String,
    //     required: true,
    // },
    // duration: {
    //     type: Number,
    //     required: true,
    // },
    // audioFile: {
    //     type: String,
    //     required: true,
    // },
    // coverImage: {
    //     type: String,
    //     required: true,
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now,
    // },
});
const musicModel = mongoose.model("Music", musicSchema);

module.exports = musicModel;