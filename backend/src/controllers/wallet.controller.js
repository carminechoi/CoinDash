const express = require("express");
const { authenticateToken } = require("../utils/auth.util");
const {
	getWalletTypes,
	getUserWallets,
	createWallet,
	deleteWallet,
} = require("../services/wallet.service");
const {
	createTransactions,
	deleteTransactions,
} = require("../services/transaction.service");

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

		const wallet = await createWallet(user, walletData);
		await createTransactions(user, wallet.id, walletData.type, wallet.address);

		const userWallets = await getUserWallets(user);
		res.status(200).json(userWallets);
	} catch (e) {
		next(e);
	}
});

router.delete("/delete", authenticateToken, async (req, res, next) => {
	try {
		const user = req.authData;
		const walletData = req.body;

		await deleteTransactions(user.id, walletData.id);
		await deleteWallet(walletData.id);

		const userWallets = await getUserWallets(user);
		res.status(200).json(userWallets);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
