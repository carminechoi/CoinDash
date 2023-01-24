const jwt = require("../utils/jwt");
const createError = require("http-errors");

const auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(createError.Unauthorized("Access token is required"));
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return next(createError.Unauthorized());
    }
    await jwt
        .verifyAccessToken(token)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((e) => {
            next(createError.Unauthorized(e.message));
        });
};

// const protect = asyncHandler(async (req, res, next) => {
//     let token;
//     const authHeader = req.headers.authorization;

//     if (authHeader && authHeader.startsWith("Bearer")) {
//         try {
//             // extract token from authHeader string
//             token = authHeader.split(" ")[1];

//             // verified token returns user id
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             // find user's obj in db and assign to req.user
//             req.user = await User.findById(decoded.id).select("-password");

//             next();
//         } catch (error) {
//             res.status(401);
//             throw new Error("Not authorized, invalid token");
//         }
//     }

//     if (!token) {
//         res.status(401);
//         throw new Error("Not authorized, no token found");
//     }
// });

// module.exports = protect;
