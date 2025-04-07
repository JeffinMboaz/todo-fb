import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TodoNavbar from "../components/TodoNavbar";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { LuClipboardPen } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";

const ShowTodos = () => {
  const [todo, setTodo] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/todos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTodo(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load todo");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

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

        <h2 className="mb-4 text-center">
          <LuClipboardPen /> Todo Details
        </h2>

        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <Card className="shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
            <Card.Body>
              <Card.Text>
                <strong>ID:</strong> {todo._id}
              </Card.Text>
              <Card.Text>
                <strong>Title:</strong> {todo.title}
              </Card.Text>
              <Card.Text>
                <strong>Completed:</strong>{" "}
                {todo.completed ? (
                  <>
                    Yes <TiTick className="text-success" />
                  </>
                ) : (
                  <>
                    No <ImCross className="text-danger" />
                  </>
                )}
              </Card.Text>
              <Card.Text>
                <strong>User ID:</strong> {todo.user}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default ShowTodos;
