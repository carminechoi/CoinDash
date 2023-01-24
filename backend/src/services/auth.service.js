const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

class AuthService {
    static async register(data) {
        data.password = bcrypt.hashSync(data.password, 8);

        let user = await prisma.user.create({
            data,
        });
        delete user.password;

        let userToken = await jwt.signAccessToken(user);

        return { ...user, userToken };
    }

    static async login(data) {
        const { email, password } = data;
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw createError.NotFound("User not registered");
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword)
            throw createError.Unauthorized(
                "Email address or password not valid"
            );
        delete user.password;
        const userToken = await jwt.signAccessToken(user);
        return { ...user, userToken };
    }

    static async all() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }
}

module.exports = AuthService;
