var express = require("express");
var router = express.Router();
const authRouter = require("./auth.route");
// const userRouter = require("./user.route");
const createError = require("http-errors");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.send("Hello World!");
});

router.use("/auth", authRouter);
// router.use("/users", userRouter);

// Catch 404 unknown routes and forward to error handler
router.use(async (req, res, next) => {
    next(createError(404));
});

// Global error handler
router.use(function (err, req, res, next) {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

module.exports = router;
