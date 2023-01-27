const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const createError = require("http-errors");

class AuthService {
    static async register(data) {
        try {
            data.password = bcrypt.hashSync(data.password, 8);
            let user = await prisma.user.create({
                data,
            });
            const accessToken = await jwt.signAccessToken(user.email);

            return accessToken;
        } catch (e) {
            if (e.code === "P2002") {
                throw createError.BadRequest("Email already exists");
            }
        }
    }

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

module.exports = AuthService;
