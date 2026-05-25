const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/common");

const authenticateJWT = (excludedRoutes = []) => {
    return (req, res, next) => {
        try {
            if (excludedRoutes.includes(req.path)) {
                return next();
            }
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return sendResponse(res, { success: false, status_code: 401, message: "Token missing" });
            }
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return sendResponse(res, { success: false, status_code: 401, message: "Token expired" });
            }
            console.log(error);
            return sendResponse(res, { success: false, status_code: 401, message: "Invalid token" });
        }
    };
};
module.exports = authenticateJWT;