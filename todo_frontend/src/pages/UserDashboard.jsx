import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import TodoNavbar from "../components/TodoNavbar";
import { Container, Card, Button, Table, Row, Col } from "react-bootstrap";
import { FaClipboardList } from "react-icons/fa";

function UserDashboard() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/todos/getall`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTodos(response.data || []);
      } catch (error) {
        console.error("Fetch error:", error);
        setTodos([]);
        toast.error("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <TodoNavbar />

      <Container className="my-5">
        <Card className="shadow-lg p-4">
          <Row className="align-items-center mb-4">
            <Col>
              <h2 className="mb-0">
                <FaClipboardList /> Todo List
              </h2>
            </Col>
            <Col className="text-end">
              <Link to="/mytodo/createtodo">
                <Button variant="outline-primary">
                  <MdOutlineAddBox size={20} className="me-2" />
                  Add Todo
                </Button>
              </Link>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center py-5">
              <Spinner />
            </div>
          ) : (
            <Table bordered hover responsive className="text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>No</th>
                  <th>Title</th>
                  <th className="d-none d-md-table-cell">Completed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.length > 0 ? (
                  todos.map((todo, index) => (
                    <tr key={todo._id}>
                      <td>{index + 1}</td>
                      <td>{todo.title}</td>
                      <td className="d-none d-md-table-cell">
                        {todo.completed ? "✅" : "❌"}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-3">
                          <Link to={`/mytodo/showtodos/${todo._id}`} className="text-success">
                            <BsInfoCircle size={20} />
                          </Link>
                          <Link to={`/mytodo/edittodo/${todo._id}`} className="text-warning">
                            <AiOutlineEdit size={20} />
                          </Link>
                          <Link to={`/mytodo/deletetodo/${todo._id}`} className="text-danger">
                            <MdOutlineDelete size={20} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted">
                      No Todos available.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card>
      </Container>
    </>
  );
}

export default UserDashboard;
