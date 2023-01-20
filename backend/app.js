var express = require("express");
require("@prisma/client");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var route = require("./src/routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// redirect to routes/index.js
app.use("/", route);

module.exports = app;
