const express = require("express");
const { authenticateToken } = require("../utils/auth.util");
const { getWalletTypes, createWallet } = require("../services/wallet.service");

const router = express.Router();

router.get("/types", async (req, res, next) => {
	try {
		const walletTypes = await getWalletTypes();
		res.status(200).json(walletTypes);
	} catch (e) {
		next(e);
	}
});

router.post("/add", authenticateToken, async (req, res, next) => {
	try {
		const user = req.authData;
		const walletData = req.body;
		console.log("in controller");
		await createWallet(user, walletData);
		res.status(200).json({ message: "success" });
	} catch (e) {
		next(e);
	}
});

module.exports = router;
