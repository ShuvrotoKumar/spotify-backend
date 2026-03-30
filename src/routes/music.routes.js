const express = require("express");
const musicController = require("../controllers/music.controller");
const { protectRoute, artistOnly } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/create-music", protectRoute, artistOnly, musicController.createMusic);

router.post("/create-album", protectRoute, artistOnly, musicController.createAlbum);

module.exports = router;