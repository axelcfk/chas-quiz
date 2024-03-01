import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCustomQuiz,
  setCurrentQuiz
} from "@/redux/CustomQuizSlice";
import AddQuestionForm from "@/Components/AddQuestionForm";
import CustomQuizList from "@/Components/customQuizList";

export default function CustomQuizPage() {
  const [newQuestion, setNewQuestion] = useState("");
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([]);
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

    dispatch(addCustomQuiz(newQuiz));
    dispatch(setCurrentQuiz(newQuiz));

    setQuizName("");
    setQuestions([]);
  };

  return (
    <div className="grid grid-cols- place-items-center h-screen">
      <div className="w-full max-w-md p-40 bg-white rounded-lg shadow-md">
  <input
    className="w-full border-gray-300 mb-4 px-3 py-3 rounded-3xl border-solid focus:outline-none text-center"
    type="text"
    placeholder="Enter Quiz Name"
    value={quizName}
    onChange={(e) => setQuizName(e.target.value)}
  />
        <AddQuestionForm
          onAddQuestion={(newQuestionData) => {
            handleAddQuestion(newQuestionData);
            dispatch(addCustomQuiz(newQuestionData));
          }}
          newQuestion={newQuestion}
          setNewQuestion={setNewQuestion}
        />
        <div className="mt-6 p-1">
          <ul className="space-y-1 text-lg">
            {questions.map((question, index) => (
              <li key={index}>Question {question.question}</li>
            ))}
          </ul>
        </div>
        <button
          className="block mx-auto mt-4 hover:bg-blue-400 bg-blue-500 text-white font-bold py-2.5 px-14 rounded focus:outline-none focus:shadow-outline border-none"
          onClick={handleMakeQuiz}
        >
          Make Quiz
        </button>
        <CustomQuizList />
      </div>
    </div>
  );
}
