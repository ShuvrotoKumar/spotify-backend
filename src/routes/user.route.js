const express = require("express");
const { getUserById } = require("../controllers/user.controller");
const { protectRoute } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/users/:id", protectRoute, getUserById);

module.exports = router;
