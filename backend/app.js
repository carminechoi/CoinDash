var express = require("express");
var cors = require("cors");
require("@prisma/client");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cron = require("node-cron");

var route = require("./src/routes/index");
const { fetchAllCoins } = require("./src/services/gecko.service");

var app = express();

// run cron job
// ┌────────────── second (optional)
// │ ┌──────────── minute
// │ │ ┌────────── hour
// │ │ │ ┌──────── day of month
// │ │ │ │ ┌────── month
// │ │ │ │ │ ┌──── day of week
// │ │ │ │ │ │
// │ │ │ │ │ │
// * * * * * *
cron.schedule("*/1 * * * *", function () {
    fetchAllCoins();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// enable CORS for specific origins only
let corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
    ],
    credentials: true,
};

// middlewares
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// redirect to routes/index.js
app.use("/api", route);

module.exports = app;
