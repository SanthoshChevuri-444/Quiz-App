import { useState } from 'react';
import Home from './components/Home.jsx'
import Quiz from './components/Quiz.jsx';
function App(){
  const [quizstarted,setquizstarted]=useState(false);
  function startQuiz(){
    setquizstarted(true);
  }
  if(quizstarted){
    return (
      <Quiz />
    )
  }
  else{
  return (
    <>
    
    <Home title="React Quiz"
          description="Basic Java Questions"
          questions={15}
          timer={20}
          startQuiz={startQuiz}
    />




</>
  )
}
}
export default App;