const express = require("express");
const productsRoutes = require("./routes/products")
const usersRoutes = require("./routes/users")
const healthRoutes = require("./routes/health");

const server = express();
server.use(express.json());

server.use(healthRoutes.router);
server.use(productsRoutes.router);
server.use(usersRoutes.router);

module.exports = {server}
