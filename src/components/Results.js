import React, { useState } from "react";
import { Container, Button, Table, Row, Col, Image } from "react-bootstrap";
import results from "../assets/well_done.svg";

const Results = ({ score, questions, name, time, restartGame }) => {
  let result = ((score / questions.length) * 100).toFixed(0);
  const header = ["#", "Question", "Correct Answer"];
  const [showAns, setShowAns] = useState(false);
  const nameCap = name.toLowerCase();

  return (
    <Container fluid className="quiz-results">
      <Row>
        <Col sm={12} md={5}>
          <div>
            {result > 40 ? (
              <h1 className="quiz-congrats">Congrats!!!</h1>
            ) : (
              <h1 className="quiz-fail">Better luck next time...</h1>
            )}
            <div className="quiz-nameinfo">
              <h1 className="quiz-ann">{nameCap}</h1>
              <h1 className="quiz-name">
                You got {score} of {questions.length} questions Right!
              </h1>
            </div>
          </div>
          <div>
            <div className="quiz-resinfo">
              <h3 className="quiz-resnum">Final score: </h3>
              <h3 className="quiz-num">{result} %</h3>
            </div>
            <div className="quiz-resinfo">
              <h3 className="quiz-resnum">Your Time: </h3>
              <h3 className="quiz-num">
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
                {("0" + ((time / 10) % 100)).slice(-2)}
              </h3>
            </div>
          </div>
          <div className="quiz-restart-set">
            <Button
              variant="dark"
              className="quiz-restart"
              onClick={() => restartGame()}
            >
              RESTART QUIZ
            </Button>
            <Button href="/" className="quiz-restart" variant="light">
              BACK TO SETTINGS
            </Button>
          </div>
        </Col>
        <Col sm={12} md={7}>
          <Image fluid src={results} className="res-img"></Image>
        </Col>
      </Row>

      <Button
        variant="dark"
        style={{ width: "100%", marginBottom: "2rem" }}
        onClick={() => setShowAns(!showAns)}
      >
        {!showAns ? "SHOW ANSWERS" : "HIDE ANSWERS"}
      </Button>
      {showAns ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                {header.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.map((q, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{q.question}</td>
                  <td>{q.correct_answer}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div></div>
      )}
    </Container>
  );
};

export default Results;
