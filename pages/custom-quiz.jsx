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
      results: [...questions]
    };

    dispatch(addFinishedQuiz(newQuiz)); // Add finished quiz to redux store
    dispatch(setCurrentQuiz(newQuiz));

    setQuizName("");
    setQuestions([]);
  };

console.log(finishedQuizzes);
console.log(questions);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-40 bg-white rounded-lg shadow-md">
        <input
          className="w-full mb-4 px-3 py-2 rounded-lg border-solid border-green-400 focus:outline-none"
            type="text"
            placeholder="Enter Quiz Name"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
        />
        <AddQuestionForm
          onAddQuestion={(newQuestionData) => {
          handleAddQuestion(newQuestionData);
          dispatch(addCustomQuiz(newQuestionData)); // Dispatch action to add question to Redux store
        }}
          newQuestion={newQuestion}
          setNewQuestion={setNewQuestion}
        />
       

      <div>
        <h2>Finished Quizzes</h2>
        <ul>
          {finishedQuizzes.map((quiz, index) => (
            <li key={index}>{quiz.name}</li>
          ))}
        </ul>
        <ul>
            {questions.map((question, index) => (
              <div>
              <li className="list-none" key={index}><p><b>Question {index + 1}: </b> {question.question}</p></li>
              <li className="list-none pl-8" key={index}><p><b>incorrect answer 1: </b> {question.incorrect_answers[0]}</p></li>
              <li className="list-none pl-8" key={index}><p><b>incorrect answer 2: </b>{question.incorrect_answers[1]}</p></li>
              <li className="list-none pl-8" key={index}><p><b>incorrect answer 3: </b>{question.incorrect_answers[2]}</p></li>
              <li className="list-none pl-8" key={index}><p><b>correct: </b> {question.correct_answer}</p></li>
              </div>
            ))}
          </ul>
      </div>
        <button
          className="w-full mt-10 bg-blue-500 hover:bg-blue-400  text-white font-bold border-none py-3 px-4 hover rounded-3xl focus:outline-none focus:shadow-outline mx-auto"
          onClick={handleMakeQuiz}
        >
          Make Quiz
        </button>
      </div>
    
    </div>
  );
}
