import React, { useState } from "react";
import { Container, Button, Form, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { categories, difficulties } from "../data/data";
import question from "../assets/question.svg";

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const [amount, setAmount] = useState(5);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!category || !name) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    } else {
      setError(false);
      fetchQuestions(category, difficulty, amount);
      navigate("/quiz");
    }
  };

  return (
    <Container fluid className="quiz-set">
      <Row>
        <Col sm={12} md={7}>
          <Image fluid src={question} className="home-img"></Image>
        </Col>
        <Col sm={12} md={5}>
          <div className="title-div">
            <h1>Quiz Settings</h1>
          </div>
          {error ? (
            <div className="error-message">
              <p>Please Fill all the feilds</p>
            </div>
          ) : null}
          <Form className="quiz-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {categories &&
                  categories.map((cat, index) => (
                    <option key={index} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Difficulty</Form.Label>
              <Form.Select
                onChange={(e) => setDifficulty(e.target.value)}
                value={difficulty}
              >
                {difficulties &&
                  difficulties.map((diff, index) => (
                    <option key={index} value={diff.id}>
                      {diff.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of Questions</Form.Label>
              <Form.Control
                type="number"
                placeholder="Name"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                min={1}
                max={40}
              />
            </Form.Group>
            <Button variant="primary" className="btn-primary" type="submit">
              COMPLETE SETTINGS
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;