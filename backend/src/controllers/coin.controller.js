const express = require("express");
const { authenticateToken } = require("../utils/auth.util");
const { getAllCoins } = require("../services/coin.service");

const router = express.Router();

/**
 * Get all coin information
 * @auth required
 * @route {GET} /all
 * @bodyparam { }
 * @returns { coin[] }
 **/
router.get("/all", async (req, res, next) => {
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
router.get("/portfolio", authenticateToken, async (req, res, next) => {
    try {
        res.status(200).json();
    } catch (e) {
        next(e);
    }
});

/**
 * Get all coin information
 * @auth none
 * @route {GET} /all
 * @bodyparam { }
 * @returns { coin[] }
 **/
router.get("/all", authenticateToken, async (req, res, next) => {
    try {
        res.status(200).json();
    } catch (e) {
        next(e);
    }
});

module.exports = router;
