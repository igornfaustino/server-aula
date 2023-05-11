const express = require("express");
const productsRoutes = require("./routes/products")
const healthRoutes = require("./routes/health");

const server = express();
server.use(express.json());

server.use(healthRoutes.router)
server.use(productsRoutes.router);

module.exports = {server}
