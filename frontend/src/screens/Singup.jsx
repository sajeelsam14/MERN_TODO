import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  NavLink,
  Card,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";
const Singup = () => {
  const navigation = useNavigate();
  localStorage.getItem("userData")? navigation("/"): null;
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [DateofBirth, setDateofBirth] = useState("");
  const [check, setCheck] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (password == repassword) {
      if (form) {
        singup();
      }
    } else {
      seterror("Password Do not matched");
    }
  };
  const singup = async () => {
    try {
      setloading(true);
      await axios
        .put("/singup", {
          name,
          email,
          password,
          repassword,
          DateofBirth,
        })
        .then((res) => {
          setloading(false);
          seterror(false);
          console.log(res.data.message);
          navigation("/");
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
        <Col lg={6} className="mt-3 mx-auto">
          <Card>
            <Card.Header className="text-center">
              <h1>SingUp</h1>
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
                <Row>
                  <Col lg={12}>
                    {loading && <Loader />}
                    {error && <Error>{error}</Error>}
                    <Form.Group controlId="name">
                      <Form.Label>Name:</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        placeholder="Enter Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Provide Your Name
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <Form.Group controlId="DOB">
                      <Form.Label>DateofBirth</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        value={DateofBirth}
                        onChange={(e) => setDateofBirth(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        DOB error
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group controlId="email">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control
                        type="email"
                        required
                        placeholder="Enter Your valid email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Provide a valid email
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        required
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        Enter the password
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group controlId="re-password">
                      <Form.Label>Re-Enter Your password</Form.Label>
                      <Form.Control
                        type="password"
                        required
                        placeholder="Enter Your password again"
                        value={repassword}
                        onChange={(e) => setRepassword(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                        please Fill this field
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <Form.Group controlId="check">
                      <Form.Check
                        required
                        label="Agree to my terms and conditions"
                        value={check}
                        onChange={(e) => setCheck(e.target.checked)}
                        feedback="You must agreemy terms and policies  before creating account."
                        feedbackType="invalid"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button className="mt-3" type="submit">
                  SingUp
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <p className="mt-3">
                Already have an account
                <NavLink
                  as={Link}
                  to="/"
                  style={inlineStyle}
                  className="ms-3"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Login
                </NavLink>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Singup;
