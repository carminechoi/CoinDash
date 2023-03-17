const express = require("express");
const { authenticateToken } = require("../utils/auth.util");

const router = express.Router();

/**
 * Get User information
 * @auth required
 * @route {GET} /user
 * @bodyparam { }
 * @returns { id, email, role }
 **/
router.get("/user", authenticateToken, async (req, res, next) => {
    try {
        const user = req.authData;

        res.status(200).json({
            id: user.id,
            email: user.email,
            role: user.role,
        });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
