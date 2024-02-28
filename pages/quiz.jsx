import { defaultQuiz } from "@/default-quiz";
import { useState, useEffect } from "react";
import QuizButtons from "./QuizButtons";

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    shuffleAnswers();
  }, [index]);

  const shuffleAnswers = () => {
    const answers = [
      ...defaultQuiz.results[index].incorrect_answers,
      defaultQuiz.results[index].correct_answer,
    ];
    // Fisher-Yates shuffle algorithm
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    setShuffledOptions(answers);
  };

  const handleButtonClick = (selectedOption) => {
    if (selectedOption === defaultQuiz.results[index].correct_answer) {
      setIsCorrect(true);
    }
    setButtonClicked(true);
  };

  const handleClickNext = () => {
    setIndex((prevIndex) => prevIndex + 1);
    setIsCorrect(false);
    setButtonClicked(false);
    shuffleAnswers(); // Shuffle options for the next question
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <h1>Quiz</h1>

      <p>Question {index + 1} of 15</p>

      <h2>{defaultQuiz.results[index].question}</h2>

      <div className="grid grid-cols-2">
       {/*  {shuffledOptions.map((option, i) => (
          <button
            key={i}
            onClick={() => handleButtonClick(option)}
            className={`m-5 ${
              buttonClicked &&
              option === defaultQuiz.results[index].correct_answer
                ? "bg-green-500"
                : buttonClicked &&
                  option !== defaultQuiz.results[index].correct_answer
                ? "bg-red-500"
                : "bg-orange-500"
            }`}
            disabled={buttonClicked}
          >
            {option}
          </button>
        ))} */}
        {!buttonClicked ? (
          <>
           {/*  <button onClick={handleButtonClick} className="bg-orange-500 m-5">
              {question[index].incorrect_answers[0]}
            </button>
            <button onClick={handleButtonClick} className="bg-lime-900 m-5">
              {question[index].incorrect_answers[1]}
            </button>
            <button onClick={handleButtonClick} className="bg-yellow-400 m-5">
              {question[index].incorrect_answers[2]}
            </button>
            <button className="bg-rose-500 m-5" onClick={handleCorrect}>
              {question[index].correct_answer}
            </button>{" "} */}

            <QuizButtons handleCorrect={handleCorrect} handleButtonClick={handleButtonClick} question={question[index]}></QuizButtons>
          </>
        ) : (
          <>
            <button className="bg-red-600 m-5">
              {question[index].incorrect_answers[0]}
            </button>
            <button className="bg-red-600 m-5">
              {question[index].incorrect_answers[1]}
            </button>
            <button className="bg-red-600 m-5">
              {question[index].incorrect_answers[2]}
            </button>
            <button className="bg-lime-600 m-5">
              {question[index].correct_answer}
            </button>{" "}
            <p>{""} Correct Answer</p>
          </>
        )}
      </div>
      <p>{buttonClicked && isCorrect && "Correct Answer"}</p>
      <button onClick={buttonClicked ? handleClickNext : null}>
        Next Question
      </button>
      
    </div>
  );
}
