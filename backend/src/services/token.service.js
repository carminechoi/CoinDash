const jwt = require("../utils/jwt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
    console.log(token);
    await prisma.refreshToken.deleteMany({
        where: {
            token: token,
        },
    });
    console.log("end");
};

const generateAuthTokens = async (user) => {
    const accessToken = jwt.signJwt(user);
    const refreshToken = jwt.signJwt(user);
    await saveRefreshToken(user.id, refreshToken);

    return { accessToken: accessToken, refreshToken: refreshToken };
};

module.exports = { generateAuthTokens, clearRefreshToken };
