import React from "react";
import { Button, Container, Row } from "react-bootstrap";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  setRunning,
  setTime,
  setShowResults
}) => {

  const optionClicked = (i) => {
    // Increment the score
    if (i === correct) {
      setScore(score + 1);
    }
    //next question or show results
    if (currQues + 1 < questions.length) {
      setCurrQues(currQues + 1);
    } else {
      setShowResults(true);
      setRunning(false);
    }
  };

  //quit quiz and go to settings
  const handleQuit = () => {
    setCurrQues(0);
    setQuestions();
    setTime(0);
    setRunning(true);
  };

  return (
    <Container>
      <div className="quiz-container">
        <div className="current-question">
          <h3>
            {currQues + 1} / {questions.length}
          </h3>
        </div>
        <div className="question">
          <h2
            dangerouslySetInnerHTML={{ __html: questions[currQues].question }}
          ></h2>
        </div>
      </div>
      <Row className="quiz-options">
        {options &&
          options.map((i) => (
            <Button variant="info" key={i} onClick={() => optionClicked(i)}>
              {i}
            </Button>
          ))}
      </Row>
      <div className="quiz-quit">
        <Button href="/" variant="danger" onClick={() => handleQuit()}>
          QUIT
        </Button>
      </div>
    </Container>
  );
}
export default Question;