const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const createError = require("http-errors");

const createUser = async (userData) => {
    const user = await prisma.user.create({
        data: userData,
    });
    delete user.password;

    return user;
};

class AuthService {
    static async login(data) {
        const { email, password } = data;
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw createError.Unauthorized("Wrong email or password");
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword)
            throw createError.Unauthorized("Wrong email or password");

        const accessToken = await jwt.signAccessToken(user);
        return accessToken;
    }

    static async getUserProfile() {
        // const allUsers = await prisma.user.findMany();
        return { role: "admin" };
    }
}

module.exports = { AuthService, createUser };
