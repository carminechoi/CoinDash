const bcrypt = require("bcryptjs");

const {
    createUser,
    getUserFromEmailAndPassword,
} = require("../services/auth.service");
const {
    generateAuthTokens,
    clearRefreshToken,
} = require("../services/token.service");

if (process.env.NODE_ENV === "production") cookiesOptions.secure = true;

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
        });

        res.status(200).json({
            status: true,
            data: { user: user, accessToken: tokens.accessToken },
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
        });

        res.status(200).json({
            status: true,
            data: { user: user, accessToken: tokens.accessToken },
        });
    } catch (e) {
        next(e);
    }
};

const logout = async (req, res, next) => {
    try {
        await clearRefreshToken(req.body.refreshToken);
        res.json({});
    } catch (e) {
        next(error);
    }
};

module.exports = { register, login, logout };
