import "./Home.css";
function Home({ title, description, questions, timer, startQuiz }){
    return (
    <div className="home-container">

        <h1 className="home-title">
            {title}
        </h1>

        <p className="home-description">
            {description}
        </p>

        <div className="home-info">
            <p>{questions} Questions</p>
            <p>{timer} Minutes</p>
        </div>

        <button
            className="start-btn"
            onClick={startQuiz}
        >
            Start Quiz
        </button>

    </div>
);
}
export default Home;