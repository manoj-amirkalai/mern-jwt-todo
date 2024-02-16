import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./signin.css";
import { adduserid, addusertoken } from "../store/slice";
import Input from "@mui/material/Input";

import Button from "@mui/material/Button";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const signin = async () => {
    try {
      const user = await axios.post("http://localhost:8000/jwt/signin", {
        name,
        email,
        password,
      });
      setName("");
      setPassword("");
      setEmail("");
      alert("Logged in");
      dispatch(addusertoken(user.data));
      try {
        const userid = await axios.get("http://localhost:8000/jwt/user", {
          headers: { Authorization: `Bearer ${user.data}` },
        });
        dispatch(adduserid(userid.data));
        navigate("/todolist");
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="body">
      
      <h3 style={{textAlign:"center"}}>Login</h3>
      <div className="inputs">
        <Input
          className="MuiInput-input input"
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className="MuiInput-input input"
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="MuiInput-input input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <h5> Don't have Account? Please SingUp.</h5>
      <div className="button">
        <Button variant="contained">
          <Link className="link" to="/signup">
            SignUp
          </Link>
        </Button>

        <Button
          variant="contained"
          disabled={
            !validateEmail(email) || password.length < 6 || name.length === 0
          }
          onClick={signin}
        >
          SignIn
        </Button>
      </div>
    </div>
  );
};

export default Signin;
