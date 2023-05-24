const express = require("express");
const {
  saveUser,
  findUserByEmail,
  findUserById,
} = require("../database/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
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

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await findUserByEmail(email);
  if (!user) return res.status(401).send();
  const isSamePassword = bcrypt.compareSync(password, user.password);
  if (!isSamePassword) return res.status(401).send();
  const token = jwt.sign(
    {
      userId: user.id,
      name: user.name,
    },
    process.env.SECRET
  );

  res.json({
    success: true,
    token,
  });
});

router.get("/profile", auth, async (req, res) => {
  const user = await findUserById(req.user.userId);
  res.json({
    user,
  });
});

module.exports = {
  router,
};
