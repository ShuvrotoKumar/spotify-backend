const express = require("express");
const musicController = require("../controllers/music.controller");
const { protectRoute, artistOnly, userOnly } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/create-music", protectRoute, artistOnly, musicController.createMusic);

router.post("/create-album", protectRoute, artistOnly, musicController.createAlbum);

router.get("/get-all-music", protectRoute, userOnly, musicController.getAllMusic);

router.get("/get-all-albums", protectRoute, userOnly, musicController.getAllAlbums);
module.exports = router;
