import "./App.css";
import { Route, Routes } from "react-router-dom";
import {Login} from "./pages/login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path={"/login"} element={<Login/>} />
      <Route path="/dashboard" element={<div>Dashboard</div>} />
      <Route path="/admin" element={<div>Admin</div>} />
    </Routes>
  );
}

export default App;
