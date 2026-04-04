const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const authRoute = require("./routes/auth.routes");
const musicRoute = require("./routes/music.routes");
const userRoute = require("./routes/user.route");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());


app.use("/api/v1", authRoute, musicRoute, userRoute);
module.exports = app;