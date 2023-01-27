import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar className="quiz-header">
      <Container>
        <Navbar.Brand href="/">
          <h3>Trivia Quiz</h3>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;