const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};

const artistOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "artist") {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};

const userOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "user") {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};

module.exports = { protectRoute, artistOnly, userOnly };