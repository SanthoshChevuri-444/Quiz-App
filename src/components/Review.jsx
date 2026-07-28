import "./Review.css";

function Review({ quizQuestions, answers, backToResult }) {
  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="review-container">
      <h1 className="review-title">Quiz Review</h1>

      {quizQuestions.map((question, questionIndex) => {
        const userAnswer = answers[questionIndex];
        const correctAnswer = question.answer;

        const isCorrect = userAnswer === correctAnswer;
        const isSkipped = !userAnswer;

        return (
          <div className="review-question" key={question.id}>
            <p className="review-question-number">
              Question {questionIndex + 1} / {quizQuestions.length}
            </p>

            <h2 className="review-question-text">
              {question.question}
            </h2>

            <div className="review-options">
              {question.options.map((option, optionIndex) => {
                const isUserAnswer = userAnswer === option;
                const isCorrectAnswer = correctAnswer === option;

                let optionClass = "review-option";

                if (isUserAnswer && isCorrectAnswer) {
                  optionClass += " correct-selected";
                } else if (isUserAnswer && !isCorrectAnswer) {
                  optionClass += " wrong-selected";
                } else if (!isCorrect && isCorrectAnswer) {
                  optionClass += " correct-answer";
                }

                let optionSymbol = optionLetters[optionIndex];

                if (isUserAnswer && isCorrectAnswer) {
                  optionSymbol = "✓";
                } else if (isUserAnswer && !isCorrectAnswer) {
                  optionSymbol = "✕";
                } else if (!isCorrect && isCorrectAnswer) {
                  optionSymbol = "✓";
                }

                return (
                  <div className={optionClass} key={option}>
                    <span className="option-letter">
                      {optionSymbol}
                    </span>

                    <span>{option}</span>
                  </div>
                );
              })}
            </div>

            <p
              className={
                isCorrect
                  ? "answer-status correct-status"
                  : isSkipped
                  ? "answer-status skipped-status"
                  : "answer-status wrong-status"
              }
            >
              {isCorrect
                ? "Correct Answer"
                : isSkipped
                ? "Not Answered"
                : "Incorrect Answer"}
            </p>
          </div>
        );
      })}

      <button
        className="back-result-btn"
        onClick={backToResult}
      >
        Back to Result
      </button>
    </div>
  );
}

export default Review;