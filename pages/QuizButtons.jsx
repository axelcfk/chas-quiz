import { defaultQuiz } from "@/default-quiz";
import { useEffect, useState } from "react";

export default function QuizButtons(props) {
  const { handleButtonClick, handleCorrect, question } = props;

  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  function InCorrectButton({ i }) {
    return (
      <button onClick={handleButtonClick} className="bg-orange-500 m-5">
        {question.incorrect_answers[i]}
      </button>
    );
  }

  function CorrectButton() {
    return (
      <button className="bg-rose-500 m-5" onClick={handleCorrect}>
        {question.correct_answer}
      </button>
    );
  }

  useEffect(() => {
    setShuffledQuestions(shuffleQuestions(arrayOfButtonComponents));
  }, [question]);

  function shuffleQuestions(buttonComponents) {
    for (let i = buttonComponents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [buttonComponents[i], buttonComponents[j]] = [
        buttonComponents[j],
        buttonComponents[i],
      ];
    }
    return buttonComponents;
  }

  const arrayOfButtonComponents = [
    <InCorrectButton key="1" i={0} />,
    <InCorrectButton key="2" i={1} />,
    <InCorrectButton key="3" i={2} />,
    <CorrectButton key="4"></CorrectButton>,
  ];

  return <>{shuffledQuestions}</>;
}
