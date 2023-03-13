const jwt = require("jsonwebtoken");
const createError = require("http-errors");
// require("dotenv").config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

function signJwt(payload, type) {
	const secretKey = type == "access" ? accessTokenSecret : refreshTokenSecret;
	const expiresIn = type == "access" ? "10m" : "1d";

	return jwt.sign({ payload }, secretKey, { expiresIn: expiresIn });
}

function verifyToken(token, type) {
	const secretKey = type == "access" ? accessTokenSecret : refreshTokenSecret;

	return new Promise((resolve, reject) => {
		jwt.verify(token, secretKey, (err, payload) => {
			if (err) {
				const message =
					err.name == "JsonWebTokenError" ? "Unauthorized" : err.message;
				return reject(createError.Unauthorized(message));
			}
			resolve(payload);
		});
	});
}

module.exports = { signJwt, verifyToken };
