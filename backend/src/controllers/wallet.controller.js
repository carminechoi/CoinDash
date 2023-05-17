const express = require("express");
const { getWalletTypes } = require("../services/wallet.service");

const router = express.Router();

router.get("/types", async (req, res, next) => {
    try {
        const walletTypes = await getWalletTypes();
        res.status(200).json(walletTypes);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
