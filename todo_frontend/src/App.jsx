import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserRegister from "./pages/UserRegister";
import UserDashboard from "./pages/UserDashboard";
import CreateTodo from "./pages/CreateTodo";
import ShowTodos from "./pages/ShowTodos";
import EditTodo from "./pages/EditTodo";
import DeleteTodos from "./pages/DeleteTodos";
function App() {
  return (
    <div>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mytodo/userlogin" element={<LoginPage />} />
          <Route path="/mytodo/userregister" element={<UserRegister />} />
          <Route path="/mytodo/userdashboard" element={<UserDashboard />} />
          <Route path="/mytodo/createtodo" element={<CreateTodo />} />
          <Route path="/mytodo/showtodos/:id" element={<ShowTodos />} /> 
          <Route path="/mytodo/edittodo/:id" element={<EditTodo />} />
          <Route path="/mytodo/deletetodo/:id" element={<DeleteTodos />} />
      
        
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
