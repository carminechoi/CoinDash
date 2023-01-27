const express = require("express");
const authController = require("../controllers/auth.controller");
const authenticateToken = require("../middleware/auth.middleware");

const router = express.Router();

/* register */
router.post("/register", authController.register);
/* login */
router.post("/login", authController.login);

/* get user profile */
router.get("/profile", authController.getUserProfile);

module.exports = router;
