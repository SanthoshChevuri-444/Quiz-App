import { useEffect, useState } from "react";
import "./Quiz.css";
import { BsGrid3X3GapFill } from "react-icons/bs";

function Quiz({quizQuestions,  answers, setAnswers,  timeLeft,  setTimeLeft,  showResult,}) 
{
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showPalette, setShowPalette] = useState(false);

  const progress =
    quizQuestions.length === 0
      ? 0
      : ((currentQuestion + 1) / quizQuestions.length) * 100;

  useEffect(() => {
    if (timeLeft === 0) {
      showResult();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          return 0;
        }

        return time - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, setTimeLeft, showResult]);

  if (quizQuestions.length === 0) {
    return <h2>Loading...</h2>;
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];

  function selectAnswer(event) {
    setAnswers({
      ...answers,
      [currentQuestion]: event.target.value,
    });
  }

  function goToPreviousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function goToNextQuestion() {
    if (currentQuestion === quizQuestions.length - 1) {
      showResult();
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  return (
    <>
      <div className="quiz-container">
        <h1 className="quiz-title">Quiz Started</h1>

        <p className="question-number">
          Question {currentQuestion + 1} of {quizQuestions.length}
        </p>

        <p className="timer">Time Left: {timeLeft} seconds</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="progress-text">
          Progress: {progress.toFixed(0)}%
        </p>

        
        <h2 className="question">
          {currentQuizQuestion.question}
        </h2>

        <div className="options">
          {currentQuizQuestion.options.map((option, index) => (
            <label key={index} className="option">
              <input
                type="radio"
                name="answer"
                value={option}
                checked={answers[currentQuestion] === option}
                onChange={selectAnswer}
              />

              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="buttons">
  <button
    disabled={currentQuestion === 0}
    onClick={goToPreviousQuestion}
  >
    Previous
  </button>

  <button
  className="navigator-btn"
  onClick={() => setShowPalette(!showPalette)}
>
  <BsGrid3X3GapFill />
</button>

  <button onClick={goToNextQuestion}>
    {currentQuestion === quizQuestions.length - 1
      ? "Finish"
      : "Next"}
  </button>
</div>

{showPalette && (
  <>
    <h3 className="palette-title">Questions</h3>

    <div className="question-palette">
      {quizQuestions.map((_, index) => (
        <button
          key={index}
          className={
            currentQuestion === index
              ? "palette-btn current"
              : answers[index]
              ? "palette-btn answered"
              : "palette-btn"
          }
          onClick={() => setCurrentQuestion(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>

    <div className="palette-legend">
      <div className="legend-item">
        <span className="legend-circle answered-circle"></span>
        <span>Answered</span>
      </div>

      <div className="legend-item">
        <span className="legend-circle current-circle"></span>
        <span>Current</span>
      </div>

      <div className="legend-item">
        <span className="legend-circle notanswered-circle"></span>
        <span>Not Answered</span>
      </div>
    </div>
  </>
)}


    </>
  );
}

export default Quiz;