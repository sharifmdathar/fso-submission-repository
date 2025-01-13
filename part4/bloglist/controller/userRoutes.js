const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (_, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.post("/", async (req, res, next) => {
  const { username, password, name } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "username or password not provided" });
  if (password.length < 3)
    return res
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    password: passwordHash,
    name,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
