const jwt = require("jsonwebtoken");

const { prisma } = require("../../prisma/prisma.client");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION;

const generateRefreshToken = async (user) => {
	const refreshToken = jwt.sign({ user }, refreshTokenSecret, {
		expiresIn: refreshTokenExpiration,
	});
	await saveRefreshToken(user.id, refreshToken);

	return refreshToken;
};

const generateAccessToken = async (user) => {
	const accessToken = jwt.sign({ user }, accessTokenSecret, {
		expiresIn: accessTokenExpiration,
	});

	return accessToken;
};

const saveRefreshToken = async (userId, token) => {
	await prisma.refreshToken.upsert({
		where: { userId: userId },
		update: {
			token: token,
		},
		create: {
			userId: userId,
			token: token,
		},
	});
};

const deleteRefreshToken = async (token) => {
	await prisma.refreshToken.deleteMany({
		where: {
			token: token,
		},
	});
};

const verifyRefreshToken = async (token) => {
	return jwt.verify(token, refreshTokenSecret);
};

const getUserFromAccessToken = async (token) => {
	const decoded = jwt.verify(token, accessTokenSecret);
	const user = await prisma.user.findUnique({
		where: {
			id: decoded.id,
		},
	});
	return user;
};

module.exports = {
	generateRefreshToken,
	generateAccessToken,
	saveRefreshToken,
	deleteRefreshToken,
	verifyRefreshToken,
	getUserFromAccessToken,
};
