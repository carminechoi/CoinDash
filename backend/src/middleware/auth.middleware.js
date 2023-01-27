const jwt = require("../utils/jwt");
const createError = require("http-errors");

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (accessToken == null) {
        return next(createError.Unauthorized("Access token is required"));
    }

    next(jwt.verifyAccessToken(accessToken));
}

module.exports = { authenticateToken };
