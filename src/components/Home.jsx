
function Home({ title, description, questions, timer, startQuiz }){
    return (
        <>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>Questions: {questions}</p>
        <p>Timer: {timer} Minutes</p>
        <button onClick={() => {startQuiz()}}>Start Quiz</button>
        </>
    )
}
export default Home;