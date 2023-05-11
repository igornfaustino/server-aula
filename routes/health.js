const express = require("express");
const router = express.Router();

router.get("/health", (req, res) => {
    res.json({
        status: "Running"
    })
});

module.exports = {
    router
}