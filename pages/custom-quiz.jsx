import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomQuiz,
  addFinishedQuiz,
  selectAllQuizzes,
  selectAllFinishedQuizzes,
  setCurrentQuiz,
} from "@/redux/CustomQuizSlice";
import AddQuestionForm from "@/Components/AddQuestionForm";

export default function CustomQuizPage() {
  const [newQuestion, setNewQuestion] = useState("");
  const [quizName, setQuizName] = useState(""); // State to store quiz name
  const [questions, setQuestions] = useState([]); // State to store questions in array

  const dispatch = useDispatch();
  const userQuiz = useSelector(selectAllQuizzes);
  const finishedQuizzes = useSelector(selectAllFinishedQuizzes);

  const handleAddQuestion = (newQuestionData) => {
    const updatedQuestions = [...questions, newQuestionData];
    setQuestions(updatedQuestions);
  };

  const handleMakeQuiz = () => {
    if (questions.length === 0 || quizName.trim() === "") return;
    const newQuiz = {
      name: quizName,
      results: [...questions],
    };

    dispatch(addFinishedQuiz(newQuiz)); // Add finished quiz to redux store
    dispatch(setCurrentQuiz(newQuiz));

    setQuizName("");
    setQuestions([]);
  };

  console.log(finishedQuizzes);
  console.log(questions);

  return (
    <div className="flex justify-center flex-col">
      <h1 className="flex justify-center">Make your own quiz!</h1>
      <div className="flex justify-center mt-16">
        <input
          className="w-64 mb-10 px-3 py-3 text-center rounded-3xl border-solid border-blue-400 focus:outline-none"
          type="text"
          placeholder="Enter Quiz Name"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
        />
      </div>
      <AddQuestionForm
        onAddQuestion={(newQuestionData) => {
          handleAddQuestion(newQuestionData);
          dispatch(addCustomQuiz(newQuestionData)); // Dispatch action to add question to Redux store
        }}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
      />

      <div className="flex justify-center flex-col">
        <button
          className="w-28 mt-10 bg-blue-500 hover:bg-blue-400  text-white font-bold border-none py-4 px-4 hover rounded-3xl focus:outline-none focus:shadow-outline mx-auto cursor-pointer"
          onClick={handleMakeQuiz}
        >
          Make Quiz
        </button>
        <h2 className="flex justify-center pt-6">Finished Quizzes:</h2>
        <div className="flex justify-center">      <ul className="flex justify-center list-none font-bold text-xl text-white flex-col">
          Quizzes: &nbsp;
          {finishedQuizzes.map((quiz, index) => (
            <li key={index}>{quiz.name}</li>
          ))}
        </ul></div>
   

        {/* This div will only be visible on mobile devices */}
        <div className="md:hidden">
          <ul className="grid grid-cols-2 gap-4">
            {questions.map((question, index) => (
              <li key={index}>
                <p>
                  Question {index + 1}: {question.question}
                </p>
                <p>Incorrect answer 1: {question.incorrect_answers[0]}</p>
                <p>Incorrect answer 2: {question.incorrect_answers[1]}</p>
                <p>Incorrect answer 3: {question.incorrect_answers[2]}</p>
                <p>Correct: {question.correct_answer}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* This div will only be visible on desktop screens */}
        <div className="hidden md:block">
          <ul className="grid grid-cols-4 gap-4">
            {questions.map((question, index) => (
              <li key={index}>
                <p>
                  Question {index + 1}: {question.question}
                </p>
                <p>Incorrect answer 1: {question.incorrect_answers[0]}</p>
                <p>Incorrect answer 2: {question.incorrect_answers[1]}</p>
                <p>Incorrect answer 3: {question.incorrect_answers[2]}</p>
                <p>Correct: {question.correct_answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
