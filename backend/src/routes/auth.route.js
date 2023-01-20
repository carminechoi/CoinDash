const express = require("express");
const router = express.Router();
const user = require("../controllers/auth.controller");
const auth = require("../middleware/auth");

/* register */
router.post("/register", user.register);

/* login */
router.post("/login", user.login);

/* all users */
router.get("/", auth, user.all);

module.exports = router;
