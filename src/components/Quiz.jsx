import questions from "../data/questions";
import {useState} from 'react'
import { useEffect } from "react";
import "./Quiz.css";


function Quiz(){
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeleft,setTimeLeft]=useState(60)
    const [answers, setAnswers] = useState({});
    const [showresult, setShowResult] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState([]);

    const progress = quizQuestions.length === 0 ? 0 : ((currentQuestion + 1) / quizQuestions.length) * 100;
    useEffect(() => {
        const shuffled = [...questions];
        shuffled.sort(() => Math.random() - 0.5);
        shuffled.forEach((question) => {
            question.options.sort(() => Math.random() - 0.5);
        });
        setQuizQuestions(shuffled);
    }, []);
    
    useEffect(() => {
  if (showresult) {
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((time) => {
      if (time === 1) {
        setShowResult(true);
        return 0;
      }

      return time - 1;
    });
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, [showresult]);

    if (showresult) {
    let score = 0;

    for (let i = 0; i < quizQuestions.length; i++) {
        if (quizQuestions[i].answer === answers[i]) {
            score += 1;
        }
    }

    return (
        <>
            <h1>Quiz Finished!</h1>
            <p>Your Score: {score} out of {questions.length}</p>
            <p>Percentage : {(score/questions.length)*100}%</p>
            <div>
  {quizQuestions.map((question, index) => (
    <div key={question.id}>
    <h3
  style={{
    color:
      !answers[index]
        ? "gray"
        : answers[index] === question.answer
        ? "green"
        : "red",
  }}
>
  Question {index + 1}: {question.question}
</h3>

      <p
  style={{
    color:
      answers[index] === question.answer
        ? "green"
        : "red",
  }}
>
  Your Answer: {answers[index] || "Not Answered"}
</p>

      <p>
  {question.answer !== answers[index]
    ? `Correct Answer: ${question.answer}`
    : ""}
</p>
     <p>
  {!answers[index]
    ? "⚪ Not Answered"
    : answers[index] === question.answer
      ? "✅ Correct"
      : "❌ Wrong"}
</p>
    </div>
  ))}
</div>
            <button onClick={() => {
                setShowResult(false);
                setCurrentQuestion(0);
                setAnswers({});
                setTimeLeft(60);
            }}>Restart Quiz</button>
        </>
    );
}
if (quizQuestions.length === 0) {
    return <h2>Loading...</h2>;
}
    return (
        <>
  <div className="quiz-container">

    <h1 style={{ color: "black" }}>Quiz Started</h1>

    <p className="question-number">
      Question {currentQuestion + 1} of {quizQuestions.length}
    </p>

    <p className="timer">
      Time Left: {timeleft} seconds
    </p>
    <div className="progress-bar">
  <div
    className="progress-fill"
    style={{ width: `${progress}%` }}
  ></div>
</div>

<p>Progress: {progress}%</p>

   <h2 className="question">
  {quizQuestions[currentQuestion]?.question}
</h2>
    

      <div className="options">
        {quizQuestions[currentQuestion].options.map((option, index) => (
    <label key={index}>
      <input
        type="radio"
        name="answer"
        value={option}
        checked={answers[currentQuestion] === option}
        onChange={(e) =>
          setAnswers({
            ...answers,
            [currentQuestion]: e.target.value,
          })
        }
      />
      {option}
    </label>
  ))}
</div>

    </div>
    
    
       

    <div className="buttons">
      <button
        disabled={currentQuestion === 0}
        onClick={() => setCurrentQuestion(currentQuestion - 1)}
      >
        Previous
      </button>

      <button
        
        onClick={() => {
            if(currentQuestion === quizQuestions.length - 1){
                setShowResult(true);
            }
            else{
            setCurrentQuestion(currentQuestion + 1)
        }
            
        }}
      >
        {currentQuestion === quizQuestions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>


</>

    )
}
export default Quiz;