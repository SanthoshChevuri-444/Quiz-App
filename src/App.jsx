import { useState, useEffect } from "react";
import Home from './components/Home.jsx'
import Quiz from './components/Quiz.jsx';
import questions from "./data/questions";
import Review from "./components/Review.jsx";


function App(){
  const [quizstarted,setquizstarted]=useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const shuffled = [...questions];

    shuffled.sort(() => Math.random() - 0.5);

    shuffled.forEach((question) => {
        question.options.sort(() => Math.random() - 0.5);
    });

    setQuizQuestions(shuffled);
}, []);
  function startQuiz(){
    setquizstarted(true);
  }
  if (showReview) {
  return (
    <Review
      quizQuestions={quizQuestions}
      answers={answers}
      backToResult={() => setShowReview(false)}
    />
  );
}

if (quizstarted) {
  return (
    <Quiz
      quizQuestions={quizQuestions}
      answers={answers}
      setAnswers={setAnswers}
      openReview={() => setShowReview(true)}
    />
  );
} else {
  return (
    <>
    
    <Home
  title="React Quiz"
  description="Test your React fundamentals"
  questions={quizQuestions.length}
  timer={1}
  startQuiz={startQuiz}
/>




</>
  )
}
}
export default App;