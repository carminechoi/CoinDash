const express = require("express");
const auth = require("../controllers/auth.controller");
// const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

/* register */
router.post("/register", auth.register);

/* login */
router.post("/login", auth.login);

/* get user profile */
// router.get("/profile").get(protect, auth.getUserProfile);

module.exports = router;
