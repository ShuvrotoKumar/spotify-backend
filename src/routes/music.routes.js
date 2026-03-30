const express = require("express");
const musicController = require("../controllers/music.controller");

const router = express.Router();

router.post("/create-music", musicController.createMusic);

router.post("/create-album", musicController.createAlbum);

module.exports = router;