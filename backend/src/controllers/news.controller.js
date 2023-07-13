const express = require("express");
const { authenticateToken } = require("../utils/auth.util");
const { fetchCryptoNews } = require("../services/news.service");

const router = express.Router();

router.get("/crypto", authenticateToken, async (req, res, next) => {
	try {
		const news = await fetchCryptoNews();
		res.status(200).json(news);
	} catch (e) {
		next(e);
	}
});

module.exports = router;
