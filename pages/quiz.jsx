import { defaultQuiz } from "@/default-quiz";
import { useState, useEffect } from "react";
import MediumQuiz from "@/Components/medium-quiz";
import HardQuiz from "@/Components/hard-quiz";

export default function QuizPage() {
  const [hardQuiz, setHardQuiz] = useState(false);
  const [mediumQuiz, setMediumQuiz] = useState(false);

  return (
    <>
      <button>Medium quiz</button>
      <button>Hard quiz</button>
      <MediumQuiz />
      <HardQuiz />
    </>
  );
}
