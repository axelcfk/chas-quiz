import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomQuiz,
  setCurrentQuiz,
  selectAllFinishedQuizzes,
} from "@/redux/CustomQuizSlice";
import AddQuestionForm from "@/Components/AddQuestionForm";


export default function CustomQuizPage() {
  const [newQuestion, setNewQuestion] = useState("");
  const [quizName, setQuizName] = useState(""); // State to store quiz name
  const [questions, setQuestions] = useState([]); // State to store questions in array

  const dispatch = useDispatch();
 



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

    dispatch(addCustomQuiz(newQuiz)); // Add quiz to redux store
    dispatch(setCurrentQuiz(newQuiz));

    setQuizName("");
    setQuestions([]);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full h-full mt-40 max-w-md p-20 bg-white rounded-lg shadow-md">
        <input
          className="w-full mb-10 px-3 py-3 text-center rounded-3xl border-solid border-blue-400 focus:outline-none"
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
        <div className="mt-5">
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question.question}</li>
            ))}
          </ul>
        </div>
        <button
          className="w-full mt-10 bg-blue-500 hover:bg-blue-400  text-white font-bold border-none py-4 px-4 hover rounded-3xl focus:outline-none focus:shadow-outline mx-auto"
          onClick={handleMakeQuiz}
        >
          Make Quiz
        </button>
      </div>
    </div>
  );
}











