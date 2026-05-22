const express = require("express");
const router = express.Router();

const routes = require("../controllers/handlerRoutes");

Object.keys(routes).forEach((moduleName) => {
  routes[moduleName].forEach((route) => {
    router[route.method](
      `/${moduleName}${route.path}`,
      route.handler
    );
  });
});

module.exports = router;