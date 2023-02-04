const bcrypt = require("bcryptjs");

const {
    createUser,
    getUserFromEmailAndPassword,
    getUserFromToken,
} = require("../services/auth.service");
const {
    generateAccessToken,
    generateAuthTokens,
    clearRefreshToken,
} = require("../services/token.service");

const register = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await createUser({
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        const tokens = await generateAuthTokens(user);

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            expires: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            accessToken: tokens.accessToken,
        });
    } catch (e) {
        if (e.code === "P2002") {
            return res.status(409).json({
                state: false,
                message: "Email already exists",
            });
        }
        next(e);
    }
};

const login = async (req, res, next) => {
    try {
        const user = await getUserFromEmailAndPassword(req.body);
        const tokens = await generateAuthTokens(user);

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            expires: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            accessToken: tokens.accessToken,
        });
    } catch (e) {
        next(e);
    }
};

const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies["refreshToken"];
        await clearRefreshToken(refreshToken);
        res.json({});
    } catch (e) {
        next(e);
    }
};

const refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies["refreshToken"];
        if (refreshToken == null) {
            return next(createError.Unauthorized("Refresh token is required"));
        }

        const user = getUserFromToken(refreshToken, "refresh");
        const accessToken = generateAccessToken(user);

        res.status(200).json({
            accessToken: tokens.accessToken,
        });
    } catch (e) {
        next(e);
    }
};
module.exports = { register, login, logout, refreshAccessToken };
