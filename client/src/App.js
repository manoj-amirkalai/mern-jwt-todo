import "./App.css";
import Signin from "./components/Log/Signin";
import Signup from "./components/Log/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todolist from "./components/Todo/Todolist";
import store from "./components/store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/todolist" element={<Todolist />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
