const bcrypt = require("bcrypt");
const User = require("../model/usermodel");
const jwt = require("jsonwebtoken");
const getuser = async (req, res) => {
  res.status(200).send(req.user.id);
};
const singup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({
      message: "required all fields",
    });
  }
  const available = await User.findOne({ email });
  if (available) {
    return res.status(409).send({ message: "Email already registered" });
  }
  //   hash the password
  const hashedpassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashedpassword });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Missing credentials");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesstoken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
      },
      process.env.JWT_SECRET
      // { expiresIn: "10m" } duration for token expiry
    );
    res.status(200).json(accesstoken);
  } else {
    res.status(401).json("Invalid Credentials");
  }
};
module.exports = {
  getuser,
  singup,
  login,
};
