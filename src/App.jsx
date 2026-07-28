// import { useEffect, useState } from "react";
// import Home from "./components/Home.jsx";
// import Quiz from "./components/Quiz.jsx";
// import Review from "./components/Review.jsx";
// import questions from "./data/questions";

// function App() {
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [quizQuestions, setQuizQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [showReview, setShowReview] = useState(false);

//   useEffect(() => {
//     const shuffledQuestions = [...questions];

//     shuffledQuestions.sort(() => Math.random() - 0.5);

//     shuffledQuestions.forEach((question) => {
//       question.options.sort(() => Math.random() - 0.5);
//     });

//     setQuizQuestions(shuffledQuestions);
//   }, []);

//   function startQuiz() {
//     setQuizStarted(true);
//   }

//   function openReview() {
//     setShowReview(true);
//   }

//   function backToResult() {
//     setShowReview(false);
    
//   }

//   if (showReview) {
//     return (
//       <Review
//         quizQuestions={quizQuestions}
//         answers={answers}
//         backToResult={backToResult}
//       />
//     );
//   }

//   if (quizStarted) {
//     return (
//       <Quiz
//         quizQuestions={quizQuestions}
//         answers={answers}
//         setAnswers={setAnswers}
//         openReview={openReview}
//       />
//     );
//   }

//   return (
//     <Home
//       title="React Quiz"
//       description="Test your React fundamentals"
//       questions={quizQuestions.length}
//       timer={1}
//       startQuiz={startQuiz}
//     />
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import Home from "./components/Home.jsx";
import Quiz from "./components/Quiz.jsx";
import Result from "./components/Result.jsx";
import Review from "./components/Review.jsx";
import questions from "./data/questions";

function App() {
  const [page, setPage] = useState("home");

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const shuffledQuestions = questions.map((question) => {
      return {
        ...question,
        options: [...question.options].sort(() => Math.random() - 0.5),
      };
    });

    shuffledQuestions.sort(() => Math.random() - 0.5);

    setQuizQuestions(shuffledQuestions);
  }, []);

  function startQuiz() {
    setAnswers({});
    setTimeLeft(60);
    setPage("quiz");
  }

  function showResult() {
    setPage("result");
  }

  function showReview() {
    setPage("review");
  }

  function backToResult() {
    setPage("result");
  }

  return (
    <>
      {page === "home" && (
        <Home
          title="React Quiz"
          description="Test your React fundamentals"
          questions={quizQuestions.length}
          timer={1}
          startQuiz={startQuiz}
        />
      )}

      {page === "quiz" && (
        <Quiz
  quizQuestions={quizQuestions}
  answers={answers}
  setAnswers={setAnswers}
  timeLeft={timeLeft}
  setTimeLeft={setTimeLeft}
  showResult={showResult}
/>
      )}

      {page === "result" && (
        <Result
          quizQuestions={quizQuestions}
          answers={answers}
          timeLeft={timeLeft}
          showReview={showReview}
          restartQuiz={startQuiz}
        />
      )}

      {page === "review" && (
        <Review
          quizQuestions={quizQuestions}
          answers={answers}
          backToResult={backToResult}
        />
      )}
    </>
  );
}

export default App;