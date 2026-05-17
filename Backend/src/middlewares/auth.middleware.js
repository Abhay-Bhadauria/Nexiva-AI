const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
    try {
        let token;

        //  1. Check Authorization Header (THIS IS YOUR CASE)
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        //  2. Optional: fallback to cookies
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        //  No token
        if (!token) {
            return res.status(401).json({
                message: "Token not provided."
            });
        }

        //  Debug (you can remove later)
        console.log("TOKEN RECEIVED:", token);

        //  Check blacklist
        const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

        if (isTokenBlacklisted) {
            return res.status(401).json({
                message: "Token is invalid"
            });
        }

        //  Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {
        console.error("AUTH ERROR:", err.message);
        return res.status(401).json({
            message: "Invalid token."
        });
    }
}

module.exports = { authUser };