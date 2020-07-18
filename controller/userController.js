
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { loginValidation, registerValidation } = require("../validation");


register = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send({ error: "email Exists" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  })

  try {
    const saved = await user.save();
    res.send(saved);

  } catch (error) {
    res.status(400).send({ error });
  }

}

login = async (req, res) => {

  try {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ error: "email doesn't Exists" });

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) return res.status(400).send({ error: "password is not correct" });


    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.status(200).send({ message: "user logged in", token });

  } catch (error) {
    res.status(400).send({ error });
  }

}

module.exports = { register, login };