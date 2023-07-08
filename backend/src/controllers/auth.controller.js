const express = require("express");
const {
	registerUser,
	loginUser,
	logoutUser,
	refresh,
} = require("../services/auth.service");

const router = express.Router();

/**
 * Register an user
 * @auth none
 * @route {POST} /register
 * @bodyparam { email, password }
 * @returns { accessToken }
 **/
router.post("/register", async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const tokens = await registerUser(email, password);

		res.cookie("refreshToken", tokens.refreshToken, {
			httpOnly: true,
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
			expires: 24 * 60 * 60 * 1000,
		});

		res.status(200).json({
			accessToken: tokens.accessToken,
		});
	} catch (e) {
		if (e.code === "P2002") {
			return res.status(409).json({
				state: false,
				message: "Email already exists",
			});
		}
		next(e);
	}
});

/**
 * Login an user
 * @auth none
 * @route {POST} /login
 * @bodyparam { email, password }
 * @returns { accessToken }
 **/
router.post("/login", async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const tokens = await loginUser(email, password);

		res.cookie("refreshToken", tokens.refreshToken, {
			httpOnly: true,
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
			expires: 24 * 60 * 60 * 1000,
		});

		res.status(200).json({
			accessToken: tokens.accessToken,
		});
	} catch (e) {
		next(e);
	}
});

/**
 * Logout an user
 * @auth none
 * @route {POST} /logout
 * @bodyparam { }
 * @returns { }
 **/
router.post("/logout", async (req, res, next) => {
	try {
		const refreshToken = req.cookies["refreshToken"];
		await logoutUser(refreshToken);
		res.json({});
	} catch (e) {
		next(e);
	}
});

/**
 * Refresh access token
 * @auth none
 * @route {POST} /refresh
 * @bodyparam { }
 * @returns { accessToken }
 **/
router.get("/refresh", async (req, res, next) => {
	try {
		const refreshToken = req.cookies["refreshToken"];

		const accessToken = await refresh(refreshToken);

		res.status(200).json({
			accessToken: accessToken,
		});
	} catch (e) {
		next(e);
	}
});

module.exports = router;
