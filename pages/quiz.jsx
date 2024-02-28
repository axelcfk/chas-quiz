import { defaultQuiz } from "@/default-quiz";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";
import QuizButtons from "./QuizButtons";

const Question1 = defaultQuiz.results[0].question;
const Answer1 = defaultQuiz.results[0].correct_answer;

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  function handleButtonClick() {
    setButtonClicked(true);
  }

  function handleCorrect() {
    setIsCorrect(true);
    setButtonClicked(true);
  }

  function handleClickNext(i) {
    setIndex((prevIndex) => prevIndex + 1);
    setButtonClicked(false);
  }

  const question = defaultQuiz.results.map((question) => {
    return question;
  });

  return (
    <div className="flex justify-center flex-col items-center">
      <h1>Quiz</h1>
      <h2>{question[index].question} </h2>
      <div className="grid grid-cols-2">
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
      <button onClick={handleClickNext}>Next Question</button>
    </div>
  );
}
