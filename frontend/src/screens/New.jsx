import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav_2 from "../components/Nav_2";

const New = () => {
  let userDataJSON = localStorage.getItem("userData");
  let user;
  userDataJSON
    ? (user = JSON.parse(userDataJSON))
    : (user = {
        "._id": "",
      });
  const [validated, setValidated] = useState(false);
  const [task, settask] = useState(null);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity()) {
      newTask();
      if (!show) {
        navigate(-1);
      }
    }
  };
  const newTask = async () => {
    const config = {
      headers: {
        userid: user._id,
      },
    };
    try {
      await axios.put(
        "/data",
        {
          task,
        },
        config
      );
      setMessage("Product Edit SuccessFully");
      setShow(true);
    } catch (error) {
      setMessage(error.response.data);
      setShow(true);
    }
  };
  return (
    <React.Fragment>
      <Nav_2 />
      {show && (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <p>{message}</p>
        </Alert>
      )}
      <Card className="mt-5 mx-auto" style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>New TODO</Card.Title>
          <Card.Text>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group controlId="task" className="mb-2">
                <Form.Label>Task</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="TODO Task"
                  value={task}
                  onChange={(e) => settask(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  ToDO Task is required.
                </Form.Control.Feedback>
              </Form.Group>
              \{" "}
              <div className="d-grid">
                <Button
                  variant="outline-success"
                  className="me-3"
                  type="submit"
                >
                  ADD ➕
                </Button>
              </div>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default New;
