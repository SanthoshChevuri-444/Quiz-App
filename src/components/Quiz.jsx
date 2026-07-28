
// import {useState} from 'react'
// import { useEffect } from "react";
// import "./Quiz.css";


// function Quiz({
//   quizQuestions,
//   answers,
//   setAnswers,
//   openReview,
// }) {
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [timeleft,setTimeLeft]=useState(60)
//     const [showresult, setShowResult] = useState(false);

//     const progress = quizQuestions.length === 0 ? 0 : ((currentQuestion + 1) / quizQuestions.length) * 100;

    
//     useEffect(() => {
//           if (showresult) {
//             return;
//           }
//           const timer = setInterval(() => {
//             setTimeLeft((time) => {
//               if (time === 1) {
//                 setShowResult(true);
//                 return 0;
//               }
//             return time - 1;
//           });
//         }, 1000);
//           return () => {
//             clearInterval(timer);
//           };
//     }, [showresult]);

//     if (showresult) {
//       const timeTaken = 60 - timeleft;
        
//         let correct=0;
//         let skipped=0;
//         let wrong=0;

//         for (let i = 0; i < quizQuestions.length; i++) {
//             if(!answers[i]){
//               skipped+=1;
//             }
//             else if (quizQuestions[i].answer === answers[i]) {
                
//                 correct+=1;
//             }else{
//               wrong+=1;
//             }
//         }

//     return (
//         <>
//             <h1>Quiz Finished!</h1>
//             <p>Your Score: {correct} out of {quizQuestions.length}</p>
//             <p>Percentage : {(correct/quizQuestions.length)*100}%</p>
//             <p>✅ Correct: {correct}</p>
//             <p>❌ Wrong: {wrong}</p>
//             <p>⚪ Skipped: {skipped}</p>
//             <p>⏱ Time Taken: {timeTaken} seconds</p>
//             <button onClick={openReview}>
//   Review Quiz
// </button>
//             {/* <div>
//   {quizQuestions.map((question, index) => (
//     <div key={question.id}>
//     <h3
//   style={{
//     color:
//       !answers[index]
//         ? "gray"
//         : answers[index] === question.answer
//         ? "green"
//         : "red",
//   }}
// >
//   Question {index + 1}: {question.question}
// </h3>

//       <p
//   style={{
//     color:
//       answers[index] === question.answer
//         ? "green"
//         : "red",
//   }}
// >
//   Your Answer: {answers[index] || "Not Answered"}
// </p>

//       <p>
//   {question.answer !== answers[index]
//     ? `Correct Answer: ${question.answer}`
//     : ""}
// </p>
//      <p>
//   {!answers[index]
//     ? "⚪ Not Answered"
//     : answers[index] === question.answer
//       ? "✅ Correct"
//       : "❌ Wrong"}
// </p>
//     </div>
//   ))}
// </div> */}
//             <button onClick={() => {
//                 setShowResult(false);
//                 setCurrentQuestion(0);
//                 setAnswers({});
//                 setTimeLeft(60);
//             }}>Restart Quiz</button>
//         </>
//     );
// }
// if (quizQuestions.length === 0) {
//     return <h2>Loading...</h2>;
// }
//     return (
//         <>
//   <div className="quiz-container">

//     <h1 style={{ color: "black" }}>Quiz Started</h1>

//     <p className="question-number">
//       Question {currentQuestion + 1} of {quizQuestions.length}
//     </p>

//     <p className="timer">
//       Time Left: {timeleft} seconds
//     </p>
//     <div className="progress-bar">
//   <div
//     className="progress-fill"
//     style={{ width: `${progress}%` }}
//   ></div>
// </div>

// <p>Progress: {progress}%</p>

//    <h2 className="question">
//   {quizQuestions[currentQuestion]?.question}
// </h2>
    

//       <div className="options">
//         {quizQuestions[currentQuestion].options.map((option, index) => (
//     <label key={index}>
//       <input
//   type="radio"
//   name="answer"
//   value={option}
//   checked={answers[currentQuestion] === option}
//   onChange={(e) =>
//     setAnswers({
//       ...answers,
//       [currentQuestion]: e.target.value,
//     })
//   }
// />
//       {option}
//     </label>
//   ))}
// </div>


//     </div>
    
    
       

//     <div className="buttons">
//       <button
//         disabled={currentQuestion === 0}
//         onClick={() => setCurrentQuestion(currentQuestion - 1)}
//       >
//         Previous
//       </button>

//       <button
        
//         onClick={() => {
//             if(currentQuestion === quizQuestions.length - 1){
//                 setShowResult(true);
//             }
//             else{
//             setCurrentQuestion(currentQuestion + 1)
//         }
            
//         }}
//       >
//         {currentQuestion === quizQuestions.length - 1 ? "Finish" : "Next"}
//       </button>
      
//     </div>


// </>

//     )
// }
// export default Quiz;

import { useEffect, useState } from "react";
import "./Quiz.css";

function Quiz({
  quizQuestions,
  answers,
  setAnswers,
  timeLeft,
  setTimeLeft,
  showResult,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

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

        <button onClick={goToNextQuestion}>
          {currentQuestion === quizQuestions.length - 1
            ? "Finish"
            : "Next"}
        </button>
      </div>
    </>
  );
}

export default Quiz;