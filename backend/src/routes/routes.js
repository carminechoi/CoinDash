const { Router } = require("express");
const authcontroller = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const coinController = require("../controllers/coin.controller");
const walletController = require("../controllers/wallet.controller");
const createError = require("http-errors");

const api = Router()
	.use("/auth", authcontroller)
	.use("/users", userController)
	.use("/coins", coinController)
	.use("/wallet", walletController)

	// Catch 404 unknown routes and forward to error handler
	.use(async (req, res, next) => {
		next(createError(404));
	})

	// Global error handler
	.use(function (err, req, res, next) {
		err.status = err.status || "error";
		err.statusCode = err.statusCode || 500;

		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	});

module.exports = Router().use("/api", api);
