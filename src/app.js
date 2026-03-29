const express = require("express");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route");
const musicRoute = require("./routes/music.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1", authRoute);
app.use("/api/v1", musicRoute);
module.exports = app;