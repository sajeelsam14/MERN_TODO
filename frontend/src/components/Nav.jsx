import { Container, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          ToDO List
        </Navbar.Brand>
        <Button variant="outline-success" as={NavLink} to="/new">
          Add New Task 📓
        </Button>
      </Container>
    </Navbar>
  );
};

export default Nav;
