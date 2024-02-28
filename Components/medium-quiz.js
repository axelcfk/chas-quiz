import { defaultQuiz } from "@/default-quiz";
import { useState, useEffect } from "react";

export default function MediumQuiz() {
  const [index, setIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [chooseQuiz, setChooseQuiz] = useState([]);

  useEffect(() => {
    shuffleAnswers();
  }, [index]);

  const shuffleAnswers = () => {
    const answers = [
      ...defaultQuiz.resultsMedium[index].incorrect_answers,
      defaultQuiz.resultsMedium[index].correct_answer,
    ];
    // Fisher-Yates shuffle algorithm randomizear
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    setShuffledOptions(answers);
  };

  // function handleChoosQuiz() {
  //   if
  // }

  const handleButtonClick = (selectedOption) => {
    if (selectedOption === defaultQuiz.resultsMedium[index].correct_answer) {
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
    <div className="flex justify-center flex-col items-center mx-10 bg">
      <h1>Quiz</h1>

      <p>
        Question {index + 1} of {defaultQuiz.resultsMedium.length}
      </p>

      <h2>{defaultQuiz.resultsMedium[index].question}</h2>

      <div className="grid grid-cols-2">
        {shuffledOptions.map((option, i) => (
          <button
            key={i}
            onClick={() => handleButtonClick(option)}
            className={`m-5 h-36 w-36 p-2 border-none font-semibold rounded-md ${
              buttonClicked
                ? option === defaultQuiz.resultsMedium[index].correct_answer
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
      <p className="font-semibold text-lg">
        {buttonClicked && isCorrect
          ? "Correct Answer!"
          : buttonClicked && !isCorrect && "Wrong Answer!"}
      </p>
      <button
        className="border-none h-10 w-40 rounded-md bg-amber-400  hover:cursor-pointer font-semibold"
        onClick={buttonClicked ? handleClickNext : null}
      >
        Next Question
      </button>
    </div>
  );
}
