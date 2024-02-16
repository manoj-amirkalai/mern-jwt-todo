const {
  addtodo,
  edittodo,
  gettodo,
  get1todo,
  deletetodo,
} = require("../controllers/todocrud");
const express = require("express");
const validateToken = require("../validation/jwtvalidation");
const todorouter = express.Router();
todorouter.use(validateToken);
todorouter.post("/add", addtodo);
todorouter.put("/update/:id", edittodo);
todorouter.get("/get", gettodo);
todorouter.get("/get1/:id", get1todo);
todorouter.delete("/delete/:id", deletetodo);

module.exports = todorouter;
