var express = require("express");
var router = express.Router();
const auth = require("./auth.route");
const createError = require("http-errors");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.send("Hello World!");
});

router.use("/auth", auth);

// catch 404 and forward to error handler
router.use(async (req, res, next) => {
    next(createError(404));
});

// error handler
router.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = router;
