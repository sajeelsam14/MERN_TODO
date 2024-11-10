import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Nav_2 from "../components/Nav_2";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Update = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [validated, setValidated] = useState(false);
  const [task, settask] = useState(null);
  const [Feedback, setFeedback] = useState(null);
  const { id } = useParams();
  const _id = id;
  const navigate = useNavigate();
  const notify = () => toast(Feedback);
  useEffect(() => {
    const featch = async () => {
      try {
        const { data } = await axios.get(`/data/${id}`);
        setdata(data);
        setloading(false);
        settask(data.task);
      } catch (error) {
        setloading(false);
        seterror(error.response.message);
      }
    };
    featch();

    if (Feedback) {
      notify();
    }
  }, [id, Feedback]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity()) {
      UpdatedToDo();
    }
  };
  const UpdatedToDo = async () => {
    setloading(true);
    setFeedback(null);
    try {
      await axios
        .post("/data", {
          _id,
          task,
        })
        .then((res) => {
          setFeedback(res.data.message);
          setloading(false);
        });
    } catch (error) {
      seterror(error.response.data.message);
      setloading(false);
      setFeedback(null);
    }
  };
  return (
    <React.Fragment>
      <Nav_2 />
      <Container className="mt-3">
        <Row>
          <Col lg={3}>
            <Button variant="outline-warning" onClick={() => navigate(-1)}>
              <span className="me-3">&lt;</span>Back
            </Button>
          </Col>
        </Row>
        <Row>
          {loading && <Loader />}
          {error && <Error>{error}</Error>}
          {Feedback && (
            <div>
              <ToastContainer />
            </div>
          )}
          {data && (
            <Card className="mt-5 mx-auto">
              <Card.Body>
                <Card.Title>Updat to DO</Card.Title>
                <Card.Body>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Form.Group controlId="task" className="mb-2">
                      <Form.Label>Task</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        as="textarea"
                        rows="5"
                        cols="40"
                        placeholder="TODO Task"
                        value={task}
                        onChange={(e) => settask(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        ToDO Task is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                      variant="outline-success"
                      className="me-3"
                      type="submit"
                    >
                      Update
                    </Button>
                  </Form>
                </Card.Body>
              </Card.Body>
            </Card>
          )}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Update;
