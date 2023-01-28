const jwt = require("jsonwebtoken");
const createError = require("http-errors");
// require("dotenv").config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

function signJwt(payload, keyType) {
    const privateKey =
        keyType == "accessToken" ? accessTokenSecret : refreshTokenSecret;

    return new Promise((resolve, reject) => {
        jwt.sign(
            { payload },
            privateKey,
            { expiresIn: "3600" },
            (err, token) => {
                if (err) {
                    reject(createError.InternalServerError());
                }
                resolve(token);
            }
        );
    });
}
function verifyToken(token, keyType) {
    const privateKey =
        keyType == "accessToken" ? accessTokenSecret : refreshTokenSecret;

    return new Promise((resolve, reject) => {
        jwt.verify(token, privateKey, (err, payload) => {
            if (err) {
                const message =
                    err.name == "JsonWebTokenError"
                        ? "Unauthorized"
                        : err.message;
                return reject(createError.Unauthorized(message));
            }
            resolve(payload);
        });
    });
}

module.exports = { signJwt, verifyToken };
