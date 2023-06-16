const express = require("express");
const { authenticateToken } = require("../utils/auth.util");
const {
	getWalletTypes,
	getUserWallets,
	createWallet,
} = require("../services/wallet.service");

const router = express.Router();

router.get("/types", async (req, res, next) => {
	try {
		const walletTypes = await getWalletTypes();
		res.status(200).json(walletTypes);
	} catch (e) {
		next(e);
	}
});

router.get("/all", authenticateToken, async (req, res, next) => {
	try {
		const user = req.authData;
		const userWallets = await getUserWallets(user);
		res.status(200).json(userWallets);
	} catch (e) {
		next(e);
	}
});

router.post("/add", authenticateToken, async (req, res, next) => {
	try {
		const user = req.authData;
		const walletData = req.body;
		await createWallet(user, walletData);
		const userWallets = await getUserWallets(user);
		res.status(200).json(userWallets);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
