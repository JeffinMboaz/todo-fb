import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TodoNavbar from "../components/TodoNavbar";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";

const EditTodo = () => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/todos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTitle(response.data.title);
        setCompleted(response.data.completed);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch todo");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleEditTodo = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const data = { title, completed };
      await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/todos/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Todo updated successfully!");
      navigate("/mytodo/userdashboard");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.status === 401
          ? "Unauthorized: Please log in again"
          : "Error updating todo"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TodoNavbar />
      <Container className="my-5">
        <Row className="mb-3">
          <Col>
            <Link to="/mytodo/userdashboard">
              <Button
                variant="secondary"
                className="d-flex align-items-center gap-2 mb-3"
              >
                <BsArrowLeftCircleFill size={20} />
                Back
              </Button>
            </Link>
          </Col>
        </Row>

        <h2 className="text-center mb-4">
          <MdEditNote /> Edit Todo
        </h2>

        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <Card className="mx-auto shadow p-4" style={{ maxWidth: "600px" }}>
            <Card.Body>
              <Form>
                <Form.Group controlId="formTitle" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formCompleted" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Completed"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleEditTodo}>
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default EditTodo;
