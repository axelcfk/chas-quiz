import { useState, useEffect } from "react";
import { defaultQuiz, hardQuiz, easyQuiz } from "@/default-quiz";
import { useDispatch, useSelector } from "react-redux";
import { updateHighscore } from "@/redux/HighScoreSlice";
//import { setCurrentQuiz } from "@/redux/CustomQuizSlice";

export default function QuizPage() {
  // quiz state:
  const [index, setIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  //när man har tryckt på ett quiz
  const [quizIsSelected, setquizIsSelected] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  //vilket quiz? easy,medium,hard, custom
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [reset, setReset] = useState(false);

  // global state:
  const dispatch = useDispatch();
  const highscore = useSelector((state) => state.highscore.value);
  const userQuiz = useSelector((state) => state.customQuiz.allQuizzes);
  console.log(userQuiz);
  console.log(easyQuiz);

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
    } else if (selectedQuizObject === "MyCustomQuiz") {
      setSelectedQuiz(userQuiz);
      setquizIsSelected(true);
    }
  };

  function shuffleAnswers() {
    const answers = [
      ...selectedQuiz.results[index].incorrect_answers,
      selectedQuiz.results[index].correct_answer,
    ];
    // Fisher-Yates shuffle-algoritm
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    setShuffledOptions(answers);
  }

  function handleButtonClick(selectedOption) {
    if (selectedOption === selectedQuiz.results[index].correct_answer) {
      setIsCorrect(true);
      setScore((score) => score + 1);
    }
    setButtonClicked(true);
  }

  function handleClickNext() {
    setIndex((prevIndex) => prevIndex + 1);
    setIsCorrect(false);
    setButtonClicked(false);
    shuffleAnswers(); // Shuffle options for the next question
  }

  function handleClickDone() {
    setIsCompleted(true);
    if (score > highscore) {
      dispatch(updateHighscore(score));
    }
  }

  //check if the quiz is completed
  useEffect(() => {
    if (selectedQuiz && index >= selectedQuiz.results.length) {
      setIsCompleted(true);
    }
  }, [selectedQuiz, index]);

  // Kontrollera om userQuiz är ett objekt
  if (typeof userQuiz === "object" && userQuiz !== null) {
    // Kontrollera om userQuiz har en nyckel "results"
    if ("results" in userQuiz && Array.isArray(userQuiz.results)) {
      // Kontrollera om varje objekt i arrayen har de rätta egenskaperna
      const isValidStructure = userQuiz.results.every(
        (quizItem) =>
          typeof quizItem === "object" &&
          "question" in quizItem &&
          "correct_answer" in quizItem &&
          "incorrect_answers" in quizItem &&
          Array.isArray(quizItem.incorrect_answers)
      );

      if (isValidStructure) {
        console.log("userQuiz följer samma struktur som EasyQuiz.");
      } else {
        console.log("userQuiz har inte rätt struktur.");
      }
    } else {
      console.log(
        "userQuiz saknar nyckeln 'results' eller 'results' är inte en array."
      );
    }
  } else {
    console.log("userQuiz är inte ett objekt eller är null.");
  }

  return (
    <div className="flex justify-center flex-col items-center px-10 ">
      {!isCompleted && !quizIsSelected ? (
        <div>
          <h1>Take a Quiz</h1>
        </div>
      ) : null}

      <div> {/* just to check if userQuiz looks correct  */}
        {userQuiz.results &&
          userQuiz.results.map((item) => (
            <div key={item.question}>
              <p>Question: {item.question}</p>
              <p>Correct Answer: {item.correct_answer}</p>
              <p>Incorrect Answers: {item.incorrect_answers}</p>
            </div>
          ))}
      </div>

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
            <button
              className="h-40 w-60 p-2 border-none font-semibold rounded-md my-5 hover:bg-green-500 hover:cursor-pointer text-xl"
              onClick={() => handleSelectedQuiz("MyCustomQuiz")}
            >
              Your Custom Quiz
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
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-5xl text-center">
            You scored {score} out of {selectedQuiz.results.length}
          </h2>
          <h3>Your highscore is {highscore}</h3>
          <button className="h-40 w-60 p-2 border-none font-semibold rounded-md my-5 hover:bg-green-500 hover:cursor-pointer text-xl mt-10">
            Take the quiz again!
          </button>
          <button
            // onClick={() => setquizIsSelected(false)}
            className="h-40 w-60 p-2 border-none font-semibold rounded-md my-5 hover:bg-green-500 hover:cursor-pointer text-xl mt-10"
          >
            Take another quiz!
          </button>
        </div>
      ) : (
        selectedQuiz && (
          <>
            <p>Your score: {score}</p>

            <h2>{selectedQuiz.results[index].question}</h2>
            <p>
              Question {index + 1} of {selectedQuiz.results.length}
            </p>

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
            {index < selectedQuiz.results.length - 1 ? (
              <button
                className="border-none h-10 w-40 rounded-md bg-amber-400 font-semibold hover:cursor-pointer"
                onClick={buttonClicked ? handleClickNext : null}
              >
                Next Question
              </button>
            ) : (
              <button
                className="border-none h-10 w-40 rounded-md bg-amber-400 font-semibold hover:cursor-pointer"
                onClick={handleClickDone}
              >
                FINISH QUIZ
              </button>
            )}
          </>
        )
      )}
    </div>
  );
}
