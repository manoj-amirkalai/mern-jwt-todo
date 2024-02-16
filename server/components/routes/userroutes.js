const { getuser, singup, login } = require("../controllers/usercrud");
const express = require("express");
const validateToken = require("../validation/jwtvalidation");
const userrouter = express.Router();

userrouter.get("/user", validateToken, getuser);
userrouter.post("/signup", singup);
userrouter.post("/signin", login);

module.exports = userrouter;
