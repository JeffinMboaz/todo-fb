import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsArrowLeftCircleFill } from "react-icons/bs";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        `http://localhost:5005/api/auth/login`,
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", resp.data.token);
      toast.success("Login Successful", { position: "top-right" });
      navigate("/mytodo/userdashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error("Invalid username or password", { position: "top-right" });
    }
  };

  return (
    <>
      <div>
        <Link to="/">
          <Button
            variant="secondary"
            className="d-flex align-items-center justify-content-center gap-2 m-3"
          >
            <BsArrowLeftCircleFill size={20} />
            Back
          </Button>
        </Link>
      </div>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 regback">
        <div className="text-center reg-login r-lpages">
          <h2>Login Page</h2>
          <Form
            onSubmit={handleLogin}
            onReset={() => {
              setUsername("");
              setPassword("");
            }}
          >
            <FloatingLabel controlId="floatingInput" label="Username">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="my-3"
                autoComplete="username"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="my-3"
                autoComplete="current-password"
              />
            </FloatingLabel>
            <Button type="submit" variant="primary" className="mx-2">
              Login
            </Button>
            <Button type="reset" variant="secondary" className="mx-2">
              Reset
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
