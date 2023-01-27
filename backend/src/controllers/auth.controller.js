const authService = require("../services/auth.service");

class AuthController {
    static register = async (req, res, next) => {
        try {
            const accessToken = await authService.register(req.body);

            res.status(200).json({
                status: true,
                message: "User created successfully",
                accessToken: accessToken,
            });
        } catch (e) {
            res.status(e.statusCode).send({ message: e.message });
        }
    };

    static login = async (req, res, next) => {
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

    static getUserProfile = async (req, res, next) => {
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
}
module.exports = AuthController;
