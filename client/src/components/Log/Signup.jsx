import React, { useState } from "react";
import axios from "axios";
import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Input from '@mui/material/Input';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const signup = async () => {
    try {
      await axios.post("http://localhost:8000/jwt/signup", {
        name,
        email,
        password,
      });
      setName("");
      setPassword("");
      setEmail("");
      alert(`Account created for ${name}! `);
      navigate("/signin");
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <div className="body">
      <h3 style={{textAlign:"center"}}>Register</h3>
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
        <Link className="link" to="/signin">
          SignIn
        </Link>
      </Button>

      <Button
        variant="contained"
        disabled={
          !validateEmail(email) || password.length < 6 || name.length === 0
        }
        onClick={signup}
      >
        SignUp
      </Button>
    </div>
  </div>
  );
};

export default Signup;
