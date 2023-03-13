var express = require("express");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/user", authenticateToken, async (req, res, next) => {
	try {
		const user = req.authData;

		res.status(200).json({
			id: user.id,
			email: user.email,
			role: user.role,
		});
	} catch (e) {
		next(e);
	}
});

module.exports = router;
