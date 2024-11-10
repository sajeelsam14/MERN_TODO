import { useState } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  NavLink,
  Card,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [validated, setvalidated] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setvalidated(true);
    if (form) {
      Login();
    }
  };

  const Login = async () => {
    try {
      setloading(true);
      await axios
        .put("/", {
          email,
          password,
        })
        .then((res) => {
          setloading(false);
          seterror(null);
          localStorage.setItem("userData", JSON.stringify(res.data));
          navigate("/");
        });
    } catch (err) {
      setloading(false);
      seterror(err.response.data.message);
    }
  };

  const inlineStyle = {
    fontSize: "25px",
    backgroundColor: "white",
    color: isHovered ? "darkblue" : "black",
    borderBottom: isHovered ? "2px solid black" : "0px",
    display: "inline",
  };
  return (
    <Container>
      <Row>
        <Col lg={6} className="mx-auto">
          <Card className="mt-5">
            <Card.Header className="text-center">
              <h1>Login</h1>
            </Card.Header>
            <Card.Body>
              {loading && <Loader />}
              {error && <Error>{error}</Error>}
              <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
                <Form.Group controlId="email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid password
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="mt-3" type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <p className="mt-3">
                Create a nwe account?
                <NavLink
                  as={Link}
                  to={"/signup"}
                  style={inlineStyle}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="ms-2"
                >
                  Sign up
                </NavLink>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
