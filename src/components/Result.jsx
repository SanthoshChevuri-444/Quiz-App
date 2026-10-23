import "./Result.css";

function Result({
  quizQuestions,
  answers,
  timeLeft,
  showReview,
  restartQuiz,
  goHome,
}) {
  let correct = 0;
  let wrong = 0;
  let skipped = 0;

  for (let i = 0; i < quizQuestions.length; i++) {
    if (!answers[i]) {
      skipped++;
    } else if (answers[i] === quizQuestions[i].answer) {
      correct++;
    } else {
      wrong++;
    }
  }

  const percentage =
    quizQuestions.length === 0
      ? 0
      : (correct / quizQuestions.length) * 100;

  const timeTaken = 60 - timeLeft;

  return (
    <div className="result-container">
      <h1 className="result-title">Quiz Finished!</h1>

      <p className="result-score">
        Your Score: {correct} / {quizQuestions.length}
      </p>

      <p className="result-percentage">
        Percentage: {percentage.toFixed(2)}%
      </p>

      <div className="result-details">
        <div className="result-item">
          <span className="result-label">Correct Answers</span>
          <span className="correct-value">{correct}</span>
        </div>

        <div className="result-item">
          <span className="result-label">Wrong Answers</span>
          <span className="wrong-value">{wrong}</span>
        </div>

        <div className="result-item">
          <span className="result-label">Skipped Questions</span>
          <span className="skipped-value">{skipped}</span>
        </div>

        <div className="result-item">
          <span className="result-label">Time Taken</span>
          <span className="time-value">{timeTaken} sec</span>
        </div>
      </div>

      <div className="result-buttons">
  <button onClick={showReview}>
    Review Quiz
  </button>

  <button onClick={restartQuiz}>
    Restart Quiz
  </button>

  <button onClick={goHome}>
    Home
  </button>
</div>
    </div>
  );
}

export default Result;