import { useState, useEffect } from "react";
import { defaultQuiz, hardQuiz, easyQuiz } from "@/default-quiz";
import { useDispatch, useSelector } from "react-redux";
import { updateHighscore } from "@/redux/HighScoreSlice";
import Link from "next/link";
import { preloadedState } from "@/redux/store";
import Footer from "@/Components/footer";
//import { setCurrentQuiz } from "@/redux/CustomQuizSlice";

export default function QuizPage() {

  useEffect(() => {
    //const initialState = preloadedState === undefined ? 0 : preloadedState;
    const initialState = preloadedState;
    dispatch(updateHighscore(initialState));
  }, []);

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
  const [clickedIncorrectIndex, setClickedIncorrectIndex] = useState(null);
  const [wiggle, setWiggle] = useState(false);

  // global state:
  const dispatch = useDispatch();
  const highscore = useSelector((state) => state.highscore);
  //const userQuiz = useSelector((state) => state.customQuiz.allQuizzes);
  const userQuizzes = useSelector((state) => state.customQuiz.allQuizzes2);
  console.log("User Quizzes:", userQuizzes);

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
      setSelectedQuiz(userQuizzes[0]); // change [0] to a variable... index... in case we want multiple custom quizzes...
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

  function handleButtonClick(selectedOption, optionIndex) {
    if (selectedOption === selectedQuiz.results[index].correct_answer) {
      setIsCorrect(true);
      setScore((score) => score + 1);
    } else {
      // Set the index of the clicked incorrect option
      setClickedIncorrectIndex(optionIndex);
      setWiggle(true);
      // Reset wiggle after a short delay
      setTimeout(() => setWiggle(false), 500);
    }
    setButtonClicked(true);
  }

  function handleClickNext() {
    setIndex((prevIndex) => prevIndex + 1);
    setIsCorrect(false);
    setButtonClicked(false);
    shuffleAnswers(); // Shuffle options for the next question
    setClickedIncorrectIndex(null);
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

  /* // Kontrollera om userQuiz är ett objekt
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
  } */

  return (
    <>
      <div className="flex flex-col justify-center items-center pb-8 pt-10">
        <div className="flex justify-center flex-col items-center px-10 rounded-xl w-1/2  pt-6">
          {!isCompleted && !quizIsSelected ? (
            <div>
              <h2 className="text-4xl text-slate-50">Take a Quiz</h2>
            </div>
          ) : null}

          {/* just to check if userQuizzes looks correct: */}
        {/* {userQuizzes &&
          userQuizzes.map((userQuiz) => (
            <div>
             <p>quiz name: {userQuiz.name}</p>
            {userQuiz.results.map((item) => (
              <div key={item.question}>
                <p>Question: {item.question}</p>
                <p>Correct Answer: {item.correct_answer}</p>
                <p>Incorrect Answers: {item.incorrect_answers}</p>
              </div>
              
            ))}
            </div> 
          ))} */}

          {!quizIsSelected ? (
            <div>
              <div className="flex flex-col justify-center items-center ">
                <button
                  className="h-16 text-slate-100 w-60 p-2 border-none font-semibold rounded-full  bg-green-600 hover:bg-green-700  hover:cursor-pointer text-xl mb-9"
                  onClick={() => handleSelectedQuiz("Easy")}
                >
                  Easy
                </button>{" "}
                <button
                  className="h-16 text-slate-100 w-60 p-2 border-none font-semibold rounded-full  bg-yellow-500 hover:bg-yellow-600 hover:cursor-pointer text-xl mb-9"
                  onClick={() => handleSelectedQuiz("Medium")}
                >
                  Medium
                </button>
                <button
                  className="h-16 text-slate-100 w-60 p-2 border-none font-semibold rounded-full  bg-red-600 hover:bg-red-700 hover:cursor-pointer text-xl "
                  onClick={() => handleSelectedQuiz("Hard")}
                >
                  Hard
                </button>{" "}
              </div>
              <div className="flex flex-col  justify-center items-center">
                <h2 className="text-4xl">Your Quizzes</h2>
                {userQuizzes.length === 0 ? (
                  <>
                    <p className="font-semibold">
                      You have no created <br />
                      quizzes yet.
                    </p>
                    <Link href="/custom-quiz">
                      <button className="h-16 text-slate-100 w-60 p-2 border-none font-semibold rounded-full  bg-blue-600 hover:bg-blue-700 hover:cursor-pointer  text-xl mb-30">
                        Create one here!
                      </button>
                    </Link>
                  </>
                ) : (
                  <button
                    className="h-16 text-slate-100 w-60 p-2 border-none font-semibold rounded-full  bg-blue-600 hover:bg-blue-700 hover:cursor-pointer  text-xl mb-9"
                    onClick={() => handleSelectedQuiz("MyCustomQuiz")}
                  >
                    Your Quiz
                  </button>
                )}
              </div>
            </div>
          ) : (
            ""
          )}

          {isCompleted ? (
            <div className="flex flex-col justify-center items-center">
              <h1>Results</h1>

              <div className=" rounded-lg px-4">
                <h2 className="text-xl text-center">🟢 {score} correct</h2>
                <h2 className="text-xl text-center">
                  🔴 {selectedQuiz.results.length - score} incorrect
                </h2>
              </div>

              <div className=" h-72 w-60 mt-4 flex flex-col justify-center items-center rounded-lg">
                <h2>Your highscore is:</h2>
                <h3 className="text-7xl">{highscore}</h3>
              </div>

              <button
                onClick={() => {
                  setSelectedQuiz(null);
                  setquizIsSelected(false);
                  setIndex(0);
                  setButtonClicked(false);
                  setScore(0);
                  setIsCompleted(false);
                }}
                className="h-16 text-slate-100 w-60 p-2 border-none font-semibold rounded-full  bg-blue-600 hover:cursor-pointer text-xl "
              >
                Done
              </button>
            </div>
          ) : (
            //Här börjar quizzet
            selectedQuiz && (
              <div className="flex flex-col items-center">
              {/*   <p className="font-bold ">Score: {score} </p> */}

                <div className="flex flex-col h-56 justify-center items-center text-center w-80 ">
                  <h2 className="text-xl p-0 m-0">
                    {selectedQuiz.results[index].question}
                  </h2>
                  <div>
                    <p className="font-semibold">
                      {index + 1} / {selectedQuiz.results.length}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2  w-96 h-72   -mt-10">
                  {shuffledOptions.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleButtonClick(option, i)}
                      className={`p-3 h-30 w-30 m-2 border-none font-semibold rounded-md ${
                        buttonClicked
                          ? option ===
                            selectedQuiz.results[index].correct_answer
                            ? "bg-green-600 text-zinc-950"
                            : i === clickedIncorrectIndex
                            ? `wiggle ${
                                wiggle ? "wiggling" : ""
                              } bg-red-500 text-black` // Use wiggleAnimation here
                            : "bg-slate-200"
                          : "hover:bg-slate-300 hover:cursor-pointer"
                      }`}
                      disabled={buttonClicked}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
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
                </div>
                <div className="h-16">
                  <p className="font-semibold">
                    {buttonClicked && isCorrect
                      ? "You're correct!"
                      : buttonClicked && !isCorrect && "Sorry, wrong answer!"}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
