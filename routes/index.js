const express = require("express");
const router = express.Router();

const routes = require("../controllers/handlerRoutes");

const authenticateJWT = require("../middleware/jwtAuth");

const excludedRoutes = [
  "/auth/login",
  "/auth/signup",
];

// auth routes
router.use("/auth", require("./auth"));

Object.keys(routes).forEach((moduleName) => {
  routes[moduleName].forEach((route) => {
    router[route.method](`/${moduleName}${route.path}`,
      authenticateJWT(excludedRoutes),
      route.handler,
    );
  });
});

module.exports = router;