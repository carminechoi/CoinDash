const express = require("express");
const {
    register,
    login,
    // refreshAccessToken,
    // logout,
} = require("../controllers/auth.controller");

const router = express.Router();

/* Register user route */
router.post("/register", register);
/* Login user route */
router.post("/login", login);
/* Refresh access token route */
// router.get("/refresh", refreshAccessToken);

/* Logout user route */
// router.get("/logout", logout);

module.exports = router;
