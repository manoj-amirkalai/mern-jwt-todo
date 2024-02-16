const Todo = require("../model/todomodel.js");
const addtodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      todo: req.body.todo,
      user_id: req.id,
    });
    res.status(200).send({ message: "Todo added successfully!", data: todo });
  } catch (e) {
    res.status(400).send(e);
  }
};
const edittodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (todo.user_id == req.id) {
      todo.todo = req.body.todo || todo.todo;
      todo.save();

      res.status(200).json({
        message: "updated Successfully",
        data: todo,
      });
    } else {
      res.status(400).json({
        message: "todo not available in this account ",
      });
    }
  } catch (e) {
    res.status(400).send("no todo");
  }
};
const gettodo = async (req, res) => {
  const id = req.id;
  try {
    const todo = await Todo.find({ user_id: id });
    if (todo) {
      res.status(200).send({ message: "Todo got successfully!", data: todo });
    } else {
      res.status(400).send("No such todo found!");
    }
  } catch (e) {
    res.status(400).send(e);
  }
};
const get1todo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (todo.user_id == req.id) {
      const deletetodo = await Todo.findById(id);
      res.status(200).json(deletetodo);
    } else {
      res.status(400).json({
        message: "todo not available in this account ",
      });
    }
  } catch (e) {
    res.status(400).send(e);
  }
};
const deletetodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (todo.user_id == req.id) {
      const deletetodo = await Todo.findByIdAndDelete(id);
      res.status(200).json({
        message: "Deleted Successfully",
        data: deletetodo,
      });
    } else {
      res.status(400).json({
        message: "todo not available in this account ",
      });
    }
  } catch (e) {
    res.status(400).send("no todo");
  }
};

module.exports = { addtodo, edittodo, gettodo, get1todo, deletetodo };
