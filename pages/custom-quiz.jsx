import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomQuiz, setCurrentQuiz } from "@/redux/CustomQuizSlice";
import AddQuestionForm from "@/Components/AddQuestionForm";
import CustomQuizList from "@/Components/customQuizList";

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
      results: [...questions],
    };

    dispatch(addCustomQuiz(newQuiz));
    dispatch(setCurrentQuiz(newQuiz));

    // When click on "Make Quiz" button, reset the form
    setQuizName("");
    setQuestions([]);
  };

  return (
    <div>
      <input
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
        <ul>
          {questions.map((question, index) => (
            <li key={index}>{question.question}</li> // Show the questions in the list
          ))}
        </ul>
      </div>
      <button onClick={handleMakeQuiz}>Make Quiz</button>
      <CustomQuizList /> //? Maybe send props?
    </div>
  );
}
