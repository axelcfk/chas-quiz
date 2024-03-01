import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomQuiz,
  setCurrentQuiz,
  selectAllFinishedQuizzes,
} from "@/redux/CustomQuizSlice";
import AddQuestionForm from "@/Components/AddQuestionForm";
import CustomQuizList from "@/Components/customQuizList";

export default function CustomQuizPage() {
  const [newQuestion, setNewQuestion] = useState("");
  const [quizName, setQuizName] = useState(""); // State to store quiz name
  const [questions, setQuestions] = useState([]); // State to store questions in array

  const dispatch = useDispatch();
  const finishedQuizzes = useSelector(selectAllQuizzes);
  const userQuiz = useSelector((state) => state.customQuiz.allQuizzes)

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

    dispatch(addCustomQuiz(newQuiz));
    dispatch(setCurrentQuiz(newQuiz));

    // When click on "Make Quiz" button, reset the form
    setQuizName("");
    setQuestions([]);
  };



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
        <div className="mt-4">
          <ul>
            {questions.map((question, index) => (
              <li key={index}>{question.question}</li>
            ))}
          </ul>
        </div>
        <button
          className="w-full mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleMakeQuiz}
        >
          Make Quiz
        </button>
        <CustomQuizList />
      </div>
      <button onClick={handleMakeQuiz}>Make Quiz</button>
      {finishedQuizzes.length > 0 &&  <CustomQuizList finishedQuizzes={finishedQuizzes} />}
      //? Maybe send props?
      <div>
        {userQuiz.results && userQuiz.results.map(item => (
          <div key={item.question}>
            <p>Question: {item.question}</p>
            <p>Correct Answer: {item.correct_answer}</p>
            <p>Incorrect Answers: {item.incorrect_answers.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
