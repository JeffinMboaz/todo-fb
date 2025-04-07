import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import TodoNavbar from "../components/TodoNavbar";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveTodo = async () => {
    const data = { title, completed };
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/todos/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Todo created successfully!");
      navigate("/mytodo/userdashboard");
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error("Failed to create todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TodoNavbar />
      <Container className="my-5">
        <Link to="/mytodo/userdashboard">
          <Button
            variant="secondary"
            className="d-flex align-items-center gap-2 mb-3"
          >
            <BsArrowLeftCircleFill size={20} />
            Back
          </Button>
        </Link>

        <h2 className="text-center my-4 text-primary">
          <MdEditNote /> Create Todo
        </h2>

        <Card className="mx-auto p-4 shadow" style={{ maxWidth: "600px" }}>
          <Card.Body>
            {loading && <Spinner />}

            <Form>
              {/* Title Input */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter todo title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              {/* Completed Checkbox */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Completed"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                />
              </Form.Group>

              {/* Save Button */}
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  onClick={handleSaveTodo}
                  disabled={loading}
                >
                  <FaSave /> Save Todo
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CreateTodo;
