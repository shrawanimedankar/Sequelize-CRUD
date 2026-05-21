const jwt = require("jsonwebtoken");
const { sendResponse } =
require("../utils/common");

const authenticateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        if (!authHeader) {
            return sendResponse(res, {
                success: false,
                status_code: 401,
                message: "Token missing",
            });
        }
        const token =
        authHeader.split(" ")[1];
        // console.log(token);
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {

        // token expired
        if (
            error.name ===
            "TokenExpiredError"
        ) {

            return sendResponse(res, {
                success: false,
                status_code: 401,
                message:
                "Token expired",
            });

        }
        console.log(error);
        return sendResponse(res, {
            success: false,
            status_code: 401,
            message: "Invalid token",
        });
    }

};

module.exports = authenticateJWT;