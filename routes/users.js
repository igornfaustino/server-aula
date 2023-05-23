const express = require("express");
const { saveUser, findUserByEmail } = require("../database/users");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const isEmailAlreadyUsed = await findUserByEmail(req.body.email);
    if (isEmailAlreadyUsed)
      return res.status(400).json({
        message: "Email already is being used",
      });
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    const savedUser = await saveUser(user);
    delete savedUser.password;
    res.status(201).json({
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = {
  router,
};
