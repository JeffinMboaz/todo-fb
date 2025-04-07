import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FcTodoList } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";

function TodoNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar
      expand="lg"
      bg="light"
      className="shadow-sm px-3 mb-4"
      style={{ minHeight: "64px" }}
    >
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/mytodo/userdashboard")}
          style={{
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          <FcTodoList /> TODO
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-danger" onClick={handleLogout}>
            <BiLogOut /> Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TodoNavbar;
