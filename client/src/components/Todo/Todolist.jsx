import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./todo.css";
import { useDispatch, useSelector } from "react-redux";
import { removeuser } from "../store/slice";

import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

const Todolist = () => {
  const [todos, setTodos] = React.useState([]);
  const [newTodo, setNewTodo] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userid, token } = useSelector((state) => state.token);
  if (!userid || !token) {
    navigate("/");
  }

  const headauth = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const todolist = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/todo/get",
      headauth
    );
    setTodos(data.data);
  };
  const addtodo = async () => {
    try {
      await axios.post(
        "http://localhost:8000/todo/add",
        {
          todo: newTodo,
          user_id: userid,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTodo("");
      todolist();
    } catch (e) {
      console.log(e);
    }
  };
  const edittodo = (d) => {
    const todos = prompt("Enter the updated task");
    try {
      axios.put(
        `http://localhost:8000/todo/update/${d}`,
        {
          todo: todos,
        },
        headauth
      );
    } catch (e) {
      console.log(e);
    }
  };
  const deletetodo = async (d,to) => {
    try {
      await axios.delete(`http://localhost:8000/todo/delete/${d}`, headauth);
      alert(`${to} deleted`);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    todolist();
  }, [todos]);
  const removestorage = () => {
    dispatch(removeuser());
    navigate("/");
  };
  return (
    <div className="cont">
      <div className="inputadd">
        <Input
          className="MuiInput-input input"
          type="text"
          value={newTodo}
          placeholder="type todo"
          onChange={(e) => setNewTodo(e.target.value)}
        />{" "}
        <Button variant="contained" className="add" onClick={addtodo}>
          Add
        </Button>
      </div>

      {todos.map(({ _id, todo },index) => {
        return (
          <div className="list">
            <p key={_id}>
            {index+1}.  {todo} </p>
              <div className="buttons">
                {" "}
                <Button
                  className="edit"
                  onClick={() => edittodo(_id)}
                  variant="contained"
                >
                  {" "}
                  Edit
                </Button>
                <Button 
                  className="edit" onClick={() => deletetodo(_id,todo)} variant="contained">
                  {" "}
                  Delete
                </Button>
              </div>
           
          </div>
        );
      })}
      <div className="logout">
        {" "}
        <Button className="log" variant="contained" onClick={removestorage}>
          LogOut
        </Button>
      </div>
    </div>
  );
};

export default Todolist;
