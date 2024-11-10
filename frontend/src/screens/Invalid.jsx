import { Container, Row } from "react-bootstrap";

const Invalid = () => {
  const Style = {
    align: {
      display: "flex",
      justifyContent: "center",
      marginTop: "50vh",
    },
    div: {
      fontSize: "25px",
      marginRight: "5px",
    },
    span: {
      borderLeft: "5px solid #000",
      paddingLeft: "5px",
    },
  };
  return (
    <Container>
      <Row>
        <div style={Style.align}>
          <span style={Style.div}>404</span>
          <span style={Style.span}>Page not found</span>
        </div>
      </Row>
    </Container>
  );
};

export default Invalid;
