const { prisma } = require("../../prisma/prisma.client");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const {
	generateRefreshToken,
	generateAccessToken,
	deleteRefreshToken,
	verifyRefreshToken,
} = require("./token.service");
// const { verifyToken } = require("../utils/token");

const registerUser = async (email, password) => {
	const hashedPassword = await bcrypt.hash(password, 12);

	const user = await prisma.user.create({
		data: {
			email: email.toLowerCase(),
			password: hashedPassword,
		},
	});
	delete user.password;

	const accessToken = await generateAccessToken(user);
	const refreshToken = await generateRefreshToken(user);

	return { accessToken, refreshToken };
};

const loginUser = async (email, password) => {
	const user = await prisma.user.findUnique({
		where: {
			email: email.toLowerCase(),
		},
	});

	if (!user) {
		throw createError.Unauthorized("Wrong email or password");
	}

	const checkPassword = await bcrypt.compare(password, user.password);
	if (!checkPassword) throw createError.Unauthorized("Wrong email or password");

	const accessToken = await generateAccessToken(user);
	const refreshToken = await generateRefreshToken(user);

	return { accessToken, refreshToken };
};

const logoutUser = async (refreshToken) => {
	await deleteRefreshToken(refreshToken);
};

const refresh = async (refreshToken) => {
	if (refreshToken == null) {
		return next(createError.Unauthorized("Refresh token is required"));
	}

	const decoded = await verifyRefreshToken(token, tokenType);
	if (!decoded) {
		return next(createError.Unauthorized(`Invalid ${tokenType} Token`));
	}

	const user = await prisma.user.findUnique({
		where: {
			id: decoded.id,
		},
	});

	if (!user) {
		throw createError.Unauthorized(`Invalid ${tokenType} Token`);
	}

	const accessToken = await generateAccessToken(user);

	return { accessToken };
};

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	refresh,
};
