const bcrypt = require("bcryptjs");

const getUserDetails = async (req, res, next) => {
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
};

module.exports = { getUserDetails };
