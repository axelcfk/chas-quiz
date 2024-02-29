import { useState, useEffect } from "react";
import { defaultQuiz, hardQuiz, easyQuiz } from "@/default-quiz";

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [quizIsSelected, setquizIsSelected] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (selectedQuiz) {
      shuffleAnswers();
    }
  }, [index, selectedQuiz]);

  const handleSelectedQuiz = (selectedQuizObject) => {
    if (selectedQuizObject === "Medium") {
      setSelectedQuiz(defaultQuiz);
      setquizIsSelected(true);
    } else if (selectedQuizObject === "Hard") {
      setSelectedQuiz(hardQuiz);
      setquizIsSelected(true);
    } else if (selectedQuizObject === "Easy") {
      setSelectedQuiz(easyQuiz);
      setquizIsSelected(true);
    }
  };

  const shuffleAnswers = () => {
    const answers = [
      ...selectedQuiz.results[index].incorrect_answers,
      selectedQuiz.results[index].correct_answer,
    ];
    // Fisher-Yates shuffle algorithm
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    setShuffledOptions(answers);
  };

  const handleButtonClick = (selectedOption) => {
    if (selectedOption === selectedQuiz.results[index].correct_answer) {
      setIsCorrect(true);
      setScore(score + 1);
    }
    setButtonClicked(true);
  };

  const handleClickNext = () => {
    setIndex((prevIndex) => prevIndex + 1);
    setIsCorrect(false);
    setButtonClicked(false);
    shuffleAnswers(); // Shuffle options for the next question
  };

  //check if the quiz is completed
  useEffect(() => {
    if (selectedQuiz && index === selectedQuiz.results.length - 1) {
      setIsCompleted(true);
    }
  }, [selectedQuiz, index]);

  return (
    <div className="flex justify-center flex-col items-center px-10 ">
      {!isCompleted && !quizIsSelected ? (
        <div>
          <h1>Take a Quiz</h1>
        </div>
      ) : null}

      {!quizIsSelected ? (
        <div>
          <div className="flex flex-col justify-center">
            <button
              className="h-40 w-60 p-2 border-none font-semibold rounded-md my-5 hover:bg-green-500 hover:cursor-pointer text-xl"
              onClick={() => handleSelectedQuiz("Easy")}
            >
              Easy
            </button>{" "}
            <button
              className="h-40 w-60 p-2 border-none font-semibold rounded-md my-5 hover:bg-green-500 hover:cursor-pointer text-xl"
              onClick={() => handleSelectedQuiz("Medium")}
            >
              Medium
            </button>
            <button
              className="h-40 w-60 p-2 border-none font-semibold rounded-md my-5 hover:bg-green-500 hover:cursor-pointer text-xl"
              onClick={() => handleSelectedQuiz("Hard")}
            >
              Hard
            </button>{" "}
          </div>
          <div className="flex flex-col p-2 border-none font-semibold rounded-md hover:cursor-pointer">
            <h2>Your Quizzes</h2>
            <button
              className="h-40 w-60 p-2 border-none font-semibold rounded-md my-5 hover:bg-green-500 hover:cursor-pointer text-xl"
              onClick={() => handleSelectedQuiz("")}
            >
              Your Quiz 1
            </button>{" "}
            <button
              className="h-40 w-60 p-2 border-none font-semibold rounded-md my-5 hover:bg-green-500 hover:cursor-pointer text-xl"
              onClick={() => handleSelectedQuiz("")}
            >
              Your Quiz 2
            </button>{" "}
          </div>
        </div>
      ) : (
        ""
      )}

      {isCompleted ? (
        <div>
          <h2 className="text-5xl">
            You scored {score} out of {selectedQuiz.results.length}
          </h2>
          <h3>Your highscore is ...</h3>
          <button className="h-40 w-60 p-2 border-none font-semibold rounded-md my-5 hover:bg-green-500 hover:cursor-pointer text-xl">
            Take the quiz again!
          </button>
          <button className="h-40 w-60 p-2 border-none font-semibold rounded-md my-5 hover:bg-green-500 hover:cursor-pointer text-xl">
            Take another quiz!
          </button>
        </div>
      ) : (
        selectedQuiz && (
          <>
            <p>Your score: {score}</p>
            <p>
              Question {index + 1} of {selectedQuiz.results.length}
            </p>

            <h2>{selectedQuiz.results[index].question}</h2>

            <div className="grid grid-cols-2">
              {shuffledOptions.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleButtonClick(option)}
                  className={`m-5 h-36 w-36 p-2 border-none font-semibold rounded-md ${
                    buttonClicked
                      ? option === selectedQuiz.results[index].correct_answer
                        ? "bg-green-500 text-zinc-950"
                        : "bg-slate-200"
                      : "hover:bg-slate-300 hover:cursor-pointer"
                  }`}
                  disabled={buttonClicked}
                >
                  {option}
                </button>
              ))}
            </div>
            <p>
              {buttonClicked && isCorrect
                ? "Correct Answer"
                : buttonClicked && !isCorrect && "Wrong Answer"}
            </p>
            <button
              className="border-none h-10 w-40 rounded-md bg-amber-400 font-semibold hover:cursor-pointer"
              onClick={buttonClicked ? handleClickNext : null}
            >
              Next Question
            </button>
          </>
        )
      )}
    </div>
  );
}
