const express = require("express");
const { getUserDetails } = require("../controllers/user.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

const router = express.Router();

/* Register user route */
router.get("/user", authenticateToken, getUserDetails);

module.exports = router;
