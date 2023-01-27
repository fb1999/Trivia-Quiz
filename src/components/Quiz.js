import React, { useState, useEffect } from "react";
import { Button, Spinner, Container, Row, Col } from "react-bootstrap";
import Question from "./Question";
import Results from "./Results";

const Quiz = ({
  name,
  questions,
  score,
  setScore,
  setQuestions}) => {

  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);
  const [startQuiz, setStartQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, setTime]);

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers
        ])
    );
  }, [currQues, questions]);

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const startQ = () => {
    setStartQuiz(true);
    setRunning(true);
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrQues(0);
    setShowResults(false);
    setTime(0);
    setRunning(true);
  };

  return (
    <Container fluid>
      {startQuiz ? (
        <div>
          {showResults ? (
            <Results
              name={name}
              score={score}
              questions={questions}
              time={time}
              restartGame={restartGame}
            />
          ) : (
            <Container fluid className="quiz">
              {questions ? (
                <>
                  <div className="info-container">
                    <h5>{questions[currQues].category}</h5>
                    <div className="score">
                      <h5>Score : {score}</h5>
                    </div>
                    {/* <Col><h5>{questions[currQues].difficulty}</h5></Col> */}
                  </div>
                  <Question
                    currQues={currQues}
                    setCurrQues={setCurrQues}
                    questions={questions}
                    options={options}
                    correct={questions[currQues]?.correct_answer}
                    score={score}
                    setScore={setScore}
                    setQuestions={setQuestions}
                    setRunning={setRunning}
                    setTime={setTime}
                    setShowResults={setShowResults}
                  />
                </>
              ) : (
                <div className="quiz-spinner">
                  <Spinner animation="border" variant="light" />
                </div>
              )}
            </Container>
          )}
        </div>
      ) : (
        <Row className="justify-content-md-center start-quiz">
          <Col lg={12}>
            <h1>Are you ready?</h1>
          </Col>
          <Col lg={12}>
            <Button
              variant="secondary"
              className="btn-secondary"
              onClick={startQ}
            >
              START
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}
export default Quiz;