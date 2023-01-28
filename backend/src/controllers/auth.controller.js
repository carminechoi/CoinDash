const bcrypt = require("bcryptjs");

const { createUser, authService } = require("../services/auth.service");

const cookiesOptions = {
    httpOnly: true,
    sameSite: "strict",
};

if (process.env.NODE_ENV === "production") cookiesOptions.secure = true;

// Expires in 15 minutes
const accessTokenCookieOptions = {
    ...cookiesOptions,
    expires: new Date(Date.now() + 15 * 60 * 1000),
    maxAge: 15 * 60 * 1000,
};

// Expires in 60 minutes
const refreshTokenCookieOptions = {
    ...cookiesOptions,
    expires: new Date(Date.now() + 60 * 60 * 1000),
    maxAge: 15 * 60 * 1000,
};

const register = async (req, res, next) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 12);

        const user = await createUser({
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
        });

        res.status(200).json({
            status: true,
            data: { user: user },
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
        const accessToken = await authService.login(req.body);

        res.status(200).json({
            status: true,
            message: "Account login successful",
            accessToken: accessToken,
        });
    } catch (e) {
        res.status(e.statusCode).send({ message: e.message });
    }
};

const getUserProfile = async (req, res, next) => {
    try {
        const profile = await authService.getUserProfile();
        res.status(200).json({
            status: true,
            message: "Retrieved profile",
            data: profile,
        });
    } catch (e) {
        res.status(e.statusCode).send({ message: e.message });
    }
};

module.exports = { register, login };
