var express = require("express");
var cors = require("cors");
require("@prisma/client");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var route = require("./src/routes/index");

var app = express();

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
