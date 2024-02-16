const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectdb = require("./components/mongoDB/db");
const userrouter = require("./components/routes/userroutes");
const todorouter = require("./components/routes/todoroutes");
const app = express();
dotenv.config();
app.use(express.json());
connectdb();
app.use(cors());
app.use("/jwt", userrouter);
app.use("/todo", todorouter);
app.get("/", (req, res) => {
  res.status(200).json("hello from backend");
});
app.listen(8000, () => console.log(`Server is running on port 8000`));
