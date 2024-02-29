import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomQuiz, setCurrentQuiz } from "@/redux/CustomQuizSlice";
import AddQuestionForm from "@/Components/AddQuestionForm";
import CustomQuizList from "@/Components/customQuizList";


export default function CustomQuizPage() {
  const dispatch = useDispatch();
  const [newQuestion, setNewQuestion] = useState("");
  const [quizName, setQuizName] = useState(""); // State to store quiz name
  const [questions, setQuestions] = useState([]); // State to store questions

  const handleAddQuestion = (newQuestionData) => {
    const updatedQuestions = [...questions, newQuestionData]; // Adds the new question to the list
    setQuestions(updatedQuestions); // update the state
  };



  const handleMakeQuiz = () => {
    if (questions.length === 0 || quizName.trim() === "") return;

    const newQuiz = {
      name: quizName,
      questions: [...questions],
    };

    dispatch(setCurrentQuiz(newQuiz));
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
      <CustomQuizList />
    </div>
  );
}
