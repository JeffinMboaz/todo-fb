import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsArrowLeftCircleFill } from "react-icons/bs";

function UserRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegisteration = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5005/api/auth/register`,
        {
          username,
          password,
        }
      );
      toast.success("Registered Successfully", { position: "top-right" });
      navigate("/mytodo/userlogin");
    } catch (error) {
      console.error("Registration Failed", error);
      toast.error("User registration failed", { position: "top-right" });
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
          <h2>Register Page</h2>
          <Form
            onSubmit={handleRegisteration}
            onReset={() => {
              setUsername("");
              setPassword("");
            }}
          >
            <FloatingLabel controlId="floatingInput" label="Username">
              <Form.Control
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="my-3"
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
              />
            </FloatingLabel>
            <Button type="submit" variant="primary" className="mx-2">
              Register
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

export default UserRegister;
