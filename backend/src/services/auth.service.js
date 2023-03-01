const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const { verifyToken } = require("../utils/jwt");

const createUser = async (userData) => {
    const user = await prisma.user.create({
        data: userData,
    });
    delete user.password;

    return user;
};

const getUserFromEmailAndPassword = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email.toLowerCase(),
        },
    });

    if (!user) {
        throw createError.Unauthorized("Wrong email or password");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
        throw createError.Unauthorized("Wrong email or password");

    return user;
};

const getUserFromAccessToken = async ({ id }) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!user) {
        throw createError.Unauthorized("Invalid Access Token");
    }

    return user;
};

const getUserFromToken = async (token, tokenType) => {
    const decoded = await verifyToken(token, tokenType);
    if (!decoded) {
        return next(createError.Unauthorized(`Invalid ${tokenType} Token`));
    }

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.payload.id,
        },
    });

    if (!user) {
        throw createError.Unauthorized(`Invalid ${tokenType} Token`);
    }

    return user;
};

module.exports = {
    createUser,
    getUserFromEmailAndPassword,
    getUserFromAccessToken,
    getUserFromToken,
};
