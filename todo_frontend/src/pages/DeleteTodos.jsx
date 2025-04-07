import React, { useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TodoNavbar from "../components/TodoNavbar";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { ImBin } from "react-icons/im";

const DeleteTodos = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleTodoDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/todos/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Todo deleted successfully");
      navigate("/mytodo/userdashboard");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.status === 401
          ? "Unauthorized: Please login again"
          : "Failed to delete todo"
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

        <h2 className="text-center mb-4 text-danger">🗑️ Delete Todo</h2>

        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <Card className="mx-auto p-4 shadow" style={{ maxWidth: "600px" }}>
            <Card.Body className="text-center">
              <h4 className="mb-4">
                Are you sure you want to delete this todo?
              </h4>
              <div className="d-grid gap-3">
                <Button variant="danger" onClick={handleTodoDelete}>
                  Delete <ImBin />
                </Button>
                <Link to="/mytodo/userdashboard">
                  <Button variant="secondary">Cancel</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default DeleteTodos;
