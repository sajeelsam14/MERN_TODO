import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Nav_2 = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          ToDO List
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Nav_2;
