const express = require("express");
const { authenticateToken } = require("../utils/auth.util");
const { getAllCoins, getDashboardCoins } = require("../services/coin.service");

const router = express.Router();

/**
 * Get all coin information
 * @auth required
 * @route {GET} /all
 * @bodyparam { }
 * @returns { coin[] }
 **/
router.get("/all", authenticateToken, async (req, res, next) => {
	try {
		const coins = await getAllCoins();
		res.status(200).json(coins);
	} catch (e) {
		next(e);
	}
});

/**
 * Get all coin information
 * @auth required
 * @route {GET} /all
 * @bodyparam { }
 * @returns { coin[] }
 **/
router.get("/dashboard", authenticateToken, async (req, res, next) => {
	try {
		const coins = await getDashboardCoins();
		res.status(200).json(coins);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
