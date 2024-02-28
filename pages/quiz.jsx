import { defaultQuiz } from "@/default-quiz";
import { useState, useEffect } from "react";

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
        {shuffledOptions.map((option, i) => (
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
        ))}
      </div>
      <p>{buttonClicked && isCorrect && "Correct Answer"}</p>
      <button onClick={buttonClicked ? handleClickNext : null}>
        Next Question
      </button>
      
    </div>
  );
}
