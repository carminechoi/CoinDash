const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");
const createError = require("http-errors");

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

module.exports = { createUser, getUserFromEmailAndPassword };
