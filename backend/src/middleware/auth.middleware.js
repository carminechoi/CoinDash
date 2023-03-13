const jwt = require("../utils/token");
const createError = require("http-errors");
const { getUserFromAccessToken } = require("../services/token.service");

const authenticateToken = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const accessToken = authHeader && authHeader.split(" ")[1];

		if (accessToken == null) {
			return next(createError.Unauthorized("Access token is required"));
		}

		const user = await getUserFromAccessToken(accessToken);

		req.authData = user;

		next();
	} catch (e) {
		next(e);
	}
};

module.exports = { authenticateToken };
