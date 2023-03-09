const jwt = require("../utils/jwt");

const { prisma } = require("../../prisma/prisma.client");

const saveRefreshToken = async (userId, token) => {
    await prisma.refreshToken.upsert({
        where: { userId: userId },
        update: {
            token: token,
        },
        create: {
            userId: userId,
            token: token,
        },
    });
};

const clearRefreshToken = async (token) => {
    await prisma.refreshToken.deleteMany({
        where: {
            token: token,
        },
    });
};

const generateAuthTokens = async (user) => {
    const accessToken = jwt.signJwt(user);
    const refreshToken = jwt.signJwt(user);
    await saveRefreshToken(user.id, refreshToken);

    return { accessToken: accessToken, refreshToken: refreshToken };
};

const generateAccessToken = async (user) => {
    const accessToken = jwt.signJwt(user);
    return { accessToken: accessToken };
};

module.exports = {
    generateAuthTokens,
    clearRefreshToken,
    generateAccessToken,
};
