const router = require("express").Router();
const bcrypt = require("bcrypt");
const lodash = require("lodash");
const { User, validate, validateLogin } = require("../models/User");
const authMiddleware = require("../middleware/auth");

router.post("/login", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect Email");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Incorrect Password");

  const token = user.generateAuthToken();
  res.send(token);
});

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email Already Registered");

  user = new User(lodash.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("auth-token", token)
    .send(lodash.pick(user, ["_id", "name", "email", "role"]));
});

router.get("/dashboard", authMiddleware, (req, res) => {
  res.send("Dashboard");
});

module.exports = router;
